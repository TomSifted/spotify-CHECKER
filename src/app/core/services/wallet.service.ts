
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