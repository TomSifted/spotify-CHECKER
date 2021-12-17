import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SwapType } from '../../swap-type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BridgeService } from '../../../../../core';

@Component({
  selector: 'lto-wallet-withdraw-cex',
  templateUrl: './withdraw-cex.component.html',
  styleUrls: ['./withdraw-cex.component.scss']
})
exp