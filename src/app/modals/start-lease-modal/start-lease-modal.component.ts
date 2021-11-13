
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  WalletService,
  IBalance,
  formControlErrors,
  ADDRESS_VALIDATOR,
  FeeService, toPromise
} from '../../core';
import { DEFAULT_TRANSFER_FEE } from '../../tokens';
import { take, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TransactionConfirmDialog } from '../../components/transaction-confirmation-dialog';

import * as communityNodes from '../../../communityNodes.json';
import { TransactionQrDialog } from '@app/components/transaction-qr-dialog';

export interface LeaseData {
  amount: number;
  recipient: string;
  fee: number;
}

interface LeaseFormData {
  recipient: string;
  amount: number;
  fee: number;
}
interface CommunityNode {
  address?: string;
  sharing?: string;
  name: string;
  website?: string;
  payoutSchedule?: string;
  tgContact?: string;
  comment?: string;
  hide?: boolean;
}


@Component({
  selector: 'lto-wallet-start-lease-modal',
  templateUrl: './start-lease-modal.component.html',
  styleUrls: ['./start-lease-modal.component.scss'],
})
export class StartLeaseModalComponent implements OnInit {
  leaseForm: FormGroup | null = null;
  balance$!: Observable<IBalance>;
  isNodeSelected = false;
  communityNodesLoaded: CommunityNode[] = [];
  communityNodesCustom: CommunityNode[] = [];
  displayedColumns: string[] = ['name', 'address'];
  displayedColumnsCustom: string[] = ['name'];
  get recipientErrors() {
    return formControlErrors(this.leaseForm, 'recipient');
  }

  constructor(
    private dialogRef: MatDialogRef<any, LeaseData|boolean>,
    private _wallet: WalletService,
    private confirmDialog: TransactionConfirmDialog,
    private qrDialog: TransactionQrDialog,
    @Inject(ADDRESS_VALIDATOR) private _addressValidator: ValidatorFn,
    @Inject(MAT_DIALOG_DATA) public balance: number,
    private _feeService: FeeService,
  ) {
    // Shuffling array
    this.communityNodesLoaded = communityNodes.nodes.sort(() => Math.random() - 0.5)
      .filter((o: CommunityNode) => (!o.hide));
    this.communityNodesCustom.unshift({
      'name': 'Custom',
      'address': '',
      'comment': 'Lease to an unlisted node by entering the node address',
      'payoutSchedule': ''
    });
    this.balance$ = this._wallet.balance$;
  }
