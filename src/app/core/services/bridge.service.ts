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

  