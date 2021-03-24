import { Component, OnInit, OnDestroy } from '@angular/core';
import { SnackbarService } from '../../../../../common-ui-lib/src/lib/snack-bar/snack-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-snack-bar-showcase',
  templateUrl: 'snack-bar-showcase.component.html',
  styleUrls: ['./snack-bar-showcase.component.scss'],
})
export class SnackBarComponentShowcaseComponent implements OnInit, OnDestroy {
  private snackBarActionSubscription: Subscription;

  constructor(private snackBarService: SnackbarService) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    if (this.snackBarActionSubscription) {
      this.snackBarActionSubscription.unsubscribe();
    }
  }

  snackBarButtonClick() {
    this.snackBarService.openSnackBar({
      data: {
        title: 'Message Sent',
        description: `The <strong>Inland Revenue Authority of Singapore (IRAS)</strong> is the main tax administrator to the Government.<ul>Things it does: <li>Collects tax</li><li>Helps negotiate treaty</li><li>many more...</li></ul>
          send email at thisisaverylongemailandwearehopingthiswrapsuptonewline@iras.gov.sg
          `,
        actionText: 'View Message',
        type: 'snack-bar-default',
      },
      duration: 10000, // set 0 for disable dismiss
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });

    // Snack bar action link click
    this.snackBarActionSubscription = this.snackBarService.matSnackBarRef.instance.actionClick$.subscribe((data) => {
      if (data) {
        console.log('action link clicked.');
      }
    });
  }

  snackBarButtonClick2() {
    this.snackBarService.openSnackBar({
      data: {
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit.',
        type: 'snack-bar-default',
      },
      duration: 5000, // set 0 for disable dismiss
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  snackBarButtonClick3() {
    this.snackBarService.openSnackBar({
      data: {
        title: 'Message Sent',
        description: `IRAS Case No. 130060991018 <br><br> We will send you an SMS and email notification to your mobile number and email address within 5 working days at:
        <ul style="padding-left:20px">
        <li><b>91234567</b></li>
        <li><b>asuperlongemailtryingtoreachthemaxcharactersof150@howlongcanadomainbe.com</b></li>
        </ul>`,
        actionText: 'View Message',
        type: 'snack-bar-default',
      },
      duration: 0, // set 0 for disable dismiss
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });

    // Snack bar action link click
    this.snackBarActionSubscription = this.snackBarService.matSnackBarRef.instance.actionClick$.subscribe((data) => {
      if (data) { console.log('action link clicked.'); }
    });
  }

}
