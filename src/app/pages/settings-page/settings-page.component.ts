import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Account } from 'lto-api';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LedgerService } from '@app/core/services';
import { CreateScriptModal, ScriptInfoModal,