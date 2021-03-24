import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextAreaComponent } from './text-area.component';

@NgModule({
  declarations: [TextAreaComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, TextAreaComponent],
  providers: [],
})
export class IrasTextAreaModule {}
