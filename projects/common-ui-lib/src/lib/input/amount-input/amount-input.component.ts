import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  getThousandSeparatedAmount,
  getThousandSeparatedForAmountFilter,
  regexAmountInputPattern,
} from './amount-input.util';

@Component({
  selector: 'iras-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmountInputComponent), multi: true }],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AmountInputComponent implements ControlValueAccessor, OnInit {
  @Input() set value(val: string) {
    if ((this.type === 'amount' || this.type === 'gridAmountFilter') && val) {
      const validInput = this.checkInput({ currentValue: val });
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
  @Input() type: 'amount' | 'gridAmountFilter' = 'amount';
  @Input() showRequiredSymbol: boolean;
  @Input() disabled: boolean;
  @Input() hasError: false;
  @Input() updateOn = 'change';
  @Input() clearable = false;
  @Input() clearablePosition: 'start' | 'end' = 'start';
  @Input() allowNegative = true;
  @Input() minTooltipPanelWidth: string;
  @Input() maxTooltipPanelWidth: string;
  @ViewChild('inputElement') inputElement: ElementRef;

  private _value: string;
  constructor(private cdr: ChangeDetectorRef) {}
  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any) {
    if (this.type === 'amount') {
      this.value = value ? getThousandSeparatedAmount(value.toString()) : '';
    } else {
      this.value = value ? getThousandSeparatedForAmountFilter(value.toString()) : '';
    }
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
  checkInput({ currentValue }: { currentValue: string }) {
    let regexPattern;

    regexPattern = regexAmountInputPattern.amountPattern;
    if (currentValue.includes('-')) {
      return this.allowNegative ? true : false;
    }

    const patternMatched = (currentValue + '').match(regexPattern);
    if (!patternMatched) {
      return false;
    }
    return true;
  }

  notifyChange(val: any) {
    if (this.type === 'amount') {
      // Remove comma before emit to parent component if type amount.
      if (val.split(',').join('') === '') {
        this.onChange('');
      } else {
        this.onChange(+val.split(',').join(''));
      }
    } else {
      // Remove comma before emit to parent component if type gridFilterAmount.
      this.onChange(val.split(',').join(''));
    }
  }

  onFocusIn(event: any) {
    event.target.select();
    setTimeout(() => {
      this.removeCommas();
    }, 1000);
  }

  onFocusOut() {
    this.onTouch();
    if (this.value === '-') {
      if (this.type === 'amount') {
        this.onClear();
      }
    } else {
      this.addCommas();
    }
  }

  onClear() {
    if (this.disabled) {
      return;
    }
    this.value = '';
    this.inputElement.nativeElement.focus();
  }

  addCommas() {
    if (this.value) {
      this.value =
        this.type === 'amount'
          ? getThousandSeparatedAmount(this.value.toString())
          : getThousandSeparatedForAmountFilter(this.value.toString());
    }
  }

  removeCommas() {
    if (this.value) {
      this.value = this.value.split(',').join('');
    }
  }

  ngOnInit(): void {}
}
