
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SwapType } from '../../swap-type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BridgeService } from '../../../../../core';

@Component({
  selector: 'lto-wallet-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  @Input() swapType!: SwapType;
  @Output() nextStep = new EventEmitter();

  burnRatePct$!: Observable<number>;
  burnedTokens$!: Observable<number>;
  receiving$!: Observable<number>;
  burnFeeERC$!: Observable<number>;
  burnFeeMain$!: Observable<number>;

  ercDesiting = 1000;

  get bridgeFee$(): Observable<number> {
    switch (this.swapType) {
      case SwapType.MAIN_ERC20:
      case SwapType.ERC20_BINANCE:
        return this.burnFeeERC$;
      default:
        return this.burnFeeMain$;
    }
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