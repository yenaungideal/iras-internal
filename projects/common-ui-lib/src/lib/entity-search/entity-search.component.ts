import { Component, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { pairwise, startWith } from 'rxjs/operators';
import { DropdownItem } from '../dropdowns/iras-dropdown/dropdown-item.model';
import { entityRegExpMap } from './entity-regexp-map';
import { Subscription } from 'rxjs';
@Component({
  selector: 'iras-entity-search',
  templateUrl: './entity-search.component.html',
  styleUrls: ['./entity-search.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class EntitySearchComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() entityIdFormControlName: string;
  @Input() entityTypeFormControlName: string;
  @Input() entityIdValue: string;
  @Input() entityTypeValue: string;
  @Input() entityTypeList: DropdownItem[];
  @Input() entityIdLabel: string;
  @Input() entityIdPlaceholder = 'ID';
  @Input() entityIdFlex = 80;
  @Input() entityTypeLabel: string;
  @Input() entityTypePlaceholder = 'Type';
  @Input() entityTypeFlex = 20;
  @Input() isRequired: boolean;
  @Input() showValidationError = true;
  @Input() hasError: boolean;
  @Input() disabled: boolean;

  customForm = this.formBuilder.group({
    id: '',
    type: '',
  });

  private entityIdValidators: ValidatorFn[] = [];
  private entityTypeValidators: ValidatorFn[] = [];
  private entityRegExpMap = entityRegExpMap;
  subscription: Subscription;
  constructor(private formBuilder: FormBuilder) {}

  get entityId(): AbstractControl {
    return this.customForm.get('id');
  }

  get entityType(): AbstractControl {
    return this.customForm.get('type');
  }

  ngOnInit(): void {
    if (this.showValidationError) {
      this.entityIdValidators.push(this.entityTypeCheck());
      if (this.isRequired) {
        this.entityIdValidators.push(Validators.required);
        this.entityTypeValidators.push(Validators.required);
      }
    }
    this.entityId.setValidators(this.entityIdValidators);
    this.entityType.setValidators(this.entityTypeValidators);

    this.subscription = this.entityId.valueChanges
      .pipe(startWith(this.entityId), pairwise())
      .subscribe(([previous, current]) => {
        this.autofillEntityType(current);
        if (previous && current && previous !== current) {
          this.form.controls[`${this.entityIdFormControlName}`].patchValue((current || '').toUpperCase());
          this.form.controls[`${this.entityIdFormControlName}`].setErrors(this.customForm.get('id').errors);
          this.entityType.markAsTouched();
          this.entityType.markAsDirty();
          this.entityType.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        }
      });

    this.subscription = this.entityType.valueChanges
      .pipe(startWith(this.entityType), pairwise())
      .subscribe(([previous, current]) => {
        if (previous && current && previous !== current) {
          this.form.controls[`${this.entityTypeFormControlName}`].patchValue(current || '');
          this.form.controls[`${this.entityTypeFormControlName}`].setErrors(this.customForm.get('type').errors);
          this.entityId.markAsTouched();
          this.entityId.markAsDirty();
          this.entityId.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        }
      });
    this.customForm.patchValue({
      id: this.form.controls[`${this.entityIdFormControlName}`].value,
      type: this.form.controls[`${this.entityTypeFormControlName}`].value,
    });

    this.form.controls[`${this.entityIdFormControlName}`].valueChanges.subscribe((value) => {
      this.entityId.patchValue(value || '');
    });

    this.form.controls[`${this.entityTypeFormControlName}`].valueChanges.subscribe((value) => {
      this.entityType.patchValue(value || '');
    });
  }

  private autofillEntityType(id: string): void {
    if (!id) {
      this.entityType.patchValue('');
      this.entityType.markAsTouched();
      this.entityType.markAsDirty();
      this.entityType.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      return;
    }
    const item: DropdownItem = this.entityTypeList.find((type) => this.entityRegExpMap.get(type.key)?.test(id));
    if (item) {
      this.entityType.patchValue(item.key);
      this.entityType.markAsTouched();
      this.entityType.markAsDirty();
      this.entityType.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      return;
    }
  }

  private entityTypeCheck(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        !!this.entityType.value &&
        !new RegExp(this.entityRegExpMap.get(this.entityType.value))?.test(control.value)
        ? { entityTypeError: true }
        : null;
    };
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
