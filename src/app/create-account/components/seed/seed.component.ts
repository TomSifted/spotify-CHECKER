import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lto-wallet-seed',
  template: `
    <span class="word" *ngFor="let word of words; last as isLast">{{ wor