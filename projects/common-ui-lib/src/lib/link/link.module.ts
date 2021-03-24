import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LinkComponent } from './link.component';

@NgModule({
  declarations: [LinkComponent],
  imports: [CommonModule, PortalModule],
  exports: [CommonModule, PortalModule, LinkComponent],
})
export class IrasLinkModule {}
