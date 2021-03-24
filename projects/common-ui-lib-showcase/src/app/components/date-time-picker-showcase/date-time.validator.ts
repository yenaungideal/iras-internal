import { AbstractControl, ValidationErrors } from '@angular/forms';
import {
  dateTimeValidationRegex,
  timeValidationRegex,
} from '../../../../../common-ui-lib/src/lib/time-picker/time-picker-regex';
export class DateTimeValidator {
  static dateTimeFormatMustBeValid(control: AbstractControl): ValidationErrors | null {
    const dateTimeControlValue = control.value || {};
    const date = dateTimeControlValue.date || '';
    const time = dateTimeControlValue.time || {};
    const hour = time.hour || '';
    const minutes = time.minutes || '';

    const dateTimeStringRepresentation = `${date} ${hour}:${minutes}`;
    if (!dateTimeStringRepresentation.match(new RegExp(dateTimeValidationRegex))) {
      return {
        dateTimeFormatMustBeValid: true,
      };
    }
    return null;
  }
}

export class TimeValidator {
  static timeMustBeValid(control: AbstractControl): ValidationErrors | null {
    const time = control.value || {};
    const hour = time.hour || '';
    const minutes = time.minutes || '';

    const timeStr = `${hour}:${minutes}`;
    if (!timeStr.match(new RegExp(timeValidationRegex))) {
      return {
        timeMustBeValid: true,
      };
    }
    return null;
  }
}
