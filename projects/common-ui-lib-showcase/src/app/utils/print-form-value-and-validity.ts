import { FormGroup, FormControl } from '@angular/forms';

export const printFormValueAndValidity = (form: FormGroup) => {
  const controls = Object.keys(form.controls).map((k) => {
    return {
      controlName: k,
      value: form.controls[k].value,
      valid: form.controls[k].valid,
    };
  });
  console.log(controls);
};

export const printControlStatus = (control: FormControl) => {
  console.log({
    touched: control.touched,
    invalid: control.invalid,
    value: control.value,
    dirty: control.dirty,
    errors: control.errors,
  });
};
