import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IrasMaskedInputModule } from '../../masked-input/masked-input.module';
import { IrasMonthYearPickerComponent } from './iras-month-year-picker.component';

@NgModule({
  declarations: [IrasMonthYearPickerComponent],

  imports: [
    MatDatepickerModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    IrasMaskedInputModule,
  ],
  exports: [
    IrasMonthYearPickerComponent,
    MatDatepickerModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    IrasMaskedInputModule,
  ],
})
export class IrasMonthYearPickerModule {}
