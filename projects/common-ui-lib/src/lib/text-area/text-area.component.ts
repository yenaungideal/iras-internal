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

@Component({
  selector: 'iras-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextAreaComponent), multi: true }],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TextAreaComponent implements ControlValueAccessor {
  @ViewChild('textAreaElement') textareaElement: ElementRef;
  @Input() set value(val: string) {
    if (this._value !== val) {
      if (this.regexPattern) {
        const validInput = isInputValid({ input: val, pattern: this.regexPattern });
        if (!validInput) {
          val = this._value;
          if (this.textareaElement?.nativeElement) {
            this.textareaElement.nativeElement.value = val;
          }
          this.cdr.detectChanges();
        }
      }

      this._value = val;
      if (val === null) {
        return;
      }
      this.onChange(val);
    }
  }

  get value() {
    return this._value;
  }
  @Input() label: string;
  @Input() placeholder = '';
  @Input() tooltipText: string;
  @Input() maxLength: number;
  @Input() type = 'text';
  @Input() rows: string;
  @Input() cols: string;
  @Input() text: string;
  @Input() showRequiredSymbol: boolean;
  @Input() disabled: boolean;
  @Input() hasError: false;
  @Input() showWordCount = true;
  @Input() regexPattern: string;
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

  onFocusIn(event: any) {
    event.target.select();
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
