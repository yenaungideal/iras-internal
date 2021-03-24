import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dropdown-showcase',
  templateUrl: './dropdown-showcase.component.html',
  styleUrls: ['./dropdown-showcase.component.scss'],
})
export class DropdownShowcaseComponent implements OnInit {
  dropdownForm: FormGroup;
  dropdownPlaceholder = 'Select a transaction type to begin';
  dropdownLabel = 'Nature of Transaction';
  dropDownData = [
    { text: 'Lease/ Tenancy Agreement', key: '1' },
    { text: 'Assignment of Lease between owners', key: '2' },
    { text: 'Novation/ Assignment of Lease between tenants', key: '3' },
    { text: 'Surrender of Lease', key: '4' },
    { text: 'Variation of Lease', key: '5' },
    { text: 'Lease/ Tenancy Agreement', key: '11' },
    { text: 'Assignment of Lease between owners', key: '21' },
    { text: 'Novation/ Assignment of Lease between tenants', key: '31' },
    { text: 'Surrender of Lease', key: '41' },
    { text: 'Variation of Lease', key: '51' },
    { text: 'Lease/ Tenancy Agreement', key: '11' },
    { text: 'Assignment of Lease between owners', key: '12' },
    { text: 'Novation/ Assignment of Lease between tenants', key: '13' },
    { text: 'Surrender of Lease', key: '14' },
    { text: 'Variation of Lease', key: '15' },
    { text: 'Lease/ Tenancy Agreement', key: '121' },
    { text: 'Assignment of Lease between owners', key: '122' },
    { text: 'Novation/ Assignment of Lease between tenants', key: '123' },
    { text: 'Surrender of Lease', key: '124' },
    { text: 'Variation of Lease', key: '125' },
  ];
  disabled = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.dropdownForm = this.formBuilder.group({
      transaction: [this.dropDownData[1].key, Validators.required],
    });
  }

  get transaction() {
    return this.dropdownForm.controls.transaction;
  }

  patchValue() {
    this.dropdownForm.patchValue({
      transaction: this.dropDownData[1].key,
    });
  }

  onDropdownSelect(event: any) {
    console.log(event);
  }

  toggle() {
    if (this.dropdownForm.controls.transaction.dirty) {
      this.dropdownForm.controls.transaction.reset();
    } else {
      this.dropdownForm.controls.transaction.markAsDirty();
    }
  }
  disable() {
    this.disabled = !this.disabled;
  }

  reset() {
    this.dropdownForm.patchValue({
      transaction: null,
    });
  }

  resetForm() {
    this.dropdownForm.patchValue({
      transaction: null,
    });
    this.dropdownForm.reset();
  }
  changeList() {
    this.dropDownData = [
      {
        text: 'Data1',
        key: '1',
      },
      {
        text: 'Data2',
        key: '2',
      },
    ];
    this.dropdownForm.controls.transaction.reset();
  }
}
