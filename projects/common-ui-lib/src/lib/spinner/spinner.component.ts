import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'iras-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SpinnerComponent implements OnInit {
  @Input() diameter = 30;
  @Input() mode: ProgressSpinnerMode = 'indeterminate';
  @Input() strokeWidth = 2;
  @Input() value: number;

  constructor() {}

  ngOnInit(): void {}
}
