import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IrasTooltipModule } from '../tooltip/tooltip.module';
import { LevelUnitInputComponent } from './level-unit-input.component';

@NgModule({
  declarations: [LevelUnitInputComponent],
  imports: [CommonModule, IrasTooltipModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
  exports: [
    CommonModule,
    IrasTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LevelUnitInputComponent,
  ],
  providers: [],
})
export class IrasLevelUnitInputModule {}
