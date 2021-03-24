import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-title-showcase',
  templateUrl: './title-showcase.component.html',
  styleUrls: ['./title-showcase.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TitleShowcaseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
