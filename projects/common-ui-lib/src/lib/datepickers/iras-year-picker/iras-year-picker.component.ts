import { formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subject } from 'rxjs';
import { MaskInputEnum } from '../../masked-input/mask.enum';
import { DATE_PICKER_FORMATS, PickDateAdapter } from '../datepicker-format.service';

@Component({
  selector: 'iras-year-picker',
  templateUrl: './iras-year-picker.component.html',
  styleUrls: ['./iras-year-picker.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: IrasYearPickerComponent, multi: true },
    {
      provide: DateAdapter,
      useClass: PickDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: DATE_PICKER_FORMATS,
    },
  ],
})
export class IrasYearPickerComponent implements OnInit {
  @Input() hasError = false;
  @Input() disabled = false;
  @Input() selectedYear: string;
  @Input() required = false;
  @Output() dateChanged = new EventEmitter();
  @Input() placeholder = 'yyyy';
  @Input() maxYear: string;
  @Input() minYear: string;

  maskedInputValue: string;
  dateMask = `${MaskInputEnum.number}${MaskInputEnum.number}${MaskInputEnum.number}${MaskInputEnum.number}`;
  maxDate: Date;
  minDate: Date;
  selectedDate: Date;
  readonly startView = 'multi-year';
  initialHighlightAt = new Date();
  datePickerClosed$: Subject<void> = new Subject();
  monthViewActive: boolean;
  @ViewChild('datePicker') datePicker: MatDatepicker<any>;
  @ViewChild('datePickerContainerElementRef') datePickerContainerElementRef: ElementRef;
  @Input() set value(val: Date) {
    if (val !== undefined && this.selectedDate !== val) {
      let maskedInputValue = null;
      if (val) {
        maskedInputValue = this.getFormattedDate({ date: val, formatType: 'display' });
      }
      this.maskedInputValue = maskedInputValue;
    }
  }
  get value(): Date {
    return this.selectedDate;
  }

  constructor() {}

  ngOnInit() {
    if (this.maxYear) {
      this.maxDate = new Date(`${this.maxYear}-Jan`);
    }

    if (this.minYear) {
      this.minDate = new Date(`${this.minYear}-Jan`);
    }

    if (this.selectedYear) {
      this.selectedDate = new Date(`${this.selectedYear}-Jan`);
    }
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: string): void {
    if (value) {
      this.value = new Date(`${value}-Jan`) as any;
    } else {
      this.value = value as any;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.dateChanged.emit(event ? this.getFormattedDate({ date: event, formatType: 'output' }) : event);
  }

  open() {
    if (this.disabled) {
      return;
    }
    this.datePicker.startAt = new Date('en-SG');
    this.datePicker.open();
    this.onTouch();
  }

  onDatePickerOpen() {
    console.log('year picker opened');
  }
  onDatePickerClose() {
    this.datePickerClosed$.next();
    this.datePickerClosed$.complete();
  }
  getFormattedDate({ date }: { date: any; formatType: 'output' | 'display' }) {
    if (!date) {
      return;
    }
    return formatDate(date, `${DATE_PICKER_FORMATS.itemFormats.year}`, 'en');
  }

  onBackspacePressed(event: any) {
    if (!this.maskedInputValue) {
      this.onMaskedInputValueChange();
    }
  }

  onMaskedInputValueChange() {
    this.notifyAboutValueChange();
  }

  onYearSelected(year: any) {
    this.value = year;
    this.datePicker.close();
  }

  notifyAboutValueChange() {
    let outputValue = this.maskedInputValue;
    const splits = this.maskedInputValue?.replace(/ /g, '').split('/');
    try {
      if (!outputValue) {
        throw new Error('date is empty');
      }

      if (splits.length < 1) {
        throw new Error('could not split masked value');
      }
      const year = splits[0].length === DATE_PICKER_FORMATS.itemFormats.year.length && splits[0];
      if (!year) {
        throw new Error('year does not match format.');
      }

      const str = `${year}-${new Date().getMonth()}`;
      outputValue = this.getFormattedDate({ date: str, formatType: 'output' });
      this.selectedDate = new Date(str);
    } catch (error) {
      outputValue = splits?.join('') || '';
    }
    if (this.maskedInputValue !== null) {
      this.onChange(outputValue);
      this.dateChanged.emit(outputValue);
    }
  }

  onYearPickerKeyDown(event: any) {
    if (event?.code === 'Space') {
      event.preventDefault();
    }
  }
}
