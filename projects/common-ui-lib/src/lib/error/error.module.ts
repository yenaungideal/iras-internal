import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IrasButtonsModule } from '../button/button.module';
import { ErrorComponent } from './error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [CommonModule, FlexLayoutModule, IrasButtonsModule],
  exports: [ErrorComponent, IrasButtonsModule],
  providers: [],
})
export class IrasErrorModule {}
