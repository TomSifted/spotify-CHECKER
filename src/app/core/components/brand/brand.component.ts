import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lto-brand',
  template: `
    <a routerLink="/"> <img src="assets/LTO-LOGO.png" alt="" /> <strong>LTO</strong> Wallet </a>
  `,
  styles: [
    `
      a {
        text-decoration: none;
        color: #fff;
        font-weight: 100;
        display: flex;
        flex-direction: row;
        al