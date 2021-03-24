import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardContainerComponent } from './card-container.component';

@NgModule({
  declarations: [CardContainerComponent],
  imports: [CommonModule, PortalModule],
  exports: [CommonModule, PortalModule, CardContainerComponent],
})
export class IrasCardsModule {}
