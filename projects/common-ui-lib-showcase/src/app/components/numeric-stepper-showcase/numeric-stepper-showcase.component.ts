import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-numeric-stepper-showcase',
  templateUrl: './numeric-stepper-showcase.component.html',
  styleUrls: ['./numeric-stepper-showcase.component.scss'],
})
export class NumericStepperShowcaseComponent implements OnInit {
  numericStepperForm: FormGroup;
  disabled = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.numericStepperForm = this.formBuilder.group({
      numericStepper: ['1', [Validators.required]],
    });
  }

  get numericStepper(): any {
    return this.numericStepperForm.controls.numericStepper;
  }

  disable() {
    this.disabled = !this.disabled;
  }

  resetNumericStepperControl() {
    this.numericStepperForm.reset();
  }
}
