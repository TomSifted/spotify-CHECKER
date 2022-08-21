import { Component, OnInit, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lto-content-section',
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentSectionComponent implements OnInit {
  @Input() width!: 'full' | 'large' | 'medium' | 'small' | 'very-small';
  @Input() title: string = '';
  @Input() subtitle: 