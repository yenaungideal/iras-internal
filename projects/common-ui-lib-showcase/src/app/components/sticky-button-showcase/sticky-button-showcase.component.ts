import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sticky-button-showcase',
  templateUrl: 'sticky-button-showcase.component.html',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class StickyButtonShowcaseComponent implements OnInit {
  data = {
    header: 'Go to sections',
    links: [
      {
        title: 'Review',
        items: [
          'Transaction Details',
          'Lessor/ Landlord Details',
          'Lesse/ Tenant Details',
          'Property/Land Details',
          'Rental Details',
        ],
      },
      {
        title: 'Official Use',
        items: ['Date', 'Duty Type', 'Adjudication Fee/ Valuation Fee', 'Stamp Duty Charges'],
      },
    ],
  };

  constructor() {}

  ngOnInit() {}

  onLinkClicked(item: any) {
    console.log('menu item is clicked: ', item);
  }
}
