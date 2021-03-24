import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { printFormValueAndValidity } from '../../utils/print-form-value-and-validity';
import { IrasDateInputValidator } from '../../../../../common-ui-lib/src/lib/datepickers/custom-date.validator';

@Component({
  selector: 'app-datetimepickers-showcase',
  templateUrl: './datetimepickers-showcase.component.html',
  styleUrls: ['./datetimepickers-showcase.component.scss'],
})
export class DatetimepickersShowcaseComponent implements OnInit {
  inputDisableTracker = {};
  dateForm: FormGroup;
  fromInputConfig = {
    travelStartDate: {
      toolTipText: '<b>Note: </b> Enter a date that you think you want to travel on. <i>;)</i>',
      isRequired: true,
      inputLabel: 'Travel Start Date',
    },
    travelEndDate: {
      toolTipText: '<b>Note: </b> Enter end date of your travel. <i>;)</i>',
      isRequired: true,
      inputLabel: 'Travel End Date',
    },
    cardExpiryDate: {
      toolTipText: '<b>Note: </b> Your card expiry date. <i>;)</i>',
      isRequired: true,
      inputLabel: 'Card expiry date',
    },
    yearOfGraduation: {
      toolTipText: '<b>Note: </b> Just roughly point when you graduated. ',
      isRequired: true,
      inputLabel: 'What year did you graduate? (any year can be selected)',
    },
    yearOfBirth: {
      toolTipText: '<b>Note: </b> enter your year of birth',
      isRequired: true,
      inputLabel: 'Year of birth (max year min year example)',
    },
    intendedTaxFillDate: {
      toolTipText: '<b>Note: </b> Enter the date that you think will fix tax.)</i>',
      isRequired: true,
      inputLabel: 'Intended tax fill date (an example of Max And Min Date',
    },
    monthPick: {
      toolTipText: '<b>Note: </b> Just pick the month that you love the most.',
      isRequired: true,
      inputLabel: 'Month picker',
    },
    dateRangePicker: {
      toolTipText: '<b>Note: </b> Select the range of dates with start and end.',
      isRequired: true,
      inputLabel: 'Date range picker',
    },
  };

  // Note that in javascript month starts with index 0. so 11 is december.
  minTaxFillDate: Date = new Date(); // means 1 January 2020
  maxTaxFillDate: Date = this.getDateAfter({ numberOfDays: 60 });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dateForm = this.formBuilder.group({
      travelStartDate: [
        formatDate(this.getDateAfter({ numberOfDays: 6 }), 'yyyy-MM-dd', 'en-sg'),
        [Validators.required, IrasDateInputValidator.dateMustBeValid],
      ],
      cardExpiry: ['', [Validators.required]],
      yearOfGraduation: ['', [Validators.required]],
      yearOfBirth: ['', [Validators.required]],
      intendedTaxFillDate: ['', [Validators.required]],
      monthPick: ['', [Validators.required]],
      dateRangePicker: ['', [Validators.required, IrasDateInputValidator.startAndEndDateMustBeValid]],
    });
    this.dateForm.valueChanges.subscribe((_) => {
      printFormValueAndValidity(this.dateForm);
    });
  }

  getDateAfter({ numberOfDays }: { numberOfDays: number }) {
    const date = new Date();
    return new Date(date.setDate(date.getDate() + numberOfDays));
  }

  // Date picker v1
  onItemChange($event: any) {
    console.log($event);
  }

  selectedDateRangeChange($event: any) {
    if ($event.travelStartDate != null) {
      console.log('start date: ' + $event.travelStartDate);
    }
    if ($event.endDate != null) {
      console.log('end date: ' + $event.endDate);
    }
  }

  onDateChange(date: string) {
    console.log({ date });
  }

  get travelStartDate(): any {
    return this.dateForm.controls.travelStartDate;
  }

  get cardExpiry(): any {
    return this.dateForm.controls.cardExpiry;
  }

  get yearOfBirth(): any {
    return this.dateForm.controls.yearOfBirth;
  }
  get intendedTaxFillDate(): any {
    return this.dateForm.controls.intendedTaxFillDate;
  }
  get monthPick(): any {
    return this.dateForm.controls.monthPick;
  }
  get dateRangePicker(): any {
    return this.dateForm.controls.dateRangePicker;
  }

  get yearOfGraduation(): any {
    return this.dateForm.controls.yearOfGraduation;
  }

  resetDate({ control }: { control: any }) {
    control.reset();
  }

  patchValue({ control, type }: { control: any; type: string }) {
    const dateToPatch = this.getDateAfter({ numberOfDays: 6 });
    switch (type) {
      case 'fullDate': {
        control.patchValue(formatDate(dateToPatch, 'yyyy-MM-dd', 'en'));
        break;
      }
      case 'year': {
        control.patchValue(formatDate(dateToPatch, 'yyyy', 'en'));
        break;
      }
      case 'month': {
        control.patchValue(formatDate(dateToPatch, 'MM', 'en'));
        break;
      }
      case 'monthYear': {
        control.patchValue(formatDate(dateToPatch, 'yyyy-MM', 'en'));
        break;
      }
      case 'dateRange': {
        control.patchValue({
          startDate: formatDate(dateToPatch, 'yyyy-MM-dd', 'en'),
          endDate: formatDate(this.getDateAfter({ numberOfDays: 10 }), 'yyyy-MM-dd', 'en'),
        });
        break;
      }
      default: {
        console.log('Oh no. We doomed.');
      }
    }
  }

  toggleDisableAttr({ controlName }: { controlName: string }) {
    if (!(controlName in this.inputDisableTracker)) {
      this.inputDisableTracker[controlName] = true;
    }

    this.inputDisableTracker[controlName] = !this.inputDisableTracker[controlName];
    if (this.inputDisableTracker[controlName]) {
      this.dateForm.controls[controlName].enable();
    } else {
      this.dateForm.controls[controlName].disable();
    }
  }
}
