import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IrasDatePickerComponent } from './iras-date-picker.component';
import { IrasDatePickerModule } from './iras-date-picker.module';

describe('IrasDatePickerComponent', () => {
  let component: IrasDatePickerComponent;
  let fixture: ComponentFixture<IrasDatePickerComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IrasDatePickerModule, BrowserAnimationsModule],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(IrasDatePickerComponent);
          component = fixture.componentInstance;
          inputElement = fixture.debugElement.nativeElement.shadowRoot.querySelector('.iras-datepicker__masked-input');
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#maskedInputValue should be undefined if write value passes undefined', () => {
    component.value = undefined;
    expect(component.maskedInputValue).toBeUndefined();
  });

  it('#maskedInputValue should be  null', () => {
    component.value = '' as any;
    fixture.detectChanges();
    expect(component.maskedInputValue).toBeNull();
  });

  it('#maskedInputValue should change if correct date provided', () => {
    component.value = '2020-01-14' as any;
    fixture.detectChanges();
    expect(component.maskedInputValue).toBe('14/01/2020');
  });

  it('#maskedInputValue should change when new date is picked', () => {
    component.value = '2020-01-14' as any;
    fixture.detectChanges();
    component.value = new Date('2020-Aug-30');
    fixture.detectChanges();
    const expectedValue = '30/08/2020';
    expect(component.maskedInputValue).toBe(expectedValue);
  });

  // Function test
  it('getFormattedDate() - tests', () => {
    let dateStr: string;
    // display date tests
    dateStr = component.getFormattedDate({ date: '', formatType: 'display' });
    expect(dateStr).toBeFalsy();
    dateStr = component.getFormattedDate({ date: new Date('2020-30-Aug'), formatType: 'display' });
    expect(dateStr).toBe('30/08/2020', 'dint format new Date() correctly');
    dateStr = component.getFormattedDate({ date: '2020-09-01', formatType: 'display' });
    expect(dateStr).toBe('01/09/2020', 'dint format date string correctly');

    dateStr = component.getFormattedDate({ date: '', formatType: 'output' });
    expect(dateStr).toBeFalsy();
    dateStr = component.getFormattedDate({ date: new Date('2020-30-Aug'), formatType: 'output' });
    expect(dateStr).toBe('2020-08-30', 'dint format new Date() correctly');
    dateStr = component.getFormattedDate({ date: '2020-09-01', formatType: 'output' });
    expect(dateStr).toBe('2020-09-01', 'dint format date string correctly');
  });

  it('#datePicker should not open on input click', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    inputElement.click();
    fixture.detectChanges();

    const datePickerPopupRef = document.querySelector<HTMLElement>('.cdk-overlay-pane.mat-datepicker-popup');
    expect(datePickerPopupRef).toBeFalsy('datepicker should not open');
  });

  // functional tests for open
  it('#open() - should open if not disabled', () => {
    component.setDisabledState(false);
    fixture.detectChanges();

    component.open();
    fixture.detectChanges();
    const datePickerPopupRef = document.querySelector<HTMLElement>('.cdk-overlay-pane.mat-datepicker-popup');
    expect(datePickerPopupRef).toBeTruthy('datepicker should open');
  });
  it('#open() - should not open if disabled', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    component.open();
    fixture.detectChanges();
    const datePickerPopupRef = document.querySelector<HTMLElement>('.cdk-overlay-pane.mat-datepicker-popup');
    expect(datePickerPopupRef).toBeFalsy('datepicker should not open');
  });
});
