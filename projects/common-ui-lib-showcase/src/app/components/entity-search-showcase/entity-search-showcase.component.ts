import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { entityTypeList } from './entity-id-list';

@Component({
  selector: 'app-entity-search-showcase',
  templateUrl: './entity-search-showcase.component.html',
})
export class EntitySearchShowcaseComponent implements OnInit {
  entitySearchForm: FormGroup;
  entityTypeList = entityTypeList;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.entitySearchForm = this.formBuilder.group({
      entityIdTest: ['G3210256K'],
      entityTypeTest: ['2'],
    });
  }

  clearForm() {
    this.entitySearchForm.reset();
    this.entitySearchForm.markAsPristine();
    this.entitySearchForm.markAsUntouched();
  }

  patchForm() {
    this.entitySearchForm.controls['entityIdTest'].patchValue('G3210809N');
  }
}
