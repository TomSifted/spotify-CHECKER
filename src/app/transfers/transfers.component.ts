import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WalletService } from '../core';
import { MakeTransactionModal, WithdrawModal, DepositModal } from '../modals';

@Component({
  selector: 'lto-transfers',
  templateUrl: './transfers.component.html',
  st