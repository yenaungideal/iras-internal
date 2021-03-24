import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isInputValid } from '../../common';
import { modifyValueOnPaste } from '../../helpers/modify-value-on-paste.util';
import { regexInputPattern } from './input.util';

@Component({
  selector: 'iras-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class InputComponent implements ControlValueAccessor {
  @Input() set value(val: string) {
    if (val) {
      if (this.type === 'tel') {
        this.pattern = regexInputPattern.telPattern as any;
      }
      const validInput = isInputValid({ input: val, pattern: this.pattern || '' });
      if (!validInput) {
        val = this._value;
        this.inputElement.nativeElement.value = val;
        this.cdr.detectChanges();
      }
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
  @Input() label: string;
  @Input() placeholder = '';
  @Input() tooltipText: string;
  @Input() maxLength: number;
  @Input() minLength: number;
  @Input() type = 'text';
  @Input() showRequiredSymbol: boolean;
  @Input() disabled: boolean;
  @Input() hasError: false;
  @Input() pattern: string;
  @Input() updateOn = 'change';
  @Input() clearable = false;
  @Input() clearablePosition: 'start' | 'end' = 'end';
  @Input() minTooltipPanelWidth: string;
  @Input() maxTooltipPanelWidth: string;
  @ViewChild('inputElement') inputElement: ElementRef;

  private _value = '';
  constructor(private cdr: ChangeDetectorRef) {}
  onChange: any = () => {};
  onTouch: any = () => {};

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

  onClear() {
    if (this.disabled) {
      return;
    }
    this.value = '';
    this.inputElement.nativeElement.focus();
  }

  onPaste(event: ClipboardEvent) {
    const pastedText = event.clipboardData.getData('text') || '';
    setTimeout(() => {
      const valueAfterPaste = this.value;
      if (!valueAfterPaste) {
        return;
      }
      let formattedValue = modifyValueOnPaste({ valueAfterPaste, pastedText });
      if (this.maxLength) {
        formattedValue = (formattedValue || '').substring(0, this.maxLength);
      }
      this.value = formattedValue;
    }, 50);
  }
}
