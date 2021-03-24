import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormInputErrorComponent } from './form-input-error.component';

@NgModule({
  declarations: [FormInputErrorComponent],
  imports: [CommonModule, PortalModule, FlexLayoutModule],
  exports: [PortalModule, FormInputErrorComponent, FlexLayoutModule],
  providers: [],
})
export class IrasFormInputErrorModule {}
