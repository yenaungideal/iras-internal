import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { updateOverlayPosition } from './dropdown-cdkportal.util';

@Component({
  selector: 'iras-dropdown-cdk-portal',
  template: ` <ng-template cdk-portal>
    <ng-content></ng-content>
  </ng-template>`,
})
export class DropdownCdkPortalComponent {
  @Input()
  public reference: HTMLElement;

  @Input()
  dropdownOptionContanierHeight: any;

  @Output()
  public dropdownStatusChange = new EventEmitter<boolean>();

  @ViewChild(CdkPortal)
  public contentTemplate: CdkPortal;

  public showing = false;
  protected overlayRef: OverlayRef;
  dropdownOptionContanier: any;

  boundClient: any;
  constructor(protected overlay: Overlay) {}

  public show() {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate);
    this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => this.hide());
    this.showing = true;
    this.dropdownStatusChange.emit(true);
    setTimeout(() => {
      this.dropdownOptionContanier = document.querySelector('.custom-dropdown-options-container');
      const height = `max-height:${this.dropdownOptionContanierHeight}px;`;
      this.dropdownOptionContanier.setAttribute('style', height);
      const selectOptionHeight = (this.dropdownOptionContanier?.getBoundingClientRect() || {}).height;
      const topValue = updateOverlayPosition({
        selectOptionHeight,
        boundClient: this.boundClient,
        windowHeight: window.innerHeight,
      });

      const overlayPane: HTMLElement = document.querySelector('.cdk-overlay-pane');
      overlayPane.style.top = `${topValue}px`;
    }, 5);
  }

  public hide() {
    this.overlayRef.detach();
    this.showing = false;
    this.dropdownStatusChange.emit(false);
  }

  @HostListener('window:resize')
  public onWinResize() {
    this.syncWidth();
  }

  protected getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.reference)
      .withPush(false)
      .withLockedPosition(true)
      .withFlexibleDimensions(false)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);

    const scrollStrategy = this.overlay.scrollStrategies.block();
    return new OverlayConfig({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

  private syncWidth() {
    if (!this.overlayRef) {
      return;
    }

    this.boundClient = this.reference.getBoundingClientRect();
    this.overlayRef.updateSize({ width: this.boundClient.width });
  }
}
