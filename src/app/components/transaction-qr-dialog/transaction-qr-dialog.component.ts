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
  value: string |