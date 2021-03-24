import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IrasMaskedInputModule } from '../../masked-input/masked-input.module';
import { IrasDatePickerComponent } from './iras-date-picker.component';

@NgModule({
  declarations: [IrasDatePickerComponent],

  imports: [
    MatDatepickerModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    IrasMaskedInputModule,
  ],
  exports: [
    IrasDatePickerComponent,
    MatDatepickerModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    IrasMaskedInputModule,
  ],
})
export class IrasDatePickerModule {}
