import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'iras-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ErrorComponent implements OnInit {
  @Input() errorDescription: any;

  constructor() {}

  ngOnInit(): void {}
}
