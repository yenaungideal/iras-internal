import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';
@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule, FormsModule, FlexLayoutModule],
  exports: [CommonModule, FormsModule, FlexLayoutModule, CheckboxComponent],
})
export class IrasCheckboxModule {}
export * from './checkbox-options.type';
