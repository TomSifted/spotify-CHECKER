import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'lto-copyable-text',
  templateUrl: './copyable-text.component.html',
  styleUrls: ['./copyable-text.component.scss'],
})
export class CopyableTextComponent implements OnInit {
  @Input() text: string = '';
  @Input() label: string = '';

  constructor(private snackbar: MatSnackBar) {}

  ngOnInit() {}

  