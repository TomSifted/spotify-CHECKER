import { Component, OnInit, Output, EventEmitter, Inject, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable, combineLatest, ReplaySubject, Subscription } from 'rxjs';
import { BridgeService, WalletService, eth