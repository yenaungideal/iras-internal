import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'iras-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LinkComponent implements AfterViewInit, OnChanges {
  @Input() templateContentRef: TemplateRef<any>;
  @Input() cssClass: string[];
  @Input() color: string;
  templatePortal: TemplatePortal<any>;
  constructor(private _viewContainerRef: ViewContainerRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.templateContentRef) {
      this.templatePortal = new TemplatePortal(this.templateContentRef, this._viewContainerRef);
    }
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    const containerClassMap = {} as any;
    if (changes.color && changes.color.previousValue !== changes.color.currentValue) {
      const color = changes.color?.currentValue || this.color;
      containerClassMap[
        color
          ? `iras-color iras-color-${color} iras-button__color--${color}`
          : 'iras-color iras-color-primary iras-button__color--primary'
      ] = true;
    }
  }
}
