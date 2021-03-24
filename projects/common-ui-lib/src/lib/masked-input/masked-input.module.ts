import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { MaskedInputComponent } from './masked-input.component';

@NgModule({
  declarations: [MaskedInputComponent],
  imports: [CommonModule, FormsModule, InputsModule, FlexLayoutModule, ReactiveFormsModule],
  exports: [CommonModule, FormsModule, InputsModule, FlexLayoutModule, ReactiveFormsModule, MaskedInputComponent],
  providers: [],
})
export class IrasMaskedInputModule {}
export * from './mask.enum';
