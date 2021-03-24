import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { TabItem } from './tabs.model';
@Component({
  selector: 'iras-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnChanges {
  @Input() tabs: TabItem[];
  @Output() tabSelected: EventEmitter<TabItem> = new EventEmitter();
  portalOutletRefs: TemplatePortal<any>[];
  constructor(private _viewContainerRef: ViewContainerRef, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tabs.currentValue && changes.tabs.currentValue !== changes.tabs.previousValue) {
      if (!this.portalOutletRefs) {
        this.portalOutletRefs = [];
      }
      for (const [index, item] of Object.entries(this.tabs) || []) {
        this.portalOutletRefs[index] = new TemplatePortal(item.templateRef, this._viewContainerRef);
      }
      this.cdr.detectChanges();
    }
  }

  onTabSelect(event: any) {
    this.tabSelected.emit(event);
  }
}
