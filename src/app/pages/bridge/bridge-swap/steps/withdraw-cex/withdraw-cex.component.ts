import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SwapType } from '../../swap-type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BridgeService } from '../../../../../core';

@Component({
  selector: 'lto-wallet-withdraw-cex',
  templateUrl: './withdraw-cex.component.html',
  styleUrls: ['./withdraw-cex.component.scss']
})
export class WithdrawCexComponent implements OnInit {
  @Input() swapType!: SwapType;
  @Output() nextStep = new EventEmitter();

  burnRatePct$!: Observable<number>;
  burnedTokens$!: Observable<number>;
  receiving$!: Observable<number>;
  burnFeeERC$!: Observable<number>;
  burnFeeMain$!: Observable<number>;

  ercDesiting = 1000;

  get bridgeFee$(): Observable<number> {
      return this.burnFeeMain$;
  }

  get fromTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.ERC20_BINANCE:
        return 'ERC-20';
      case SwapType.BINANCE_MAIN:
        return 'BEP-2';
      case SwapType.MAIN_ERC20:
      case SwapType.MAIN_BINANCE:
      case SwapType.MAIN_BINANCEEXCHANGE:
        return 'MAINNET';
    }
  }

  get fromColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.ERC20_BINANCE:
        return 'blue';
      case SwapType.BINANCE_MAIN:
        return 'yellow';
      case SwapType.MAIN_ERC20:
      case SwapType.MAIN_BINANCE:
      case SwapType.MAIN_BINANCEEXCHANGE:
        return 'purple';
    }
  }

  get toTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCEEXCHANGE:
        return 'MAINNET';
      case SwapType.ERC20_BINANCE:
      case SwapType.MAIN_BINANCE:
        return 'BEP-2';
      case SwapType.MAIN_ERC20:
        return 'ERC-20';
    }
  }

  get toColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.BINANCE_MAIN:
        return 'purple';
      case SwapType.ERC20_BINANCE:
      case SwapType.MAIN_BINANCE:
      case SwapType.MAIN_BINANCEEXCHANGE:
        return 'yellow';
      case SwapType.MAIN_ERC20:
        return 'blue';
    }
  }

  ltoWithdrawing = 1000;

  receiving(fee: number): number {
    if (this.ercDesiting < fee) {
      return 0;
    }

    return this.ercDesiting - fee;
  }

  get burnedTokens(): number {
    return this.ltoWithdrawing / 2;
  }

  get ercReceving(): number {
    return this.ltoWithdrawing / 2;
  }

  get isERC20ToMain(): boolean {
    return (
    