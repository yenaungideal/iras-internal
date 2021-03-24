import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-content-sample',
  templateUrl: 'modal-content-sample.component.html',
  styleUrls: ['./modal-content-sample.component.scss'],
})
export class ModalContentSampleComponent implements OnInit {
  @Output() modalClosed = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  buttonClicked() {
    this.modalClosed.emit();
  }
}
