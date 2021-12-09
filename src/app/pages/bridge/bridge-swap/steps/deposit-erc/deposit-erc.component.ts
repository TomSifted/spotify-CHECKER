import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BridgeService, WalletService } from '../../../../../core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SwapType } from '../../swap-type';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import * as bech32 from 'bech32';

@Component({
  selector: 'lto-wallet-deposit-erc',
  templateUrl: './deposit-erc.component.html',
  styleUrls: ['./deposit-erc.component.scss']
})
export class DepositErcComponent implements OnInit {
  @Input() swapType!: SwapType;
  @Output() close = new EventEmitter();

  shouldShowCaptcha = false;
  captchaResponse = '';
  address$: Observable<string> | null = null;
  depositForm!: FormGroup;

  get toTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
        return 'BEP-2';
      default:
        return 'MAINNET';
    }
  }

  get toColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
        return 'yellow';
      default:
        return 'purple';
    }
  }

  get otherTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.MAIN_ERC20:
      case SwapType.ERC20_BINANCE:
        return 'ERC-20';
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCE:
        return 'BEP-2';
      case SwapType.MAIN_BINANCEEXCHANGE:
        return 'MAINNET';
    }
  }

  get otherColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.MAIN_ERC20:
      case SwapType.ERC20_BINANCE:
        return 'blue';
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCE:
      case SwapType.MAIN_BINANCEEXCHANGE:
        return 'yellow';
    }
  }

  get shouldSpecifyToAddress(): boolean {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
        return true;
      default:
        return false;
    }
  }

  addressPlaceholder!: string;

  constructor(privat