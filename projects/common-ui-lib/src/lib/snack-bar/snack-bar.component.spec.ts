import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBar, MAT_SNACK_BAR_DATA, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackbarComponent } from './snack-bar.component';
import { IrasSnackbarModule } from './snack-bar.module';

describe('SnackBarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IrasSnackbarModule, BrowserAnimationsModule],
        providers: [
          { provide: ComponentFixtureAutoDetect, useValue: true },
          MatSnackBar,
          Overlay,
          {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
              horizontalPosition: 'end',
              verticalPosition: 'top',
            },
          },
          {
            provide: MAT_SNACK_BAR_DATA,
            useValue: {
              title: 'Message Sent',
              description:
                'The <strong>Inland Revenue Authority of Singapore (IRAS)</strong> is the main tax administrator to the Government.<ul>Things it does: <li>Collects tax</li><li>Helps negotiate treaty</li><li>many more...</li></ul>',
              actionText: 'View Message',
              type: 'snack-bar-default',
            },
          },
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(SnackbarComponent);
          component = fixture.componentInstance;
        });
    })
  );

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have snack-bar-default class', () => {
    const classList = fixture.debugElement.query(By.css('.snack-bar-container')).nativeElement.classList;
    expect(classList).toContain('snack-bar-default');
  });

  it('should have snack-bar-icon', () => {
    const containerElement = fixture.debugElement.query(By.css('.snack-bar-container')).nativeElement;
    const iconElement = containerElement.querySelector('.snack-bar-icon');
    expect(iconElement).toBeTruthy();
  });
  it('should have snack-bar-action-text', () => {
    const containerElement = fixture.debugElement.query(By.css('.snack-bar-container')).nativeElement;
    const snackbarActionTextElement = containerElement.querySelector('.snack-bar-action-text');
    expect(snackbarActionTextElement.textContent).toEqual('View Message');
  });

  it('snack-bar header should have Message Sent text', () => {
    const containerElement = fixture.debugElement.query(By.css('.snack-bar-container')).nativeElement;
    const headerElement = containerElement.querySelector('.snack-bar-header');
    expect(headerElement.textContent).toEqual('Message Sent');
  });

  it('should have snack-bar-description', () => {
    const containerElement = fixture.debugElement.query(By.css('.snack-bar-container')).nativeElement;
    const descriptionElement = containerElement.querySelector('.snack-bar-description');
    expect(descriptionElement.textContent).toEqual(
      'The Inland Revenue Authority of Singapore (IRAS) is the main tax administrator to the Government.Things it does: Collects taxHelps negotiate treatymany more...'
    );
  });

  it('snackBar.dismiss should have been called', () => {
    const snackbarDismissSpy = spyOn(component.snackBar, 'dismiss').and.callThrough();
    component.closeSnackBar();
    expect(snackbarDismissSpy).toHaveBeenCalled();
  });

  it('snackBar.actionClick should have been called', () => {
    let actionClicked = false;
    component.actionClick$.subscribe((val) => (actionClicked = !!val));
    component.actionClick(new Event('click'));
    expect(actionClicked).toBeTrue();
  });

  it('snackBar.trustedDescriptionHTML should be truthy', () => {
    expect(component.trustedDescriptionHTML).toBeTruthy();
  });
});
