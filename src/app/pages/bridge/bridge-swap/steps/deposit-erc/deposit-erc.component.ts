import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BridgeService, WalletService } from '../../../../../core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SwapType } from '../../swap-type';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import * as bech32 from 'bech32';

@Component({
  selector: 'lto-wallet-deposit-erc',
  templateUrl: './deposit-erc.component.ht