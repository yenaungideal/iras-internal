import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonOption } from './radio-button.type';

@Component({
  selector: 'iras-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioButtonComponent), multi: true }],
})
export class RadioButtonComponent implements ControlValueAccessor {
  @Input() cssClass: string[] = [];
  @Input() options: RadioButtonOption[];
  @Input() radioGroupName: string;
  @Input() layout: 'horizontal' | 'vertical' = 'vertical';
  @Input() hasError = false;

  value: RadioButtonOption;

  constructor() {}

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any) {
    if (value === null) {
      return;
    }
    this.onValueChange(value);
  }

  onValueChange(value: RadioButtonOption) {
    const data = this.options.find((o) => o.selected);
    if (data) {
      data.selected = false;
    }
    if (value) {
      const itemToSelect = this.options.find((o) => o.label === value.label);
      if (itemToSelect) {
        itemToSelect.selected = true;
      }
      this.value = itemToSelect;
    } else {
      this.value = value;
    }

    this.onChange(value);
    this.onTouch(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
