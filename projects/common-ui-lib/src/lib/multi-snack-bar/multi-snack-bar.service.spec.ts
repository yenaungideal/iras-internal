import { async, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSnackbarService } from './multi-snack-bar.service';

describe('MultiSnackbar service', () => {
  let service: MultiSnackbarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatSnackBarModule],
    });
    service = TestBed.inject(MultiSnackbarService);
  }));

  it('should use snackbar service', () => {
    expect(service).toBeTruthy();
  });

  it('should open snackbar', () => {
    service.show({
      title: 'Message Sent',
      description:
        'The <strong>Inland Revenue Authority of Singapore (IRAS)</strong> is the main tax administrator to the Government.<ul>Things it does: <li>Collects tax</li><li>Helps negotiate treaty</li><li>many more...</li></ul>',
      actionText: 'View Message',
      type: 'snack-bar-default',
    });

    service.show({
      title: 'Message Sent',
      description:
        'The <strong>Inland Revenue Authority of Singapore (IRAS)</strong> is the main tax administrator to the Government.<ul>Things it does: <li>Collects tax</li><li>Helps negotiate treaty</li><li>many more...</li></ul>',
      actionText: 'View Message',
      type: 'snack-bar-default',
      uniqueId: (+new Date()).toString(),
    });

    service.show({
      title: 'Message Sent',
      description:
        'The <strong>Inland Revenue Authority of Singapore (IRAS)</strong> is the main tax administrator to the Government.<ul>Things it does: <li>Collects tax</li><li>Helps negotiate treaty</li><li>many more...</li></ul>',
      actionText: 'View Message',
      type: 'snack-bar-default',
      uniqueId: (+new Date()).toString(),
    });

    service.show({
      title: 'Message Sent',
      description:
        'The <strong>Inland Revenue Authority of Singapore (IRAS)</strong> is the main tax administrator to the Government.<ul>Things it does: <li>Collects tax</li><li>Helps negotiate treaty</li><li>many more...</li></ul>',
      actionText: 'View Message',
      type: 'snack-bar-default',
      uniqueId: (+new Date()).toString(),
    });

    const snackBarContainer = document.querySelector('.snack-bar-container.snack-bar-default');
    expect(snackBarContainer).toBeTruthy();
  });

  it('should open snackbar', fakeAsync(() => {
    service.show({
      title: 'Message Sent',
      description:
        'The <strong>Inland Revenue Authority of Singapore (IRAS)</strong> is the main tax administrator to the Government.<ul>Things it does: <li>Collects tax</li><li>Helps negotiate treaty</li><li>many more...</li></ul>',
      actionText: 'View Message',
      type: 'snack-bar-default',
    });

    service.close();
    tick();
    flush();
  }));

  it('should open snackbar', fakeAsync(() => {
    service.show({
      title: 'Message Sent',
      description:
        'The <strong>Inland Revenue Authority of Singapore (IRAS)</strong> is the main tax administrator to the Government.<ul>Things it does: <li>Collects tax</li><li>Helps negotiate treaty</li><li>many more...</li></ul>',
      actionText: 'View Message',
      type: 'snack-bar-default',
    });

    tick(10050);
    // test for when no snackbar
    service.close();
    tick();
    service.close();
  }));
});
