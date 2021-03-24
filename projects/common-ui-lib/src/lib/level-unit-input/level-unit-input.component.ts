import {
  Component,
  OnInit,
  forwardRef,
  ViewEncapsulation,
  Input,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  SimpleChanges,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'iras-level-unit-input',
  templateUrl: './level-unit-input.component.html',
  styleUrls: ['./level-unit-input.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LevelUnitInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => LevelUnitInputComponent), multi: true },
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LevelUnitInputComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor, Validator {
  @Input() set value(val: { level: string; unit: string }) {
    if (val) {
      this.levelUnitForm.patchValue(val);
    } else {
      this.resetLevelUnitForm();
    }
    this.levelUnitForm.updateValueAndValidity();
  }
  @Input() label: string;
  @Input() tooltipText: string;
  @Input() showRequiredSymbol: boolean;
  @Input() hasError: false;
  @Input() disabled: boolean;
  @Input() clearable = false;
  @Input() clearablePosition: 'start' | 'end' = 'end';
  @Input() fieldName: FormControl | { errors: { required: true } };
  @ViewChild('levelInput') levelInput: ElementRef;
  @ViewChild('unitInput') unitInput: ElementRef;
  levelInputRegex = `((^(?!00)[BbMm|0-9]{1}[\\d]{1}$)|(^(?!00)[BbMm|1-9]{1}[\\d]{1,2}$))`;
  unitInputRegex = `^(?![0-9]{5})(?!000)(((([a-zA-Z0]{1}[0-9]{1})|([1-9]{1}[a-zA-Z0-9]{1}))[a-zA-Z0-9]{0,1})|((([a-zA-Z0]{1}[0-9]{1})|([1-9]{1}[a-zA-Z0-9]{1}))[a-zA-Z0-9]{1})|((([a-zA-Z0]{1}[0-9]{1})|([1-9]{1}[a-zA-Z0-9]{1}))(([0-9]{1}))[a-zA-Z0-9]{1})|((([a-zA-Z0]{1}[0-9]{1})|([1-9]{1}[a-zA-Z0-9]{1}))(([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([0-9]{2}))[a-zA-Z0-9]{1}))$`;
  public levelUnitForm = this.formBuilder.group({
    level: ['', [Validators.pattern(this.levelInputRegex)]],
    unit: ['', [Validators.pattern(this.unitInputRegex)]],
  });
  subscription: Subscription;
  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.resetLevelUnitForm();
    if (this.fieldName?.errors?.required) {
      this.level.setValidators([Validators.required, Validators.pattern(this.levelInputRegex)]);
    }
    this.subscription = this.level.valueChanges.subscribe((level) => {
      if (level !== '') {
        this.unit.enable();
        this.unit.setValidators([Validators.required, Validators.pattern(this.unitInputRegex)]);
      } else {
        this.unit.patchValue('');
        this.unit.disable();
        this.unit.setValidators(null);
      }
      this.levelUnitForm.updateValueAndValidity();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled && changes.disabled.previousValue !== changes.disabled.currentValue) {
      if (changes.disabled.currentValue) {
        this.level.disable();
        this.unit.disable();
      } else {
        this.level.enable();
        if (this.level.value !== '') {
          this.unit.enable();
        } else {
          this.unit.disable();
        }
      }
    }
  }

  resetLevelUnitForm() {
    this.levelUnitForm.setValue({ level: '', unit: '' }, { emitEvent: false });
    if (this.level.value === '') {
      this.unit.disable();
    }
  }

  onTouch: any = () => {};

  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.subscription = this.levelUnitForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    if (!this.levelUnitForm.valid && this.levelUnitForm.status !== 'DISABLED') {
      if (this.level.value === '' && this.levelUnitForm.controls['level'].errors.required) {
        return { required: true };
      }
      return { invalidLevelUnit: { valid: false, message: 'Invalid input for level/unit.' } };
    }
    return null;
  }

  get level(): any {
    return this.levelUnitForm.controls.level;
  }

  get unit(): any {
    return this.levelUnitForm.controls.unit;
  }

  onClear(field: string) {
    if (field === 'level') {
      this.level.patchValue('');
    } else if (field === 'unit') {
      this.unit.patchValue('');
    }
  }

  onFocusIn(event: any) {
    event.target.select();
  }

  onFocusOut() {
    this.onTouch();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
