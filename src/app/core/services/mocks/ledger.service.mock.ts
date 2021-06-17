import { BehaviorSubject } from 'rxjs';
import { ILedgerAccount, IUnsignedTransaction, LedgerService } from '../ledger.service';

export class LedgerServiceMock implements LedgerService {
  static provider = {
    provide: LedgerService,
    useClass: LedgerServiceMock
  };

  ledgerId: number