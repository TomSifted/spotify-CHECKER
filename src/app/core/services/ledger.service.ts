
import { Platform } from '@angular/cdk/platform';
import { Injectable, ClassProvider, Inject } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { WavesLedger } from 'lto-ledger-js-unofficial-test';

import { TransactionTypes } from '@app/core/transaction-types';
import { LTO_NETWORK_BYTE, LTO_PUBLIC_API } from '@app/tokens';

import {
  anchor,
  lease,
  transfer,
  broadcast,
  cancelLease,
  massTransfer,
  parseSerialize,
  ITransaction,
  TTx,
  WithId,
} from '@lto-network/lto-transactions';
import { TRANSACTION_TYPE } from '@lto-network/lto-transactions/dist/transactions';
import { MatDialog } from '@angular/material/dialog';
import { ContentDialogComponent } from '@app/components/content-dialog';
import { toPromise } from '../utils';

enum NetworkCode {
  MAINNET = 76,
  TESTNET = 84,
}

export interface LedgerOptions {
  debug?: boolean;
  openTimeout: number;
  listenTimeout: number;
  exchangeTimeout: number;
  networkCode: NetworkCode;
  transport: typeof TransportU2F | TransportWebUSB;
}

export interface ILedgerAccount {
  id: number;
  name: string;
  address: string;
  publicKey: string;
}

export interface IUnsignedTransaction {
  fee: number;
  type: number;
  amount?: number;
  recipient?: string;
  attachment?: string;
  transactionId?: string;
  anchors?: string[];
  transfers?: { recipient: string; amount: number }[];
}

@Injectable({
  providedIn: 'root',
})
export class LedgerServiceImpl implements LedgerService {
  private ledger?: WavesLedger;
  private networkCode: NetworkCode;
  private ledgerOptions: LedgerOptions;
  private transport: typeof TransportU2F | TransportWebUSB;

  public ledgerId: number = 0;
  public connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public ledgerAccount$: BehaviorSubject<ILedgerAccount | null> =
    new BehaviorSubject<ILedgerAccount | null>(null);