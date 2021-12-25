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
      