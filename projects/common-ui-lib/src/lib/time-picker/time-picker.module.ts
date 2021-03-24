import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IrasDatePickerModule } from '../datepickers/iras-date-picker/iras-date-picker.module';
import { IrasDropdownsModule } from '../dropdowns/dropdowns.module';
import { IrasInputModule } from '../input/input.module';
import { IrasTimePickerComponent } from './time-picker.component';
@NgModule({
  declarations: [IrasTimePickerComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    IrasInputModule,
    IrasDatePickerModule,
    IrasDropdownsModule,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    IrasInputModule,
    IrasDatePickerModule,
    IrasDropdownsModule,
    IrasTimePickerComponent,
  ],
})
export class IrasTimePickerModule {}
export * from './time-picker-regex';
export * from './time-picker.model';
