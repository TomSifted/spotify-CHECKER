import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { WalletService, IBalance } from '../../core';

@Component({
  selector: 'lto-withdraw-modal',
  templateUrl: './withdraw