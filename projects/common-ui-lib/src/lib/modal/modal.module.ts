import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';

@NgModule({
  declarations: [ModalComponent],
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
    ModalComponent,
    OverlayModule,
  ],
  providers: [ModalService],
  entryComponents: [ModalComponent],
})
export class IrasModalModule {}
export * from './modal.service';
