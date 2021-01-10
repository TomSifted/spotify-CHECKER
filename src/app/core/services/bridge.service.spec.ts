import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BridgeService, BridgeServiceImpl } from './bridge.service';
import { LTO_BRIDGE_HOST, BRIDGE_ENABLED } from '@app/tokens';

function configureTestingModule(bridgeEnabled: boolean) {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    p