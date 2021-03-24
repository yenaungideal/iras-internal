import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-popup-showcase',
  templateUrl: './dialog-popup-showcase.component.html',
})
export class DialogPopupShowcaseComponent implements OnInit {
  // Dialog popups
  public dialog1Opened = false;
  public dialog2Opened = false;
  public dialog3Opened = false;
  public dialog4Opened = false;

  constructor() {}

  ngOnInit() {}

  onDialogContinue(event: any) {
    console.log('[onDialogContinue] ', event);
  }
}
