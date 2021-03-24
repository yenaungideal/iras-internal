import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitPipe } from './split.pipe';

@NgModule({
  declarations: [SplitPipe],
  imports: [CommonModule],
  exports: [SplitPipe],
  providers: [],
})
export class PipesModule {}
