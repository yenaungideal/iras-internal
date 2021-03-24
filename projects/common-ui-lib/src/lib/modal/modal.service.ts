import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from './modal.component';

@Injectable()
export class ModalService {
  dialogRef: MatDialogRef<ModalComponent>;
  constructor(public dialog: MatDialog) {}

  show(options: MatDialogConfig) {
    const { panelClass } = options;
    const classList = ['iras-modal'];

    if (typeof panelClass === 'string') {
      classList.push(panelClass);
    } else if (panelClass instanceof Array) {
      classList.push(...panelClass);
    }
    options = {
      ...options,
      panelClass: classList,
    };
    // this means only the last opened modal reference is stored which can be used to close it.
    const dialogRef = this.dialog.open(ModalComponent, options);
    this.dialogRef = dialogRef;
    return dialogRef;
  }

  hide() {
    if (this.dialogRef?.close) {
      this.dialogRef.close();
    }
  }
}
