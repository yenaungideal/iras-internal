import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IrasMaskedInputModule } from '../../masked-input/masked-input.module';
import { IrasDatePickerModule } from '../iras-date-picker/iras-date-picker.module';
import { IrasDateRangePickerComponent } from './iras-date-range-picker.component';

@NgModule({
  declarations: [IrasDateRangePickerComponent],

  imports: [
    MatDatepickerModule,
    IrasDatePickerModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    IrasMaskedInputModule,
  ],
  exports: [
    IrasDateRangePickerComponent,
    IrasDatePickerModule,
    MatDatepickerModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    IrasMaskedInputModule,
  ],
})
export class IrasDateRangePickerModule {}
