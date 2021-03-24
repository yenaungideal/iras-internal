import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpansionPanelComponent } from './expansion-panel.component';

@NgModule({
  declarations: [ExpansionPanelComponent],
  imports: [CommonModule, PortalModule, MatExpansionModule],
  exports: [CommonModule, PortalModule, MatExpansionModule, ExpansionPanelComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IrasExpansionPanelModule {}
