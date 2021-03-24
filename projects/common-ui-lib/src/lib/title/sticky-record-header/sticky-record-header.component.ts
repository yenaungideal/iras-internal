import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'iras-sticky-record-header',
  templateUrl: './sticky-record-header.component.html',
  styleUrls: ['./sticky-record-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class StickyRecordHeaderComponent implements AfterViewInit {
  @Input() public title: string;
  @Input() templateContentRef: TemplateRef<any>;
  templatePortal: TemplatePortal<any>;

  constructor(private cdr: ChangeDetectorRef, private _viewContainerRef: ViewContainerRef) {}

  ngAfterViewInit(): void {
    if (this.templateContentRef) {
      this.templatePortal = new TemplatePortal(this.templateContentRef, this._viewContainerRef);
    }
    this.cdr.detectChanges();
  }
}
