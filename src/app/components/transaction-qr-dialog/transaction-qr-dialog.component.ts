import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WalletService } from '@app/core';

export interface TransactionQrDialogData {
  title?: string;
  tx: object;
  transactionData: TransactionDataField[];
}

interface TransactionDataField {
  label: string;
  value: string | number;
  /**
   * Field to only be shown in the detail view
   */
  detailOnly?: boolean;
}

@Component({
  selector: 'lto-wallet-transaction-qr-dialog',
  templateUrl: './transaction-qr-