import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IrasTooltipModule } from '../tooltip/tooltip.module';
import { NumericStepperComponent } from './numeric-stepper.component';

@NgModule({
  declarations: [NumericStepperComponent],
  imports: [CommonModule, IrasTooltipModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
  exports: [
    CommonModule,
    IrasTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NumericStepperComponent,
  ],
  providers: [],
})
export class IrasNumericStepperModule {}
