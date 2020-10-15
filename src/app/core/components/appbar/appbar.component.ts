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
exp