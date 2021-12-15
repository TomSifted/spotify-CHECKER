import { Component, Output, EventEmitter } from '@angular/core';

import { SwapType } from '../../swap-type';


@Component({
  selector: 'lto-wallet-swap-type',
  templateUrl: './swap-type.component.html',
  styleUrls: ['./swap-type.component.scss']
})
export class SwapTypeComponent {
  @Output() selectType = new EventEmitter<SwapType>();

  selectedType: SwapType | null = null;
  SwapType