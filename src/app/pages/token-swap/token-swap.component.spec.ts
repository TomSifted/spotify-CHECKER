import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared';

import { TokenSwapComponent } from './token-swap.component';

describe('TokenSwapComponent', () => {
  let component: TokenSwapComponent;
  let fixture: ComponentFixture<TokenSwapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [TokenSwapComponent]
    }).compileComponents(