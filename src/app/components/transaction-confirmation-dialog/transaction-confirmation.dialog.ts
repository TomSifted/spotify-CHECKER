import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  TransactionConfirmationDialogComponent,
  TransactionConfirmDialogData,
} from './transaction-confirmation-dialog.component';

@Injectable()
export class TransactionConfirmDialog {
  constructor(private matDialog: MatDialog) {}

  show(dialogData: 