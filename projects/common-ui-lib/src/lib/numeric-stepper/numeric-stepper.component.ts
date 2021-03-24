import {
  Component,
  Input,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectorRef,
  ElementRef,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { modifyValueOnPaste } from '../../helpers/modify-value-on-paste.util';
import { isInputValid } from '../../common';

@Component({
  selector: 'iras-numeric-stepper',
  templateUrl: './numeric-stepper.component.html',
  styleUrls: ['./numeric-stepper.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NumericStepperComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => NumericStepperComponent), multi: true },
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class NumericStepperComponent implements ControlValueAccessor, Validator {
  currentValue = 0;
  @Input() label: string;
  @Input() placeholder = '';
  @Input() tooltipText: string;
  @Input() showRequiredSymbol: boolean;
  @Input() disabled: boolean;
  @Input() hasError: false;
  @Input() updateOn = 'change';
  @Input() minTooltipPanelWidth: string;
  @Input() maxTooltipPanelWidth: string;
  @Input() maxValue = '999';
  @Input() type = 'text';
  @ViewChild('inputElement') inputElement: ElementRef;

  private inputNumericStepperRegex = '^[0-9]*$';
  private maxLength: number;
  private _value: string;
  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(private cdr: ChangeDetectorRef) {
    this.maxLength = this.maxValue.length;
  }

  @Input() set value(val: string) {
    const validInput = isInputValid({ input: val, pattern: this.inputNumericStepperRegex });
    if (!validInput) {
      val = this._value;
      this.inputElement.nativeElement.value = val;
      this.cdr.detectChanges();
    }
    this._value = val;
    if (val === null) {
      return;
    }
    this.notifyChange(val);
  }

  get value() {
    return this._value;
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  setDisabledState?(disabled?: boolean) {
    this.disabled = disabled;
  }

  notifyChange(val: any) {
    this.onChange(val);
  }

  onFocusIn(event: any) {
    event.target.select();
  }

  onFocusOut() {
    this.onTouch();
  }

  onPaste(event: ClipboardEvent) {
    const pastedText = event.clipboardData.getData('text') || '';
    setTimeout(() => {
      const valueAfterPaste = this.value;
      let formattedValue = modifyValueOnPaste({ valueAfterPaste, pastedText });
      if (this.maxLength) {
        formattedValue = (formattedValue || '').substring(0, this.maxLength);
      }
      this.value = formattedValue;
    }, 50);
  }

  stepCountReload(count) {
    if (!this.disabled) {
      const value = this.value === '' ? 0 : parseInt(this.value);
      if (value === 0 && count < 0) {
        return;
      }
      this.currentValue = value + count;
      this.writeValue(this.currentValue.toString());
      this.onTouch();
    }
  }

  isStepValueValid(value): boolean {
    if (parseInt(value) <= parseInt(this.maxValue)) {
      return true;
    }
    return false;
  }

  validate(controls: AbstractControl | any): ValidationErrors | null {
    if (!this.isStepValueValid(parseInt(this._value))) {
      return { valid: false, message: 'Invalid input value' };
    }
    return null;
  }
}
