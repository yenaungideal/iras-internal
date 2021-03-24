import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner.component';
@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, MatProgressSpinnerModule, FlexLayoutModule],
  exports: [SpinnerComponent, MatProgressSpinnerModule, FlexLayoutModule],
})
export class IrasSpinnerModule {}
