import { BridgeService } from '../bridge.service';
import { of } from 'rxjs';

export class BridgeServiceMock implements BridgeService {
  static provider = {
    provide: BridgeService,
    useClass: BridgeServi