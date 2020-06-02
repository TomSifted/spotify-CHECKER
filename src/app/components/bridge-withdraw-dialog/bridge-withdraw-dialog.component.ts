import { Component, OnInit, Inject } from '@angular/core';
import { BridgeService, WalletService } from '../../core';
import { take } from 'rxjs/operators';
import { DEFAULT_TRANSFER_FEE, AMOUNT_DIVIDER } from '../../tokens';

@Component({
  selector: 'lto-wallet-bridge-withdraw-dialog',
  templateUrl: './b