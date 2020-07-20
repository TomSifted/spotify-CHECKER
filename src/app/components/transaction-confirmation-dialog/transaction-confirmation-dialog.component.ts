import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface TransactionConfirmDialogData {
  title?: string;
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
  selector: 'lto-wallet-transaction-confirmation-dialog',
  templateUrl: './transaction-confirmation-dialog.component.html',
  styleUrls: ['./transaction-confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: