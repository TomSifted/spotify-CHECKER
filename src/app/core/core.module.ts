import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AppbarModule, SidenavModule } from './components';

import {
  PublicNode,
  BridgeService,
  EncoderService,
  WalletService,
  AuthService,
  addresValidatorProvider,
  WavesService,
  Sidenav,
  wavesAddressValidatorProvider,
  ScriptsService,
  LedgerService,
} from './services';

import { ScriptsServiceImpl } from './services/scripts.s