
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthService, IUserAccount } from '../core';
import { Account } from 'lto-api';
import { Router } from '@angular/router';

@Component({
  selector: 'lto-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  wallet: Account;

  @ViewChild('step1Tpl', { static: true }) step1!: TemplateRef<any>;
  @ViewChild('step2Tpl', { static: true }) step2!: TemplateRef<any>;
  @ViewChild('step3Tpl', { static: true }) step3!: TemplateRef<any>;
  @ViewChild('step4Tpl', { static: true }) step4!: TemplateRef<any>;

  stepTemplate!: TemplateRef<any>;

  get seedWords(): string[] {
    return this.wallet.seed.split(' ');