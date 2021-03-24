import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IrasDateRangePickerComponent } from './iras-date-range-picker.component';
import { IrasDateRangePickerModule } from './iras-date-range-picker.module';

describe('DateRangePickerComponent', () => {
  let component: IrasDateRangePickerComponent;
  let fixture: ComponentFixture<IrasDateRangePickerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [IrasDateRangePickerComponent],
        imports: [IrasDateRangePickerModule, FormsModule, ReactiveFormsModule],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(IrasDateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should startDate and endDate in dateRangeForm equal to the given selectedRange input dates', () => {
    component.selectedRange = {
      startDate: '2020-01-14',
      endDate: '2020-02-14',
    };
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.dateRangeForm.controls.startDate.value).toEqual('2020-01-14');
    expect(component.dateRangeForm.controls.endDate.value).toEqual('2020-02-14');
  });

  it('should startDate and endDate of dateRangeForm equal to the given input dates', () => {
    component.writeValue({
      startDate: '2020-01-14',
      endDate: '2020-02-14',
    });
    fixture.detectChanges();
    expect(component.dateRangeForm.controls.startDate.value).toEqual('2020-01-14');
    expect(component.dateRangeForm.controls.endDate.value).toEqual('2020-02-14');
  });

  it('should dateRangeForm reset() when the given input is null', () => {
    spyOn(component.dateRangeForm, 'reset').and.callThrough();
    component.writeValue(null);
    fixture.detectChanges();
    expect(component.dateRangeForm.reset).toHaveBeenCalled();
  });

  it('should startDate and endDate form controls set to disable if the date range picker is disabled', () => {
    spyOn(component.dateRangeForm.controls.startDate, 'disable').and.callThrough();
    spyOn(component.dateRangeForm.controls.endDate, 'disable').and.callThrough();
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(component.dateRangeForm.controls.startDate.disable).toHaveBeenCalled();
    expect(component.dateRangeForm.controls.endDate.disable).toHaveBeenCalled();
  });

  it('should startDate and endDate form controls set to enable if the date range picker is not disabled', () => {
    spyOn(component.dateRangeForm.controls.startDate, 'enable').and.callThrough();
    spyOn(component.dateRangeForm.controls.endDate, 'enable').and.callThrough();
    component.setDisabledState(false);
    fixture.detectChanges();
    expect(component.dateRangeForm.controls.startDate.enable).toHaveBeenCalled();
    expect(component.dateRangeForm.controls.endDate.enable).toHaveBeenCalled();
  });

  it('should onRangeChange EventEmitter emitted a value if notifyAboutValueChange is called', () => {
    spyOn(component.onRangeChange, 'emit').and.callThrough();
    const dateRange = {
      startDate: '2020-01-14',
      endDate: '2020-02-14',
    };
    component.notifyAboutValueChange(dateRange);
    fixture.detectChanges();
    expect(component.onRangeChange.emit).toHaveBeenCalledWith(dateRange);
  });

  it('should registerOnChange and registerOnTouched are called if the value changes', () => {
    const onChangeEvent = () => {};
    const registerOnChangeMock = spyOn(component, 'registerOnChange').and.callThrough();
    const registerOnTouchedMock = spyOn(component, 'registerOnTouched').and.callThrough();
    component.registerOnChange(onChangeEvent);
    component.registerOnTouched(onChangeEvent);
    component.selectedRange = {
      startDate: '2020-01-14',
      endDate: '2020-02-14',
    };
    component.ngOnInit();
    fixture.detectChanges();
    expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
    expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
  });
});
