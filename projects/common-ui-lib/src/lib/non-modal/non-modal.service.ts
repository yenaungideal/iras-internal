import { Overlay } from '@angular/cdk/overlay';
import { Injectable, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NonModalComponent } from './non-modal.component';

@Injectable()
export class NonModalService {
  dialogRef: MatDialogRef<NonModalComponent>;
  triggerElementRef: ElementRef;
  constructor(public dialog: MatDialog, overlay: Overlay) {}

  show(matDialogConfig: MatDialogConfig) {
    if (this.dialog.openDialogs.length < 1) {
      const { panelClass } = matDialogConfig;
      const classList = ['iras-non-modal'];

      if (typeof panelClass === 'string') {
        classList.push(panelClass);
      } else if (panelClass instanceof Array) {
        classList.push(...panelClass);
      }
      matDialogConfig.position = { right: '40px', bottom: '0' };
      matDialogConfig.hasBackdrop = false;
      matDialogConfig = {
        ...matDialogConfig,
        panelClass: classList,
      };
      // this means only the last opened modal reference is stored which can be used to close it.
      const dialogRef = this.dialog.open(NonModalComponent, matDialogConfig);
      const element = document.getElementsByClassName('cdk-global-scrollblock');
      if (element && element[0]) {
        element[0].classList.add('non-modal-scrollblock');
      }
      this.dialogRef = dialogRef;
      return dialogRef;
    }
  }

  hide() {
    if (this.dialogRef?.close) {
      this.dialogRef.close();
    }
  }
}
