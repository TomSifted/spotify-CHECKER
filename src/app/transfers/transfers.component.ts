import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WalletService } from '../core';
import { MakeTransactionModal, WithdrawModal, DepositModal } from '../modals';

@Component({
  selector: 'lto-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {
  balance$: Observable<any>;
  transfers$: Observable<LTO.Page<LTO.Transaction>>;
  address$: Observable<string>;

  visibleColumns = ['id'];

  get detailsOpened(): boolean {
    return !!this.selectedTransaction;
  }

  selectedTransaction: any = n