import { Component, OnInit } from '@angular/core';
import { ScriptsService } from '../../core';
import { Observable } from 'rxjs';

@Component({
  selector: 'lto-wallet-script-info-modal',
  templateUrl: './script-info-modal.component.html',
  styleUrls: ['./script-info-modal.component.scss']
})
export class ScriptInfoModalComponent implements OnInit {
  info$: Observable<any>;

  constructor(private _scr