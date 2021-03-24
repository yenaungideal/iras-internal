import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { printFormValueAndValidity } from '../../utils/print-form-value-and-validity';

@Component({
  selector: 'app-autocomplete-dropdown-showcase',
  templateUrl: 'autocomplete-dropdown-showcase.component.html',
  styleUrls: ['./autocomplete-dropdown-showcase.component.scss'],
})
export class AutocompleteDropdownShowcaseComponent implements OnInit {
  dropdownForm: FormGroup;
  dropdownPlaceholder = 'Enter Country Name';
  dropdownLabel = 'Country of Nationality';
  dropDownData = [
    { key: '205', text: 'Money' },
    { key: '100', text: 'Mongo' },
    { key: '199', text: 'Node' },
    { key: '200', text: 'ABCool' },
    { key: '1', text: 'Monica' },
    { key: '2', text: 'Joy' },
    { key: '3', text: 'Node Elan' },
    { key: '4', text: 'Coller' },
    { key: '5', text: 'Max' },
    { key: '6', text: 'Heey' },
    { key: '7', text: 'Nigix' },
    { key: '8', text: 'Node Mon' },
    { key: '11', text: 'Maker' },
    { key: '12', text: 'Mon' },
    { key: '13', text: 'Sun' },
    { key: '14', text: 'Thu' },
    { key: '15', text: 'Ali' },
    { key: '16', text: 'Dexter' },
    { key: '17', text: 'Exs' },
    { key: '18', text: 'Kiy' },
  ];

  disabled = false;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.dropdownForm = this.formBuilder.group({
      transaction: [this.dropDownData[1].key, Validators.required],
    });
    this.dropdownForm.valueChanges.subscribe((v) => {
      printFormValueAndValidity(this.dropdownForm);
      this.cdr.detectChanges();
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
