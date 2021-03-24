import { Overlay } from '@angular/cdk/overlay';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarService } from './snack-bar.service';

describe('Snackbar service', () => {
  let service: SnackbarService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule],
        providers: [SnackbarService, MatSnackBar, Overlay],
      });
      service = TestBed.inject(SnackbarService);
    })
  );

  it('should use snackbar service', () => {
    expect(service).toBeTruthy();
  });

  it('should open snackbar', () => {
    service.openSnackBar({
      data: {
        title: 'Message Sent',
        description:
          'The <strong>Inland Revenue Authority of Singapore (IRAS)</strong> is the main tax administrator to the Government.<ul>Things it does: <li>Collects tax</li><li>Helps negotiate treaty</li><li>many more...</li></ul>',
        actionText: 'View Message',
        type: 'snack-bar-default',
      },
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });

    const snackBarContainer = document.querySelector('.snack-bar-container.snack-bar-default');
    expect(snackBarContainer).toBeTruthy();
  });
  it('snackBarService.matSnackBarRef should have reference', () => {
    service.openSnackBar({
      data: {
        title: 'Message Sent',
      },
    });
    expect(service.matSnackBarRef).toBeTruthy();
  });

  it('should have special-snackbar class', () => {
    service.openSnackBar({
      data: {
        title: 'Message Sent',
        type: 'special-snackbar',
      },
    });

    const snackBarContainer = document.querySelector('.snack-bar-container.special-snackbar');
    expect(snackBarContainer).toBeTruthy();
  });
});
