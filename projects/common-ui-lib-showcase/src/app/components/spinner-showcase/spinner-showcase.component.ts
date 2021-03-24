import { Component, OnInit, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../../../../common-ui-lib/src/lib/modal/modal.service';

@Component({
  selector: 'app-spinner-showcase',
  templateUrl: './spinner-showcase.component.html',
  styleUrls: ['./spinner-showcase.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SpinnerShowcaseComponent implements OnInit {
  @ViewChild('spinnerRef', { static: false }) spinnerRef: TemplateRef<any>;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  openModal() {
    this.modalService.show({
      data: {
        templateContentRef: this.spinnerRef,
      },
      panelClass: 'auto-saving-draft-dialog',
      backdropClass: 'auto-saving-draft-dialog-backdrop',
      disableClose: true,
    });
    setTimeout(() => {
      this.modalService.hide();
    }, 3000);
  }
}
