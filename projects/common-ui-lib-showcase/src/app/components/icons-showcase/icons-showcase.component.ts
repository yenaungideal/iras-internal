import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons-showcase',
  templateUrl: './icons-showcase.component.html',
  styleUrls: ['./icons-showcase.component.scss'],
})
export class IconsShowcaseComponent implements OnInit {
  icons = [
    'add-record_hover.svg',
    'add-record.svg',
    'alert.svg',
    'approved.svg',
    'excel.svg',
    'green-smile.svg',
    'hamburger-menu_hover.svg',
    'hamburger-menu.svg',
    'internal_grey_exclamation.svg',
    'internal_computer.svg',
    'info.svg',
    'maximise_blue.svg',
    'maximise_dark_blue.svg',
    'minimise_blue.svg',
    'minimise_dark_blue.svg',
    'new-window.svg',
    'orange-smile.svg',
    'red-smile.svg',
    'caret-inverted.svg',
    'caret-left.svg',
    'caret.svg',
    'close.svg',
    'close-active.svg',
    'sortupdown.svg',
    'tick.svg',
  ];

  constructor() {}

  ngOnInit() {}
}
