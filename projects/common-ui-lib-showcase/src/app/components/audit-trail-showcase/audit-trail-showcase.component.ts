import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DropdownItem } from '../../../../../common-ui-lib/src/lib/dropdowns/iras-dropdown/dropdown-item.model';

@Component({
  selector: 'app-audit-trail-showcase',
  templateUrl: './audit-trail-showcase.component.html',
})
export class AuditTrailShowcaseComponent implements OnInit {
  auditTrailForm: FormGroup;
  auditSource: DropdownItem[] = [
    {
      key: '3306',
      text: 'API',
    },
    {
      key: '38',
      text: 'EVN',
    },
    {
      key: '999',
      text: 'BATCH PROGRAM',
    },
  ];
  auditReason: DropdownItem[] = [
    {
      key: '486',
      text: 'PYMT MADE',
    },
  ];
  requiredMsg = 'Required';
  displaySource = 'EVN';
  displayReason = 'PYMT MADE';
  officer = 'INLABCD';
  dateTime = '01/01/2020 23:59:59';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.auditTrailForm = this.formBuilder.group({
      formSource: [''],
      formReason: [''],
    });

    this.auditTrailForm.valueChanges.subscribe((val) => {
      console.log(val);
    });
  }

  clearForm() {
    this.auditTrailForm.reset();
    this.auditTrailForm.markAsPristine();
    this.auditTrailForm.markAsUntouched();
  }

  triggerRequiredError() {
    if (
      this.auditTrailForm.controls.formReason.value === '' ||
      this.auditTrailForm.controls.formReason.value === null
    ) {
      this.auditTrailForm.controls.formReason.setErrors({ required: true });
    }
    if (
      this.auditTrailForm.controls.formSource.value === '' ||
      this.auditTrailForm.controls.formSource.value === null
    ) {
      this.auditTrailForm.controls.formSource.setErrors({ required: true });
    }
  }
}
