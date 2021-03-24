import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-submit-error-showcase',
  templateUrl: 'post-submit-error-showcase.component.html',
})
export class PostSubmitErrorShowcaseComponent implements OnInit {
  singleInputForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.singleInputForm = this.formBuilder.group({
      paymentRef: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^\\d+\\.\\d{2}$')]],
    });
  }

  get paymentRef(): any {
    return this.singleInputForm.controls.paymentRef;
  }
}
