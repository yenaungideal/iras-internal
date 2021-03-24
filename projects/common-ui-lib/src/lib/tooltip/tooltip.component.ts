import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { PopoverConfig } from '../popover/popover-config';
import { PopoverService } from '../popover/popover.service';

@Component({
  selector: 'iras-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TooltipComponent implements AfterViewInit {
  @Input() templateLabelRef: TemplateRef<any>;
  @Input() tooltipLabelType: 'info' | 'custom' = 'info';
  @Input() tooltipLabelText: string;
  @Input() tooltipContentTitle: string;
  @Input() tooltipContentText: string;
  @Input() minTooltipPanelWidth: string;
  @Input() maxTooltipPanelWidth: string;
  @Input() showCloseButton = true;
  @Input() position: 'after' | 'before' | 'above' | 'below' = 'after';

  templatePortal: TemplatePortal<any>;
  overlayPane: HTMLElement;
  constructor(
    private popoverService: PopoverService,
    private _viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (this.tooltipLabelType === 'custom' && this.templateLabelRef) {
      this.templatePortal = new TemplatePortal(this.templateLabelRef, this._viewContainerRef);
    }
    this.cdr.detectChanges();
  }

  showTooltip(template: TemplateRef<any>, target: HTMLElement) {
    this.popoverService.open(template, target, {
      disableClose: !this.showCloseButton,
      panelClass: ['iras-popover'],
      backdropClass: 'iras-popover--backdrop',
      position: this.position,
      arrowOffset: 10,
      arrowSize: 20,
    } as PopoverConfig);
    this.overlayPane = document.querySelector('.cdk-overlay-pane .popover-container');
    if (this.minTooltipPanelWidth) {
      this.overlayPane.style.minWidth = `${this.minTooltipPanelWidth}px`;
    }
    if (this.maxTooltipPanelWidth) {
      this.overlayPane.style.maxWidth = `${this.maxTooltipPanelWidth}px`;
    }
  }
}
