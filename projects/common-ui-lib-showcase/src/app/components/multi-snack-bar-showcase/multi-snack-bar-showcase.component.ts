import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { MultiSnackbarService } from '../../../../../common-ui-lib/src/lib/multi-snack-bar/multi-snack-bar.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-multi-snack-bar-showcase',
  templateUrl: 'multi-snack-bar-showcase.component.html',
  styleUrls: ['./multi-snack-bar-showcase.component.scss'],
})
export class MultiSnackBarComponentShowcaseComponent implements OnInit {
  constructor(private snackBarService: MultiSnackbarService) {}

  ngOnInit() {}

  snackBarButtonClick() {
    this.snackBarService.show({
      title: 'Message Sent',
      description: `The <strong>Inland Authority of Singapore (IRAS)</strong> is the main tax administrator to the Government.
      thisisaverylongemailandwearehopingthiswrapsuptonewline@iras.gov.sg
      `,
      actionText: 'View Message',
      type: 'snack-bar-default',
    });
  }
  onParagraphClick() {
    console.log('paragraph clicked');
  }
  snackBarButtonClick2() {
    this.snackBarService.show({
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit.',
      type: 'snack-bar-default',
    });
  }
  snackBarButtonClick3() {
    this.snackBarService.show({
      title: 'Message Sent',
      description: `IRAS Case No. 130060991018 <br><span id="revenueText">Revenue</p><br> We will send you an SMS and email notification to your mobile number and email address within 5 working days at:
      <ul style="padding-left: 20px">
      <li><b>91234567</b></li>
      <li><b>asuperlongemailtryingtoreachthemaxcharactersof150@howlongcanadomainbe.com</b></li>
      </ul>`,
      actionText: 'View Message',
      type: 'snack-bar-default',
    });
  }
}
