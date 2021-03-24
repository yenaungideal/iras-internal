import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxOption } from './checkbox-options.type';

@Component({
  selector: 'iras-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxComponent), multi: true }],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  @Input() cssClass: string[] = [];
  @Input() options: CheckboxOption[];
  @Input() layout: 'horizontal' | 'vertical' = 'vertical';
  @Input() hasError = false;

  @Output() stateChanged: EventEmitter<CheckboxOption[]> = new EventEmitter();

  _value: CheckboxOption[];

  constructor() {}

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(val: CheckboxOption[]) {
    this._value = val;
    if (val === null) {
      this._value = null;
      return;
    }
    this.onChange(this._value);
    this.onTouch(this._value);
  }
  ngOnInit(): void {}

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  selectionChange(): void {
    this.writeValue(this.options);
    this.stateChanged.emit(this.options);
  }
}
