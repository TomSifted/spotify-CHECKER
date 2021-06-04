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
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class MobileAuthService {
  subject?: WebSocketSubject<{data: string}|IPublicAccount>;
  challenge$ = new BehaviorSubject<IMobileAuthChallenge|null>(null);
  account$ = new BehaviorSubject<IPublicAccount|null>(null);

  constructor(@Inject(LTO_MOBILE_AUTH) private settings: {ws: string, url: string}) {}

  connect() {
    if (this.subject) {
      throw new Error('Already connected');
    }

    this.subject = webSocket(this.settings.ws);

    this.subject.subscribe({
      nex