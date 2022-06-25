import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Account } from 'lto-api';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LedgerService } from '@app/core/services';
import { CreateScriptModal, ScriptInfoModal, DisableScriptModal } from '@app/modals';
import {
  AuthService,
  ILedgerAccount,
  IUserAccount,
  ScriptsService,
  FeeService,
  toPromise,
} from '@app/core';

@Component({
  selector: 'lto-wallet-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent i