import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { EncoderService, TransactionTypes } from '../../../core';

interface AnchorData {
  base64: string;
  base58: string;
  hex: string;
}

@Component({
  selector: 'lto-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit, OnChanges {
  @Input() transaction!: LTO.Transaction;
  @Output() close = new EventEmitter();

  get isMassTransaction(): boolean {
    return this.transaction && this.transaction.type === 11;
  }

  get isLeasing(): boolean {
    return (
      th