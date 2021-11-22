import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WithdrawModalComponent } from './withdraw-modal.component';
import { toPromise } from '../../core';

@Injectable()
export class WithdrawModal {
  constructor(private matDialog: MatDialog) {}

  show(): Promise<void> {
    const dialog = this.matDialog.open(WithdrawModalComponent, {
      maxWidth: '100%',
      width: '500px',
    });
    return toPromise(dialog.afterClosed());
  }
}
