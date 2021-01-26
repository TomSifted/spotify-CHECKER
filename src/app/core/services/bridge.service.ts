import { Injectable, Inject, ClassProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';
import { LTO_BRIDGE_HOST, BRIDGE_ENABLED } from '../../tokens';

export type TokenType = 'LTO' | 'LTO20' | 'WAVES' | 'BINANCE';

interface BridgeCache {
  deposit: {
    [address: string]: string;
  };

  withdraw: {
    [recipient: string]: string;
  };
}

interface BridgeStats {
  burn_rate: number;
  burned: number;
  volume: {
    lto: any;
    lto20: any;
    binance: any;
  };
}

interface BurnFees {
  lto: number;
  lto20: number;
  binance: number;
}

@Injectable()
export class BridgeServiceImpl implements BridgeService {
  readonly STORAGE_KEY = '__bridge__';

  burnRate$: Observable<number>;
  burnedTokens$: Observable<number>;
  burnFees$: Observable<BurnFees>;

  bridgeStats$: Observable<BridgeStats>;
  private cache: BridgeCache;

  constructor(@Inject(LTO_BRIDGE_HOST) private ltoBridgeHost: string, private http: HttpClient) {
    // Restore bridge address from localstorage
    this.cache = this.restoreCache();
