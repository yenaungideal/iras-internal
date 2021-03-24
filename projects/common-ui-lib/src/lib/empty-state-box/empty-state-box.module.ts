import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IrasCardsModule } from '../card/cards.module';
import { EmptyStateBoxComponent } from './empty-state-box.component';

@NgModule({
  declarations: [EmptyStateBoxComponent],
  imports: [CommonModule, FlexLayoutModule, IrasCardsModule],
  exports: [CommonModule, FlexLayoutModule, EmptyStateBoxComponent],
  providers: [],
})
export class IrasEmptyStateBoxModule {}
