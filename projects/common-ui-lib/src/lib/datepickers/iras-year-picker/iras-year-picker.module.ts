import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IrasMaskedInputModule } from '../../masked-input/masked-input.module';
import { IrasYearPickerComponent } from './iras-year-picker.component';

@NgModule({
  declarations: [IrasYearPickerComponent],

  imports: [
    MatDatepickerModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    IrasMaskedInputModule,
  ],
  exports: [
    IrasYearPickerComponent,
    MatDatepickerModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    IrasMaskedInputModule,
  ],
})
export class IrasYearPickerModule {}
