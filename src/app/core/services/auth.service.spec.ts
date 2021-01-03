import { TestBed } from '@angular/core/testing';
import { LTO_MOBILE_AUTH, LTO_NETWORK_BYTE, LTO_PUBLIC_API } from '../../tokens';

import { LedgerServiceMock } from './mocks';

import { AuthService } from './auth.service';

describe('core/AuthServiceImpl', () => {
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService.provider,
        LedgerSer