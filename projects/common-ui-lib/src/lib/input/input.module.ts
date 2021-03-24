import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IrasTooltipModule } from '../tooltip/tooltip.module';
import { AmountInputComponent } from './amount-input/amount-input.component';
import { InputComponent } from './input.component';

@NgModule({
  declarations: [InputComponent, AmountInputComponent],
  imports: [CommonModule, IrasTooltipModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
  exports: [
    CommonModule,
    IrasTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    InputComponent,
    AmountInputComponent,
  ],
  providers: [],
})
export class IrasInputModule {}
export * from './amount-input/amount-input.util';
export * from './input.util';
