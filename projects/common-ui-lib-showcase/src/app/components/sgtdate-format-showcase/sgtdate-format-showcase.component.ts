import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-sgtdate-format-showcase',
  templateUrl: './sgtdate-format-showcase.component.html',
  styleUrls: ['sgtdate-format-showcase.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SGTDateFormatShowcaseComponent implements OnInit {
  today = new Date();
  isoStringConversionList = [
    {
      input: '2015-03-25',
      dateString: new Date(2015, 2, 25),
      iso: new Date(2015, 2, 25).toISOString(),
    },
    {
      input: '13/12/1921',
      dateString: new Date(1921, 11, 13),
      iso: new Date(1921, 11, 13).toISOString(),
    },
    {
      input: this.today,
      dateString: this.today,
      iso: this.today.toISOString(),
    },
  ];

  formatFromToList = [];
  constructor() {}

  ngOnInit(): void {}
}
