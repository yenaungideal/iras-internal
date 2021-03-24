import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-empty-state-box-showcase',
  templateUrl: './empty-state-box-showcase.component.html',
  styleUrls: ['./empty-state-box-showcase.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class EmptyStateBoxShowcaseComponent {
  headerText = 'Header Label';
  descriptionText =
    '(Optional) Description label, sample text, Lorem Lpsum is simply dummy tex of the printing and typesetting industry.\n (Optional) Description label, sample text, Lorem Lpsum is simply dummy tex of the printing and typesetting industry.';
  headerTextOnly = 'No Access';
  headerTextSearchResult = 'No records found';
  headerTextSearchDescription =
    'Search criteria:"S123456A", "Jurong west street 12" \n Please refine your search criteria';
}
