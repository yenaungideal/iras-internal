import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PopoverService } from './popover.service';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  declarations: [PopoverComponent],
  imports: [CommonModule, OverlayModule, FlexLayoutModule, PortalModule],
  exports: [CommonModule, OverlayModule, FlexLayoutModule, PortalModule],
  providers: [PopoverService],
  entryComponents: [PopoverComponent],
})
export class IrasPopoverModule {}
