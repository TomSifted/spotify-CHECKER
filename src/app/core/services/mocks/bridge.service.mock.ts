import { BridgeService } from '../bridge.service';
import { of } from 'rxjs';

export class BridgeServiceMock implements BridgeService {
  static provider = {
    provide: BridgeService,
    useClass: BridgeServiceMock
  };

  burnRate$ = of(1);
  burnedTokens$ = of(1);
  burnFees$ = of({lto: 1, lto20: 1, binance: 1});

  depositTo() {
    return of('test_deposit_address');
  }

  withdrawTo() {
    return of('test_withdraw_address');
  }

  faucet() {
    return of(null);
  }
}
