import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface TransactionConfirmDialogData {
  title?: string;
  transactionData: TransactionDataField[];
}

interface TransactionDataField {
  label: string;
  value: st