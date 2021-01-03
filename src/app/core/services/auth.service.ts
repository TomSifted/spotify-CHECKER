
import { map } from 'rxjs/operators';
import { LTO, Account } from 'lto-api';
import { Injectable, Inject, ClassProvider, Injector } from '@angular/core';
import { Observable, BehaviorSubject, Subscriber, combineLatest } from 'rxjs';

import { LTO_NETWORK_BYTE, LTO_PUBLIC_API } from '@app/tokens';
import { ILedgerAccount, LedgerService } from '@app/core/services/ledger.service';
import { MobileAuthService, IPublicAccount } from '@app/core/services/mobile-auth.service';

export interface IUserAccount {
  name: string;
  encryptedSeed?: string;
  address: string;
  privateKey?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthServiceImpl implements AuthService {
  readonly STORAGE_KEY: string = '_USERS_ACCOUNTS_';

  authenticated$: Observable<boolean>;
  account$: Observable<IUserAccount | null>;
  wallet$ = new BehaviorSubject<Account | null>(null);
  localAccount$ = new BehaviorSubject<IUserAccount | null>(null);
  ledgerAccount$ = new BehaviorSubject<ILedgerAccount | null>(null);

  ltoInstance: LTO;
  availableAccounts$: Observable<IUserAccount[]>;
  private _availableAccounts$: Subscriber<IUserAccount[]> | null = null;

  constructor(
    @Inject(LTO_NETWORK_BYTE) networkByte: string,
    @Inject(LTO_PUBLIC_API) publicApi: string,