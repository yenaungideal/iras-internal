import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IrasDropdownsModule } from '../dropdowns/dropdowns.module';
import { IrasFormInputErrorModule } from '../form-input-error/form-input-error.module';
import { RequiredSymbolModule } from '../required-symbol/required-symbol.module';
import { AuditTrailComponent } from './audit-trail.component';

@NgModule({
  declarations: [AuditTrailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    IrasDropdownsModule,
    IrasFormInputErrorModule,
    RequiredSymbolModule,
  ],
  exports: [
    CommonModule,
    AuditTrailComponent,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    IrasDropdownsModule,
    IrasFormInputErrorModule,
    RequiredSymbolModule,
  ],
  providers: [],
})
export class IrasAuditTrailModule {}
