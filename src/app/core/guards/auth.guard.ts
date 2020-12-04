import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest(this.auth.authenticated$, this.auth.