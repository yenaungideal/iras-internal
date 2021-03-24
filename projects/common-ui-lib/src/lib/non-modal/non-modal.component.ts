import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface NonModalData {
  templateContentRef: TemplateRef<any>;
}
@Component({
  selector: 'iras-non-modal',
  templateUrl: './non-modal.component.html',
  styleUrls: ['./non-modal.component.scss'],
})
export class NonModalComponent implements OnInit, AfterViewInit {
  templateContentRef: TemplateRef<any>;
  templatePortal: TemplatePortal<any>;
  iconMinimize = false;
  constructor(
    public dialogRef: MatDialogRef<NonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NonModalData,
    private _viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {
    this.templateContentRef = data.templateContentRef;
  }

  ngOnInit(): void {}

  minimizeMaximizeDialog() {
    this.iconMinimize = !this.iconMinimize;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit(): void {
    if (this.templateContentRef) {
      this.templatePortal = new TemplatePortal(this.templateContentRef, this._viewContainerRef);
    }
    this.cdr.detectChanges();
  }
}
