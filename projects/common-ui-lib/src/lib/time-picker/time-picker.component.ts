import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ITimePickerValue, TTimePickerIntervalTypes } from './time-picker.model';
import {
  timePicker15MinuteIntervalList,
  timePicker1HourIntervalList,
  timePicker1MinuteIntervalList,
  timePicker30MinuteIntervalList,
  timePicker5MinuteIntervalList,
} from './timepicker-dropdown-list';

@Component({
  selector: 'iras-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => IrasTimePickerComponent), multi: true }],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class IrasTimePickerComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() hasError = false;
  @Input() interval: TTimePickerIntervalTypes;

  hourList = timePicker1HourIntervalList;
  minuteList = [];

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  onChange = (val: ITimePickerValue): void => {};
  onTouch = (value: boolean): void => {};
  writeValue(value: ITimePickerValue): void {
    const timeObject = value || ({} as ITimePickerValue);
    const keys = Object.keys(timeObject);

    if (keys.length !== 2 || !('hour' in timeObject && 'minutes' in timeObject)) {
      throw new Error('Time Picker must contain object with {hour, minutes} prop');
    }

    const { hour = 'HH', minutes = 'MM' } = timeObject;
    this.hour.setValue(hour);
    this.minutes.setValue(minutes);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  setMinuteList(interval: TTimePickerIntervalTypes) {
    if (!interval) {
      return;
    }
    switch (interval) {
      case '5minute': {
        this.minuteList = timePicker5MinuteIntervalList;
        break;
      }
      case '15minute': {
        this.minuteList = timePicker15MinuteIntervalList;
        break;
      }
      case '30minute': {
        this.minuteList = timePicker30MinuteIntervalList;
        break;
      }

      default: {
        this.minuteList = timePicker1MinuteIntervalList;
      }
    }
  }

  ngOnInit(): void {
    this.setMinuteList(this.interval);
    this.form = this.formBuilder.group({
      hour: [],
      minutes: [],
    });

    this.form.valueChanges.subscribe((val) => this.onChange(val));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.interval?.previousValue !== changes.interval?.currentValue) {
      this.interval = changes.interval.currentValue;
      this.setMinuteList(this.interval);
    }
  }

  get hour() {
    return this.form.get('hour');
  }

  get minutes() {
    return this.form.get('minutes');
  }

  onFocusOut() {
    this.onTouch(true);
  }
}
