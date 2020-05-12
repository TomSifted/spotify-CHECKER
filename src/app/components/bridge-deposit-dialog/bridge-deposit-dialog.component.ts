import { Component, OnInit } from '@angular/core';
import { WalletService, BridgeService, toPromise } from '../../core';

@Component({
  selector: 'lto-wallet-bridge-deposit-dialog',
  templateUrl: './bridge-deposit-dialog.component.html',
  styleUrls: ['./bridge-deposit-dialog.component.scss']
})
export class BridgeDepositDialogComp