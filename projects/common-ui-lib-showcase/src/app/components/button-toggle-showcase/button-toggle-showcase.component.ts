import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-toggle-showcase',
  templateUrl: './button-toggle-showcase.component.html',
  styleUrls: ['./button-toggle-showcase.component.scss'],
})
export class ButtonToggleShowcaseComponent implements OnInit {
  items = ['With Duty', 'Exempt', 'Remit', 'No Duty', 'Relief'];
  val: string;
  constructor() {}

  ngOnInit(): void {
    this.val = this.items[0];
  }

  onButtonToggle(selected: any) {
    console.log('Button Toggle Selected: ', selected);
  }
}
