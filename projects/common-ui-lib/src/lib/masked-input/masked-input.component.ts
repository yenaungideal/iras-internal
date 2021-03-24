import { AfterViewInit, Component, forwardRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MaskedTextBoxComponent } from '@progress/kendo-angular-inputs';
import { MaskInputEnum } from './mask.enum';
@Component({
  selector: 'iras-masked-input',
  templateUrl: './masked-input.component.html',
  styleUrls: ['./masked-input.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MaskedInputComponent), multi: true }],
})
export class MaskedInputComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input() cssClass: string;
  @Input() disabled: boolean;
  @Input() mask: string;
  @Input() maskPlaceholder: string;
  @Input() includeLiterals = true;
  @Input() hasError: false;
  @Input() placeholder: string;
  @ViewChild('kendoMaskedTextBox', { static: true, read: MaskedTextBoxComponent }) el: any;

  @Input() set value(val: string) {
    if (val !== undefined && this._value !== val) {
      this._value = val;
      if (val === null) {
        return;
      }
      this.onChange(val);
    }
  }
  maskedInput: any;

  get value() {
    return this._value;
  }

  private _value: string;

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  ngOnInit(): void {}

  getContainerClassList() {
    return `iras-masked-input ${this.cssClass || ''} ${this.disabled ? 'iras-masked-input--disabled' : ''} `;
  }

  ngAfterViewInit(): void {
    const elements = this.el.hostElement.nativeElement.getElementsByClassName('k-textbox');
    if (this.placeholder) {
      for (const item of elements) {
        item.setAttribute('placeholder', this.placeholder);
      }
    }
  }

  onFocusIn() {
    this.maskedInput = this.el.hostElement.nativeElement.querySelector('input');
    this.maskedInput.select();
  }
}
