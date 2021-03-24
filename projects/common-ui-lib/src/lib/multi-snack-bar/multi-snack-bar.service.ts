import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { MultiSnackbarComponent } from './multi-snack-bar.component';
import { IMultiSnackbarOptions } from './multi-snackbar.model';

@Injectable({
  providedIn: 'root',
})
export class MultiSnackbarService {
  private componentDataStream = new BehaviorSubject<Array<IMultiSnackbarOptions>>([]);
  private maxMultiBar = 3;
  private matSnackBarRef: MatSnackBarRef<MultiSnackbarComponent>;

  constructor(private snackBar: MatSnackBar) {}

  show(options: IMultiSnackbarOptions) {
    const currentList = this.componentDataStream.value;
    const snackBarId = (+new Date()).toString();
    if (!options.uniqueId) {
      options.uniqueId = snackBarId;
    }

    currentList.unshift(options);
    if (currentList.length > this.maxMultiBar) {
      currentList.splice(currentList.length - 1, 1);
    }

    this.componentDataStream.next(this.componentDataStream.value);

    if (!this.matSnackBarRef) {
      this.matSnackBarRef = this.snackBar.openFromComponent(MultiSnackbarComponent, {
        data: this.componentDataStream,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }
    this.matSnackBarRef
      .afterDismissed()
      .toPromise()
      .then((_) => {
        this.matSnackBarRef = null;
      });

    ((id: string) => {
      setTimeout(() => {
        const index = this.componentDataStream.value.findIndex((i) => i.uniqueId === id);
        if (this.matSnackBarRef && index !== -1) {
          this.matSnackBarRef.instance.closeSnackBar(index);
        }
      }, 10000);
    })(snackBarId);
  }

  close() {
    if (this.matSnackBarRef) {
      this.matSnackBarRef.dismiss();
      this.matSnackBarRef = null;
    }
  }
}
