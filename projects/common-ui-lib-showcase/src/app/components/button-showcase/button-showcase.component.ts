import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TIconNames } from '../../../../../common-ui-lib/src/public-api';

@Component({
  selector: 'app-button-showcase',
  templateUrl: './button-showcase.component.html',
  styleUrls: ['./button-showcase.component.scss'],
})
export class ButtonShowcaseComponent implements OnInit {
  inputForm: FormGroup;
  isLoading = false;
  composeNewButtonIconName: TIconNames = 'add-capsule-white-svg';
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      fullName: ['', Validators.required],
    });
  }

  onInputFormSubmit() {
    if (!this.inputForm.valid) {
      return;
    }
  }

  toggleSpinner(): void {
    this.isLoading = !this.isLoading;
  }

  click() {
    console.log('button clicked');
  }

  get fullName(): any {
    return this.inputForm.controls.fullName;
  }
}
