import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { printFormValueAndValidity } from '../../utils/print-form-value-and-validity';
import { DateTimeValidator, TimeValidator } from './date-time.validator';

@Component({
  selector: 'app-iras-date-time-picker-showcase',
  templateUrl: './iras-date-time-picker-showcase.component.html',
  styleUrls: ['./iras-date-time-picker-showcase.component.scss'],
})
export class IrasDateTimePickerShowcaseComponent implements OnInit {
  dateTimePickerConfig = {
    minDate: new Date(),
    maxDate: new Date(2022, 10, 11),
    selectedDate: new Date(),
    timePlaceholder: '10:20PM',
    datePlaceholder: '10/30/2020',
    tooltipContent: `<strong>Tip: </strong> Be gentle with UI please. `,
  };
  dateTimeForm: FormGroup;
  timeOnlyControl = new FormControl({ hour: '23', minutes: '59' }, [
    Validators.required,
    TimeValidator.timeMustBeValid,
  ]);
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dateTimeForm = this.formBuilder.group({
      dateTime: this.formBuilder.group({
        date: ['', [Validators.required]],
        time: [{ hour: '', minutes: '' }, [Validators.required]],
      }),
    });

    this.dateTime.setValidators([Validators.required, DateTimeValidator.dateTimeFormatMustBeValid]);
    this.dateTimeForm.valueChanges.subscribe(() => {
      printFormValueAndValidity(this.dateTimeForm);
    });
  }
  get dateTime() {
    return this.dateTimeForm.get('dateTime');
  }

  get date() {
    return this.dateTimeForm.get('dateTime.date');
  }
  get time() {
    return this.dateTimeForm.get('dateTime.time');
  }
}
