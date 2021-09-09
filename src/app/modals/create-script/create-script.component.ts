import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ScriptsService, PredefinedScript } from '../../core';
import { Observable } from 'rxjs';

@Component({
  selector: 'lto-create-script',
  templateUrl: './create-script.component.html',
  styleUrls: ['./create-script.component.scss'],
})
export class CreateScriptComponent {
  scri