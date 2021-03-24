import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

export const DATE_PICKER_FORMATS = {
  parse: { dateInput: 'yyyy-MM-dd' },
  display: {
    dateInput: 'dd-MM-yyyy',
    monthYearLabel: 'yyyy',
    dateA11yLabel: 'dd',
    monthYearA11yLabel: 'MMM',
  },
  itemFormats: {
    monthInWordsShort: 'MMM',
    monthNumeric: 'MM',
    date: 'dd',
    year: 'yyyy',
  },
};

@Injectable({ providedIn: 'root' })
export class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: string): string {
    return formatDate(date, displayFormat, this.locale);
  }
}
