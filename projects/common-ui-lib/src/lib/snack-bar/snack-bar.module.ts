import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snack-bar.component';
import { SnackbarService } from './snack-bar.service';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, MatSnackBarModule, FlexLayoutModule, ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    MatSnackBarModule,
    PortalModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SnackbarComponent,
  ],
  providers: [SnackbarService],
  entryComponents: [SnackbarComponent],
})
export class IrasSnackbarModule {}

export * from './snack-bar.service';
