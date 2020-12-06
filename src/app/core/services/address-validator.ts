import { LTO_NETWORK_BYTE, LTO_PUBLIC_API } from '../../tokens';
import { ValidatorFn } from '@angular/forms';
import { LTO } from 'lto-api';
import { FactoryProvider, InjectionToken } from '@angular/core';
import { WalletService } from './wallet.service';
import { WavesService } from './waves.service';

export function addressValidatorFactory(networkByte: string, publicApi: string): ValidatorFn {
  return function(control: any) {
    const value = control.value;
    let isValid = true;

    if (value) {
     