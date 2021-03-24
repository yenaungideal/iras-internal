import { formatDate } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { DATE_PICKER_FORMATS } from './datepicker-format.service';

function validateDateInput(dateInput: string) {
  if (!dateInput) return null;
  const splits = dateInput?.replace(/ /g, '').split('-').reverse();
  if (splits.length < 3) {
    throw new Error('could not split masked value');
  }
  const dayNumber: number = splits[0].length === DATE_PICKER_FORMATS.itemFormats.date.length && +splits[0];
  const month: number = splits[1].length === DATE_PICKER_FORMATS.itemFormats.monthNumeric.length && +splits[1];
  const year: number = splits[2].length === DATE_PICKER_FORMATS.itemFormats.year.length && +splits[2];
  if (!(dayNumber && month && year)) {
    throw new Error('year does not match format.');
  }

  const parsedDate = new Date(year, month - 1, dayNumber);

  const displayValue = formatDate(
    parsedDate,
    `${DATE_PICKER_FORMATS.itemFormats.year}-${DATE_PICKER_FORMATS.itemFormats.monthNumeric}-${DATE_PICKER_FORMATS.itemFormats.date}`,
    'en'
  );
  if (dateInput !== displayValue) {
    throw new Error('date range out of bounds');
  }
}
export class IrasDateInputValidator {
  static startAndEndDateMustBeValid(control: AbstractControl): ValidationErrors | null {
    const controlValue = control.value as { startDate: string; endDate: string };
    if (!(controlValue && controlValue.startDate && controlValue.endDate)) {
      return { startAndEndDateMustBeValid: true };
    }

    const { startDate, endDate } = controlValue;

    try {
      for (const d of [startDate, endDate]) {
        validateDateInput(d);
      }
    } catch (error) {
      return { startAndEndDateMustBeValid: true };
    }

    return null;
  }

  static dateMustBeValid(control: AbstractControl): ValidationErrors | null {
    try {
      validateDateInput(control.value);
    } catch (error) {
      return {
        dateMustBeValid: true,
      };
    }
    return null;
  }
}
