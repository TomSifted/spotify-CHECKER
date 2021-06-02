import { Inject, Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject } from 'rxjs';
import { LTO_MOBILE_AUTH } from '@app/tokens';

export interface IPublicAccount {
  address: string;
  keyType: string;
  publicKey: string;
}

export interface IMobileAuthChallenge {
  '@schema': string;
  url: st