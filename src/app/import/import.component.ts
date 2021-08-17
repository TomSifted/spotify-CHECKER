
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../core';
import { Account } from 'lto-api';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take, shareReplay, filter } from 'rxjs/operators';
import { trimSeed } from './trim-seed.rxjs-pipe';

@Component({
  selector: 'lto-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
  @ViewChild('step1Tpl', { static: true }) step1!: TemplateRef<any>;
  @ViewChild('step2Tpl', { static: true }) step2!: TemplateRef<any>;

  stepTemplate!: TemplateRef<any>;
  wallet!: Account;

  seedForm = new FormGroup({
    'seed': new FormControl(''),
    'tidy': new FormControl(true)
  });

  walletAddress$: Observable<string>;
  account$: Observable<Account | null>;

  constructor(private auth: AuthService, private snackbar: MatSnackBar, private router: Router) {