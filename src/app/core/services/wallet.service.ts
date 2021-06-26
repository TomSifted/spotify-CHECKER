
import { Injectable, Inject, ClassProvider } from '@angular/core';
import { Observable, timer, Subject, merge, zip, of, combineLatest } from 'rxjs';
import {
  shareReplay,
  share,
  switchMapTo,
  switchMap,
  map,
  filter,
  catchError
} from 'rxjs/operators';
import { PublicNode } from './public-node';
import { AuthService, IUserAccount } from './auth.service';
import { Account } from 'lto-api';
import { TransactionTypes } from '../transaction-types';
import { BridgeService, TokenType } from './bridge.service';
import { transactionsFilter, toPromise } from '../utils';
import { AMOUNT_DIVIDER, DEFAULT_TRANSFER_FEE } from '../../tokens';
import { LedgerService, ILedgerAccount, IUnsignedTransaction } from './ledger.service';
import { base58Encode } from 'lto-ledger-js-unofficial-test/lib/utils';

export interface IBalance {
  regular: number;
  generating: number;
  available: number;
  effective: number;
  /**
   * All numbers in balance come in INT form.
   * To make them human readable we need to divide them by AMOUNT_DIVIDER
   */
  amountDivider: number;
}

export interface ITransferPayload {
  amount: number;
  fee: number;
  attachment?: string;
  recipient: string;
}

export interface IMassTransferPayload {
  fee: number;
  attachment?: string;
  transfers: IMassTransfer[];
}

export interface ILeasePayload {
  recipient: string;
  amount: number;
  fee: number;
}

export interface IAnchorPayload {
  hash: string;
  fee: number;
}

export interface IMassTransfer {
  amount: number;
  recipient: string;
}

/**
 * TODO: Refactor Wallet to handle situations when auth.wallet is null
 */
@Injectable()
export class WalletServiceImpl implements WalletService {
  balance$: Observable<IBalance>;
  transferFee$ = of(1);

  canSign$: Observable<boolean>;
  transactions$: Observable<LTO.Transaction[]>;
  transfers$: Observable<LTO.Page<LTO.Transaction>>;
  leasingTransactions$: Observable<any[]>;
  dataTransactions$: Observable<any[]>;
  anchors$: Observable<LTO.Page<LTO.Transaction>>;

  address$: Observable<string>;

  private polling$: Observable<number> = timer(0, 5000).pipe(share());
  private manualUpdate$ = new Subject<any>();

  private update$: Observable<string>;
  private unconfirmed$: Observable<LTO.Transaction[]>;

  constructor(
    private publicNode: PublicNode,
    private auth: AuthService,
    private bridgeService: BridgeService,
    private ledgerService: LedgerService,
    @Inject(AMOUNT_DIVIDER) private amountDivider: number,
    @Inject(DEFAULT_TRANSFER_FEE) private defaultTransferFee: number
  ) {
    this.address$ = auth.account$.pipe(
      filter((account): account is IUserAccount => !!account),
      map(account => account.address)
    );

    this.canSign$ = this.address$.pipe(
      switchMapTo(combineLatest(this.auth.wallet$, this.auth.ledgerAccount$)),
      map(([wallet, ledgerAccount]) => !!wallet || !!ledgerAccount)
    );

    this.update$ = merge(this.polling$, this.manualUpdate$).pipe(
      switchMapTo(auth.account$),
      filter((account): account is IUserAccount => !!account),
      map(account => account.address),
      shareReplay(1)
    );

    this.balance$ = this.update$.pipe(
      switchMap(address => publicNode.balanceOf(address)),
      map(rawBalance => {
        return {
          ...rawBalance,
          amountDivider // mixin divider to easy access from components
        };
      }),
      shareReplay(1)
    );

    this.unconfirmed$ = this.address$.pipe(
      switchMap(address => {
        return publicNode.unconfirmedTransactions().pipe(
          map(transactions => {
            return this.filterOutAccountTransactions(address, transactions);
          })
        );
      })
    );

    this.transactions$ = this.update$.pipe(
      switchMap(address => {
        return zip(this.unconfirmed$, publicNode.transactionsOf(address));
      }),
      map(([unconfirmed, confirmed]) => {
        return [...unconfirmed, ...confirmed];
      }),
      shareReplay(1)
    );

    this.transfers$ = this.update$.pipe(
      switchMap(address => {
        return zip(
          publicNode.indexedTransactions(address, 'all_transfers'),
          this.unconfirmed$.pipe(
            map(transactionsFilter(TransactionTypes.TRANSFER, TransactionTypes.MASS_TRANSFER))
          )
        );
      }),
      map(([transferTransactions, unconfirmed]) => {
        return {
          total: transferTransactions.total,
          items: [...transferTransactions.items, ...unconfirmed]
        };
      }),
      shareReplay(1)
    );

    this.leasingTransactions$ = this.update$.pipe(
      switchMap(address => {
        return combineLatest(
          publicNode
            .activeLease(address)
            .pipe(catchError(err => of([] as LTO.Transaction[]))),
          this.transactions$
        );
      }),
      map(([leaseTransactions, allTransactions]) => {
        // For this endpoint we receive transactions without status
        // we need to set it automatically
        const activeLease = leaseTransactions.map((transaction: LTO.Transaction) => {
          return {
            ...transaction,
            status: 'active'
          };
        });
        const cancelLease = transactionsFilter(TransactionTypes.CANCEL_LEASING)(allTransactions);
        // We need to filter out "unconfirmed" transactions
        const unconfirmedLease = transactionsFilter(TransactionTypes.LEASING)(
          allTransactions
        ).filter(transaction => transaction.unconfirmed);

        // New endpoint does not return 'canceled lease' so we need to take them from
        // allTransactions aswel
        const canceledLease = transactionsFilter(TransactionTypes.LEASING)(allTransactions).filter(
          transaction => transaction.status === 'canceled'
        );

        // "Unconfirmed" lease tranasactions have status === 'canceled' for a some reason
        // So we need to merge  "unconfirmedLease" and "canceledLease" and remove doubles
        const uniqueLease = [...unconfirmedLease, ...canceledLease].reduce(
          (obj, transaction) => {
            return {
              ...obj,
              [transaction.id]: transaction
            };
          },
          {} as any
        );
        return [...activeLease, ...cancelLease, ...Object.values(uniqueLease)];
      })
    );

    this.dataTransactions$ = this.transactions$.pipe(
      map(transactionsFilter(TransactionTypes.ANCHOR))
    );

    this.anchors$ = this.update$.pipe(
      switchMap(address => {
        return zip(
          publicNode.indexedTransactions(address, 'anchor'),
          this.unconfirmed$.pipe(
            map(transactionsFilter(TransactionTypes.ANCHOR))
          )
        );
      }),
      map(([anchors, unconfirmedAnchors]) => {
        return {
          total: anchors.total,
          items: [...anchors.items, ...unconfirmedAnchors]
        };