import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawModalComponent } from './withdraw-modal.component';
import { toPromise } from '../../core';

@Injectable()
export class WithdrawModal {
  const