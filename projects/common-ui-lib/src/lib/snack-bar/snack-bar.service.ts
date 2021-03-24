import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snack-bar.component';

@Injectable()
export class SnackbarService {
  public matSnackBarRef: MatSnackBarRef<any>;

  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(options: MatSnackBarConfig) {
    this.matSnackBarRef = this.snackBar.openFromComponent(SnackbarComponent, options);
  }
}
