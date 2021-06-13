import { AuthService, IUserAccount } from '../auth.service';
import { of, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { LTO, Account } from 'lto-api';

import { ILedgerAccount } from '@app/core/services/ledger.service';
import { map } from 'rxjs/operators';

export class AuthServiceMock implements AuthService {
  static provider = {
    provide: AuthService,
    useClass: AuthServiceMock,
  };

  readonly STORAGE_KEY: string = 'TEST_KEY';

  authenticated$: Observable<boolean> = of(true);
  wallet$: BehaviorSubject<Account | null> = new BehaviorSubject<Account | null>(null);
  localAccount$: Behavio