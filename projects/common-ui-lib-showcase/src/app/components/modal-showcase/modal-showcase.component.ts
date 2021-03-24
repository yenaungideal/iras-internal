import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalService } from '../../../../../common-ui-lib/src/lib/modal/modal.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { modalTestIrasHomePageHTMLText } from './iras-home-page.mock';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../../../../common-ui-lib/src/lib/modal/modal.component';

type ModalTypes = 'grid' | 'lotsOfHtml' | 'secondModal';
@Component({
  selector: 'app-modal-showcase',
  templateUrl: './modal-showcase.component.html',
  styleUrls: ['./modal-showcase.component.scss'],
})
export class ModalShowcaseComponent implements OnInit {
  typeOfContent: ModalTypes = 'secondModal';
  modalLargeHTML: SafeHtml;
  @ViewChild('modalContentRef', { static: false }) modalContentRef: TemplateRef<any>;
  @ViewChild('secondModalRef', { static: false }) secondModalRef: TemplateRef<any>;
  modalRef1: MatDialogRef<ModalComponent, any>;
  modalRef2: MatDialogRef<ModalComponent, any>;
  constructor(private modalService: ModalService, private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.modalLargeHTML = this.domSanitizer.bypassSecurityTrustHtml(modalTestIrasHomePageHTMLText);
  }

  showModal() {
    this.modalRef1 = this.modalService.show({
      data: {
        templateContentRef: this.modalContentRef,
      },
      panelClass: 'modal-showcase',
      backdropClass: 'modal-showcase-backdrop',
      disableClose: false,
    });
  }

  showModalWith(typeOfModal: ModalTypes) {
    this.typeOfContent = typeOfModal;
    this.showModal();
  }

  closeFirstModal() {
    this.modalRef1.close();
  }

  openSecondModal() {
    this.modalRef2 = this.modalService.show({
      data: {
        templateContentRef: this.secondModalRef,
      },
      disableClose: false,
    });
  }

  closeSecondModal() {
    this.modalRef2.close();
  }

  callHide() {
    this.modalService.hide();
  }
}
