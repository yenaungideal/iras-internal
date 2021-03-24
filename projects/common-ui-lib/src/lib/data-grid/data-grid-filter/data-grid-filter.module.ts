import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { IrasDatePickerModule } from '../../datepickers/iras-date-picker/iras-date-picker.module';
import { IrasDropdownsModule } from '../../dropdowns/dropdowns.module';
import { IrasInputModule } from '../../input/input.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IrasDropdownsModule,
    DropDownListModule,
    DatePickerModule,
    IrasDatePickerModule,
    GridModule,
    IrasInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    IrasDropdownsModule,
    DropDownListModule,
    DatePickerModule,
    IrasDatePickerModule,
    GridModule,
    IrasInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class DataGridFilterModule {}
