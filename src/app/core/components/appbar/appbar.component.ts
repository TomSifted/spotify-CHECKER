import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService, ILedgerAccount, IUserAccount, Sidenav } from '@app/core/services';

@Component({
  selector: 'lto-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss'],
})
export class AppbarComponent implements OnInit, OnDestroy {
  authenticated$!: Subscription;
  authenticated!: boolean;

  user$!: Subscription;
  userAccount!: IUserAccount | null;

  ledger$!: Subscription;
  ledgerAccount!: ILedgerAccount | null;

  accounts$!: Subscription;
  availableAccounts!: any;

  constructor(
    private _auth: AuthService,
    private _