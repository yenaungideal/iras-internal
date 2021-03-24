import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { TabItem } from '../../../../../common-ui-lib/src/lib/tabs/tabs.model';

@Component({
  selector: 'app-tabs-showcase.component',
  templateUrl: './tabs-showcase.component.html',
})
export class TabsShowcaseComponent implements OnInit, AfterViewInit {
  tabTitles = ['Financial Records', 'Non-Financial Records/ In-Progress'];
  @ViewChild('tab1Item') tab1Item: TemplateRef<any>;
  @ViewChild('tab2Item') tab2Item: TemplateRef<any>;
  tabs: TabItem[];
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.tabs = [
      {
        title: 'Financial Records',
        templateRef: this.tab1Item,
        selected: true,
      },
      {
        title: 'Non-Financial Records/ In-Progress',
        templateRef: this.tab2Item,
        selected: false,
      },
    ];
    setTimeout(() => {
      this.tabs = [
        {
          title: 'Test 1',
          templateRef: this.tab1Item,
          selected: false,
        },
        {
          title: 'Test 2',
          templateRef: this.tab2Item,
          selected: true,
        },
      ];
    }, 5000);
    console.log('from tab showcase: ', { tabs: this.tabs });
    this.cdr.detectChanges();
  }

  onTabSelect(tab: any) {
    console.log(tab.title);
  }
}
