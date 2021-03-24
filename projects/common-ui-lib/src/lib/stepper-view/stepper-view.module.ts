import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StepperViewComponent } from './stepper-view.component';
@NgModule({
  declarations: [StepperViewComponent],
  imports: [CommonModule],
  exports: [CommonModule, StepperViewComponent],
})
export class IrasStepperViewModule {}
