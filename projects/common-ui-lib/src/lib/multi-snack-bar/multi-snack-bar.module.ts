import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MultiSnackbarComponent } from './multi-snack-bar.component';

@NgModule({
  declarations: [MultiSnackbarComponent],
  imports: [CommonModule, MatSnackBarModule, FlexLayoutModule, ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    MatSnackBarModule,
    PortalModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MultiSnackbarComponent,
  ],
  providers: [],
  entryComponents: [MultiSnackbarComponent],
})
export class IrasMultiSnackbarModule {}
export * from './multi-snack-bar.service';
export * from './multi-snackbar.model';
