import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { SwapType } from './swap-type';
import { MakeTransactionModal } from '../../../modals';

@Component({
  selector: 'lto-wallet-bridge-swap',
  templateUrl: './bridge-swap.component.html',
  styleUrls: ['./bridge-swap.component.scss'],
})
export class BridgeSwapComponent implements OnInit {
  step = 2;
 