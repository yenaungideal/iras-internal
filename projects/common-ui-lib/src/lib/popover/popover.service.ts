import { ComponentType, ConnectionPositionPair, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { ElementRef, Injectable, InjectionToken, Injector, TemplateRef } from '@angular/core';
import { PopoverConfig } from './popover-config';
import { PopoverRef } from './popover-ref';
import { PopoverComponent } from './popover/popover.component';

export const POPOVER_DATA = new InjectionToken('popover.data');

const defaultConfig: PopoverConfig = {
  backdropClass: '',
  disableClose: false,
  panelClass: '',
  position: 'after',
  arrowOffset: 10,
};

/**
 * Service to open modal and manage popovers.
 */
@Injectable()
export class PopoverService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<D = any>(
    componentOrTemplate: ComponentType<any> | TemplateRef<any>,
    target: ElementRef | HTMLElement,
    config: Partial<PopoverConfig> = {}
  ): PopoverRef<D> {
    const popoverConfig: PopoverConfig = Object.assign({}, defaultConfig, config);

    const positionMap: Map<string, ConnectionPositionPair[]> = new Map([
      [
        'after',
        [
          {
            overlayX: 'start',
            overlayY: 'center',
            originX: 'end',
            originY: 'center',
            panelClass: [popoverConfig.position],
            offsetY: 0,
            offsetX: 15,
          },
        ],
      ],
      [
        'above',
        [
          {
            overlayX: 'center',
            overlayY: 'top',
            originX: 'center',
            originY: 'top',
            panelClass: [popoverConfig.position],
            offsetY: -80,
            offsetX: 0,
          },
        ],
      ],
      [
        'before',
        [
          {
            overlayX: 'end',
            overlayY: 'center',
            originX: 'start',
            originY: 'center',
            panelClass: [popoverConfig.position],
            offsetY: 0,
            offsetX: -15,
          },
        ],
      ],
      [
        'below',
        [
          {
            overlayX: 'center',
            overlayY: 'top',
            originX: 'center',
            originY: 'bottom',
            panelClass: [popoverConfig.position],
            offsetY: 15,
            offsetX: 0,
          },
        ],
      ],
    ]);

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(target)
      .withPush(false)
      .withFlexibleDimensions(false)
      .withPositions(positionMap.get(popoverConfig.position));

    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const popoverRef = new PopoverRef(overlayRef, positionStrategy, popoverConfig);

    const popover = overlayRef.attach(
      new ComponentPortal(
        PopoverComponent,
        null,
        new PortalInjector(
          this.injector,
          new WeakMap<any, any>([[PopoverRef, popoverRef]])
        )
      )
    ).instance;

    if (componentOrTemplate instanceof TemplateRef) {
      // rendering a provided template dynamically
      popover.attachTemplatePortal(
        new TemplatePortal(componentOrTemplate, null, {
          $implicit: config.data,
          popover: popoverRef,
        })
      );
    } else {
      // rendering a provided component dynamically
      popover.attachComponentPortal(
        new ComponentPortal(
          componentOrTemplate,
          null,
          new PortalInjector(
            this.injector,
            new WeakMap<any, any>([
              [POPOVER_DATA, config.data],
              [PopoverRef, popoverRef],
            ])
          )
        )
      );
    }

    return popoverRef;
  }
}
