import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IrasTimePickerComponent } from './time-picker.component';
import { IrasTimePickerModule } from './time-picker.module';

describe('IrasDateTimePickerComponent', () => {
  let component: IrasTimePickerComponent;
  let fixture: ComponentFixture<IrasTimePickerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IrasTimePickerModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IrasTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('writeValue should change time-picker value', () => {
    component.interval = '1minute';
    component.writeValue({
      hour: '10',
      minutes: '54',
    });

    fixture.detectChanges();
    expect(component.form.value).toEqual({
      hour: '10',
      minutes: '54',
    });
  });

  it('writeValue throw error when time and date prop is not present', () => {
    expect(() => {
      component.writeValue(null);
    }).toThrow(new Error('Time Picker must contain object with {hour, minutes} prop'));
  });

  it('onChange should equal change fn', () => {
    const changeFn = () => {};
    component.registerOnChange(changeFn);
    expect(component.onChange).toEqual(changeFn);
  });

  it('registerOnTouched should equal touch fn', () => {
    const touchFn = () => {};
    component.registerOnTouched(touchFn);
    expect(component.onTouch).toEqual(touchFn);
  });
  it('setDisabledState(false) should make form enabled', () => {
    component.setDisabledState(false);
    expect(component.form.enabled).toEqual(true);
  });

  it('setDisabledState(true) should make form disabled', () => {
    component.setDisabledState(true);
    expect(component.form.enabled).toEqual(false);
  });

  it('onFocusOut should trigger touch for control', () => {
    spyOn(component, 'onTouch');
    component.onFocusOut();
    expect(component.onTouch).toHaveBeenCalled();
  });

  it('#1min interval should work', () => {
    component.interval = '1minute';
    component.setMinuteList(component.interval);
    fixture.detectChanges();

    expect(component.hourList.length).toEqual(25);
    expect(component.minuteList.length).toEqual(61);
  });

  it('#5min interval should work', () => {
    component.interval = '5minute';
    component.setMinuteList(component.interval);
    fixture.detectChanges();

    expect(component.hourList.length).toEqual(25);
    expect(component.minuteList.length).toEqual(13);
  });
  it('#15min interval should work', () => {
    component.interval = '15minute';
    component.setMinuteList(component.interval);
    fixture.detectChanges();

    expect(component.hourList.length).toEqual(25);
    expect(component.minuteList.length).toEqual(5);
  });

  it('#30min interval should work', () => {
    component.interval = '30minute';
    component.setMinuteList(component.interval);
    fixture.detectChanges();

    expect(component.hourList.length).toEqual(25);
    expect(component.minuteList.length).toEqual(3);
  });

  it('#ngOnChanges should work', () => {
    component.interval = '30minute';
    component.setMinuteList(component.interval);
    fixture.detectChanges();
    component.ngOnChanges({
      interval: {
        currentValue: '5minute',
        previousValue: '30minute',
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    fixture.detectChanges();
    expect(component.hourList.length).toEqual(25);
    expect(component.minuteList.length).toEqual(13);
  });
});
