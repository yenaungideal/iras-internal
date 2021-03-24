import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal/modal.service';
@Component({
  selector: 'iras-dialog-popup',
  templateUrl: './dialog-popup.component.html',
  styleUrls: ['./dialog-popup.component.scss'],
})
export class DialogPopupComponent implements OnDestroy, AfterViewInit {
  @Input() title: string;
  @Input() description1: string;
  @Input() description2: string;
  @Input() isOkAction = true;
  @Input() okActionText = 'Continue';
  @Input() okActionStyle = 'btn btn-primary';
  @Input() isCancelAction = true;
  @Input() cancelActionText = 'Cancel';
  @Input() cancelActionStyle = 'btn btn-primary-invert';
  @Input() showTitleIcon = true;
  @Input() showFileUploadConflictPanel = false;
  @Input() width = '414px';
  @Input() height = 'auto';

  @Output() dialogClose: EventEmitter<string> = new EventEmitter();
  @Output() dialogContinue: EventEmitter<any> = new EventEmitter();

  @ViewChild('dialogContentRef', { static: false }) dialogModalContentRef: TemplateRef<any>;

  dialogRef: MatDialogRef<ModalComponent>;
  constructor(public modalService: ModalService) {}
  ngAfterViewInit(): void {
    this.dialogRef = this.modalService.show({
      data: {
        templateContentRef: this.dialogModalContentRef,
      },
      panelClass: 'iras-dialog-panel',
      backdropClass: 'iras-dialog-backdrop',
      disableClose: true,
    });
  }

  public onBack() {
    this.dialogClose.emit('Dialog closed');
    this.modalService.hide();
  }

  public onContinue() {
    this.dialogContinue.emit('continue clicked');
    this.modalService.hide();
  }
  ngOnDestroy() {
    this.dialogRef.close();
  }
}
