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

  withdrawForm!: FormGroup;

  step = 'input';

  confirmed = false;
  captchaResponse = '';

  transfer$: Promise<any> | null = null;

  receiving$!: Observable<number>;

  burnFeeERC$: Observable<number>;
  burnFeeMain$: Observable<number>;

  get bridgeFee$(): Observable<number> {
    switch (this.swapType) {
      case SwapType.MAIN_ERC20:
      case SwapType.ERC20_BINANCE:
        return this.burnFeeERC$;
      default:
        return this.burnFeeMain$;
    }
  }

  get toTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCEEXCHANGE:
        return 'MAINNET';
      case SwapType.ERC20_BINANCE:
      case SwapType.MAIN_BINANCE:
        return 'BEP-2';
      case SwapType.MAIN_ERC20:
        return 'ERC-20';
    }
  }

  get toColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.BINANCE_MAIN:
        return 'purple';
      case SwapType.ERC20_BINANCE:
      case SwapType.MAIN_BINANCE:
      case SwapType.MAIN_BINANCEEXCHANGE:
        return 'yellow';
      case SwapType.MAIN_ERC20:
        return 'blue';
    }
  }

  BRIDGE_MINIMAL_FEE = 0;

  maxAmount = 0;

  get otherTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.MAIN_ERC20:
        return 'ERC-20';
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCE:
      case SwapType.ERC20_BINANCE:
        return 'BEP-2';
      case SwapType.MAIN_BINANCEEXCHANGE:
        return 'MAINNET';
    }
  }

  get otherColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.MAIN_ERC20:
        return 'blue';
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCE:
      case SwapType.ERC20_BINANCE:
      case SwapType.MAIN_BINANCEEXCHANGE:
        return 'yellow';
    }
  }

  addressPlaceholder!: string;

  private _subscriptions = new Subscription();

  get cannotSend(): boolean {
    return !this.confirmed || !this.captchaResponse;
  }

  constructor(
    private _wallet: WalletService,
    private _bridge: BridgeService,
    @Inject(DEFAULT_TRANSFER_FEE) private _transferFee: number
  ) {
    this.burnFeeERC$ = this._bridge.burnFees$.pipe(map(fees => fees.lto20));
    this.burnFeeMain$ = this._bridge.burnFees$.pipe(map(fees => fees.lto));
  }

  ngOnInit() {
    this.addressPlaceholder = this.swapType === SwapType.MAIN_ERC20 ? 'ETH' : 'BEP-2';

    const addressValidators: ValidatorFn[] = [Validators.required];

    this.bridgeFee$.pipe(take(1)).subscribe(fee => (this.BRIDGE_MINIMAL_FEE = fee));

    if (this.swapType === SwapType.MAIN_ERC20) {
      addressValidators.push(etheriumAddressValidator);
    } else {
      addressValidators.push((ctrl: AbstractControl) => {
        const address = ctrl.value || '';
        try {
          const decodeAddress = bech32.decode(address);
          if (decodeAddress.prefix === 'tbnb' || decodeAddress.prefix === 'bnb') {
            return null;
          }

          return {
            invalidAddress: true
          };
        } catch (err) {
          return {
            invalidAddress: true
          };
        }
      });
    }

    this.withdrawForm = new FormGroup({
      amount: new FormControl(
        this.BRIDGE_MINIMAL_FEE,
        [Validators.min(this.BRIDGE_MINIMAL_FEE), Validators.required],
        this.validateAmount.bind(this)
      ),
      address: new FormControl('', addressValidators),
      memo: new FormControl('')
    });

    this.receiving$ = this.withdrawForm.valueChanges.pipe(
      map(value => value.amount),
      withLatestFrom(this.bridgeFee$),
      map(([amount, burned]) => {
        if (amount < burned) {
          return 0;
        }
        return amount - burned;
      })
    );

    this._subscriptions.add(
      combineLatest(this._wallet.balance$, this._wallet.transferFee$).subscribe(
        ([balance, transferFee]) => {
          this.maxAmount =
            (balance.available - transferFee * balance.amountDivider) / balance.amountDivider;
        }
      )
    );
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  goToInputStep() {
    this.withdrawForm.enable();
    this.step = 'input';
    this.captchaResponse = '';
    this.confirmed = false;
  }

  goToConfirmation() {
    this.step = 'confirm';
    this.withdrawForm.disable();
  }

  solveCaptcha(response: string) {
    this.captchaResponse = response;
  }

  confirm() {
    this.confirmed = true;
  }

  transfer() {
    const { amount, address, memo } = this.withdrawForm.value;
    const tokenType = this.swapType === SwapType.MAIN_ERC20 ? 'LTO20' : 'BINANCE';
    this.transfer$ = this._wallet.withdraw(
      address,
      amount,
      this._transferFee,
      this.captchaResponse,
      tokenType,
      memo
    );
  }

  closeClick() {
    this.close.next();
  }

  isInvalid(controlName: string) {
    const control = this.withdrawForm.controls[controlName];
    return control.dirty && control.invalid;
  }

  validateAmount(ctrl: AbstractControl) {
    return combineLatest(this._w