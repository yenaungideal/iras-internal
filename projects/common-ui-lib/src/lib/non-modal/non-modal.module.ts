import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NonModalComponent } from './non-modal.component';
import { NonModalService } from './non-modal.service';

@NgModule({
  declarations: [NonModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    PortalModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    OverlayModule,
  ],
  exports: [
    CommonModule,
    MatDialogModule,
    PortalModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NonModalComponent,
    OverlayModule,
  ],
  providers: [NonModalService],
  entryComponents: [NonModalComponent],
})
export class IrasNonModalModule {}
export * from './non-modal.service';
