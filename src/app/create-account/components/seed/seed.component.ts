import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lto-wallet-seed',
  template: `
    <span class="word" *ngFor="let word of words; last as isLast">{{ word }}<ng-container *ngIf="!isLast">&nbsp;</ng-container></span>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 16px;
        border: 1p