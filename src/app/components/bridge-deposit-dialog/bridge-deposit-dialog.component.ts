import { Component, OnInit } from '@angular/core';
import { WalletService, BridgeService, toPromise } from '../../core';

@Component({
  selector: 'lto-wallet-bridge-deposit-dialog',
  templateUrl: './bridge-deposit-dialog.component.html',
  styleUrls: ['./bridge-deposit-dialog.component.scss']
})
export class BridgeDepositDialogComponent implements OnInit {
  step = 1;
  bridgeAddress: string = '';
  captcha: string = '';

  constructor(private wallet: WalletService, private bridgeService: BridgeService) {}

  ng