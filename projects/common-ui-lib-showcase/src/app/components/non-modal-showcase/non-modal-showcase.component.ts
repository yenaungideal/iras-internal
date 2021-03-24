import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NonModalService } from '../../../../../common-ui-lib/src/lib/non-modal/non-modal.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { NonModalComponent } from '../../../../../common-ui-lib/src/lib/non-modal/non-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MULTI_SELECT_DROPDOWN_DATA,
  MULTI_SELECT_DROPDOWN_DATA_TYPE2,
} from '../multi-select-dropdown-showcase/multi-select-dropdown-showcase.data';

type ModalTypes = 'grid' | 'lotsOfHtml' | 'secondModal';
@Component({
  selector: 'app-non-modal-showcase',
  templateUrl: './non-modal-showcase.component.html',
  styleUrls: ['./non-modal-showcase.component.scss'],
})
export class NonModalShowcaseComponent implements OnInit {
  typeOfContent: ModalTypes = 'secondModal';
  modalLargeHTML: SafeHtml;
  @ViewChild('modalContentRef', { static: false }) modalContentRef: TemplateRef<any>;
  modalRef1: MatDialogRef<NonModalComponent, any>;
  multiSelectDropdownForm: FormGroup;

  public multiTreeListItems = [];
  public multiTreeListItemsPatchValue = [
    {
      selected: false,
      key: 'A',
      text: '99A Newton Road S(307987) #10-01, #10-02',
    },
    {
      selected: false,
      text: 'ABC Pte Ltd, UEN-LOCAL CO 199012345A',
      key: 'B',
    },
  ];

  multiSelectDropdownData = MULTI_SELECT_DROPDOWN_DATA;
  multiSelectDropdownDataType2 = MULTI_SELECT_DROPDOWN_DATA_TYPE2;
  disabled = false;

  constructor(private nonModalService: NonModalService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const selecteKeysForNestedDropdown = [];
    this.multiSelectDropdownForm = this.formBuilder.group({
      transaction: [selecteKeysForNestedDropdown, [Validators.required]],
      nestedtransaction: [selecteKeysForNestedDropdown, [Validators.required]],
    });

    this.multiTreeListItems = JSON.parse(JSON.stringify(this.multiSelectDropdownData));
  }

  get transaction() {
    return this.multiSelectDropdownForm.controls.transaction;
  }

  patchValue() {
    this.transaction.patchValue(['A', 'B']);
  }

  onDropdownSelect(event: any) {
    console.log(event);
  }

  toggle() {
    if (this.multiSelectDropdownForm.controls.transaction.dirty) {
      this.multiSelectDropdownForm.controls.transaction.reset();
    } else {
      this.multiSelectDropdownForm.controls.transaction.markAsDirty();
    }
  }
  disable() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.transaction.disable();
    } else {
      this.transaction.enable();
    }
  }

  reset() {
    this.transaction.patchValue([]);
    this.multiTreeListItems = JSON.parse(JSON.stringify(this.multiSelectDropdownData));
    this.transaction.reset();
  }

  resetForm() {
    this.transaction.patchValue([]);
    this.multiTreeListItems = JSON.parse(JSON.stringify(this.multiSelectDropdownData));
    this.multiSelectDropdownForm.reset();
  }

  changeList() {
    this.multiTreeListItems = JSON.parse(JSON.stringify(this.multiSelectDropdownDataType2));
    this.transaction.reset();
  }

  showModal() {
    this.modalRef1 = this.nonModalService.show({
      data: {
        templateContentRef: this.modalContentRef,
      },
      panelClass: 'custom-non-modal-showcase',
    });
  }

  closeFirstModal() {
    this.modalRef1.close();
  }
}
