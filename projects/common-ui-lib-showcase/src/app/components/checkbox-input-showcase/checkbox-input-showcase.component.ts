import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { printFormValueAndValidity } from '../../utils/print-form-value-and-validity';

@Component({
  selector: 'app-checkbox-input-showcase',
  templateUrl: './checkbox-input-showcase.component.html',
  styleUrls: ['./checkbox-input-showcase.component.scss'],
})
export class CheckboxInputShowcaseComponent implements OnInit {
  agreementCheckOptions = [
    {
      selected: false,
      label: 'I agree',
      disabled: false,
    },
    {
      selected: false,
      label: 'I agree',
      disabled: false,
    },
    {
      selected: false,
      label: 'I agree',
      disabled: false,
    },
    {
      selected: false,
      label: 'I agree',
      disabled: false,
    },
  ];
  form: FormGroup;
  checkHasError: boolean;
  declarationOptions = [
    {
      selected: false,
      label: 'I declare that',
      disabled: false,
    },
  ];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      check: ['', [Validators.required]],
    });

    this.form.valueChanges.subscribe((val) => {
      printFormValueAndValidity(this.form);
    });
  }

  patchValue() {
    for (const option of this.agreementCheckOptions) {
      option.selected = true;
    }
    this.form.patchValue({
      check: this.agreementCheckOptions,
    });
  }
  toggle() {
    for (const option of this.agreementCheckOptions) {
      option.disabled = false;
    }
    this.form.patchValue({
      check: this.agreementCheckOptions,
    });
    this.checkHasError = !this.checkHasError;
  }

  toggleDisable() {
    for (const option of this.agreementCheckOptions) {
      option.disabled = !option.disabled;
    }
    this.form.patchValue({
      check: this.agreementCheckOptions,
    });
  }
  reset() {
    for (const option of this.agreementCheckOptions) {
      option.selected = false;
    }
    this.form.patchValue({
      check: this.agreementCheckOptions,
    });
  }
  get check(): any {
    return this.form.controls.check;
  }
}
