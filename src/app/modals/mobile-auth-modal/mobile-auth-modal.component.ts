import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IMobileAuthChallenge, MobileAuthService } from '../../core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'lto-mobile-auth-modal',
  templateUrl: './mobile-auth-modal.component.html',
  styleUrls: ['./mobile-auth-modal.component.scss'],
})
export class MobileAuthModalComponent implements OnInit {
  public challenge$: Observable<IMobileAuthChallenge|null>;

  constructor(
    private dialog: MatDialogRef<any>,
    private mobileAuth: MobileAuthService,
    private snackbar: MatSnackBar,
    private r