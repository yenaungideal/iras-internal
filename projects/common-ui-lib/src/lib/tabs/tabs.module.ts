import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { TabsComponent } from './tabs.component';
@NgModule({
  declarations: [TabsComponent],
  imports: [CommonModule, LayoutModule, PortalModule],
  exports: [CommonModule, TabsComponent, PortalModule],
})
export class IrasTabsModule {}
export * from './tabs.model';
