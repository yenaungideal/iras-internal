import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RadioButtonComponent } from './radio-button.component';
@NgModule({
  declarations: [RadioButtonComponent],
  imports: [CommonModule, FormsModule, FlexLayoutModule],
  exports: [CommonModule, FormsModule, FlexLayoutModule, RadioButtonComponent],
})
export class IrasRadioButtonModule {}
export * from './radio-button.type';
