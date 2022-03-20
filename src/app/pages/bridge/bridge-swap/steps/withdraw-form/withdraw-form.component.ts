import { Component, OnInit, Output, EventEmitter, Inject, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable, combineLatest, ReplaySubject, Subscription } from 'rxjs';
import { BridgeService, WalletService, etheriumAddressValidator } from '../../../../../core';
import { DEFAULT_TRANSFER_FEE } from '../../../../../tokens';
import { map, withLatestFrom, take } from 'rxjs/operators';
import { SwapType } from '../../swap-type';
import * as bech32 from 'bech32';

@Component({
  selector: 'lto-wallet-withdraw-form',
  templateUrl: './withdraw-form.component.html',
  styleUrls: ['./withdraw-form.component.scss']
})
export class WithdrawFormComponent implements OnInit, OnDestroy {
  @Input() swapType!: SwapType;
  @Output() close = new EventEmitter();

  withd