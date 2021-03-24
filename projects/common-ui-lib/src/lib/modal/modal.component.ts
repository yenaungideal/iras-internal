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

interface ModalData {
  templateContentRef: TemplateRef<any>;
}
@Component({
  selector: 'iras-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, AfterViewInit {
  templateContentRef: TemplateRef<any>;
  templatePortal: TemplatePortal<any>;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private _viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {
    this.templateContentRef = data.templateContentRef;
  }

  ngOnInit(): void {}

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
