import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateRange } from '../date-range.model';
import { DATE_PICKER_FORMATS, PickDateAdapter } from '../datepicker-format.service';

@Component({
  selector: 'iras-date-range-picker',
  templateUrl: './iras-date-range-picker.component.html',
  styleUrls: ['./iras-date-range-picker.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: IrasDateRangePickerComponent, multi: true },
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
export class IrasDateRangePickerComponent implements OnInit, OnDestroy {
  @Input() startDatePlaceholder = 'dd/mm/yyyy';
  @Input() endDatePlaceholder = 'dd/mm/yyyy';
  @Input() hasErrorInStartDate = false;
  @Input() hasErrorInEndDate = false;
  @Input() disabled = false;
  @Input() selectedRange: { startDate: string; endDate: string };
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() startDateLabel = 'Date';
  @Input() endDateLabel = 'To';
  @Input() required = false;
  @Output() onRangeChange = new EventEmitter<DateRange>();
  dateRangeForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  selectedStartDate: Date;
  selectedEndDate: Date;
  constructor(private formBuilder: FormBuilder) {
    this.dateRangeForm = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
    });
    if (this.required) {
      this.dateRangeForm.controls.startDate.setValidators([Validators.required]);
      this.dateRangeForm.controls.endDate.setValidators([Validators.required]);
      this.dateRangeForm.controls.startDate.updateValueAndValidity();
      this.dateRangeForm.controls.endDate.updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.dateRangeForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.notifyAboutValueChange(val);
    });

    if (this.selectedRange) {
      const { startDate, endDate } = this.selectedRange || {};

      if (startDate) {
        this.selectedStartDate = new Date(startDate);
        this.dateRangeForm.controls.startDate.patchValue(formatDate(this.selectedStartDate, 'yyyy-MM-dd', 'en'));
      }

      if (endDate) {
        this.selectedEndDate = new Date(endDate);
        this.dateRangeForm.controls.endDate.patchValue(formatDate(this.selectedEndDate, 'yyyy-MM-dd', 'en'));
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(val: DateRange): void {
    const { startDate, endDate } = val || {};
    if (val === null) {
      this.dateRangeForm.reset();
      return;
    }

    if (startDate) {
      this.selectedStartDate = new Date(startDate);
      this.dateRangeForm.controls.startDate.patchValue(formatDate(this.selectedStartDate, 'yyyy-MM-dd', 'en'));
    } else {
      this.dateRangeForm.controls.startDate.patchValue(val);
    }

    if (endDate) {
      this.selectedEndDate = new Date(endDate);
      this.dateRangeForm.controls.endDate.patchValue(formatDate(this.selectedEndDate, 'yyyy-MM-dd', 'en'));
    } else {
      this.dateRangeForm.controls.endDate.patchValue(val);
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

    if (this.disabled) {
      this.dateRangeForm.controls.startDate.disable();
      this.dateRangeForm.controls.endDate.disable();
    } else {
      this.dateRangeForm.controls.startDate.enable();
      this.dateRangeForm.controls.endDate.enable();
    }
  }

  notifyAboutValueChange(val: DateRange) {
    const outputValue = val;
    const { startDate, endDate } = val || {};
    if (startDate === null && endDate === null) {
      return;
    }

    this.onChange(outputValue);
    this.onRangeChange.emit(outputValue);
  }

  get startDate(): any {
    return this.dateRangeForm.controls.startDate;
  }

  get endDate(): any {
    return this.dateRangeForm.controls.endDate;
  }
}
