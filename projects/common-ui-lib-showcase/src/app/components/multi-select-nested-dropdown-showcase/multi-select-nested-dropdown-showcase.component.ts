import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  MULTI_SELECT_NESTED_DROPDOWN_DATA,
  MULTI_SELECT_NESTED_DROPDOWN_DATA_TYPE2,
} from './multi-select-nested-dropdown-showcase.data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../../../../common-ui-lib/src/lib/modal/modal.component';
import { ModalService } from '../../../../../common-ui-lib/src/lib/modal/modal.service';
type ModalTypes = 'grid' | 'lotsOfHtml' | 'secondModal';
@Component({
  selector: 'app-multi-select-nested-dropdown-showcase.component',
  templateUrl: './multi-select-nested-dropdown-showcase.component.html',
})
export class MultiSelectNestedDropdownShowcaseComponent implements OnInit {
  @ViewChild('modalContentRef', { static: false }) modalContentRef: TemplateRef<any>;
  multiSelectNestedDropdownForm: FormGroup;
  typeOfContent: ModalTypes = 'secondModal';
  public multiTreeListItems = [];
  public multiTreeListItemsPatchValue = [
    {
      selected: false,
      key: 'A',
      text: '99A Newton Road S(307987) #10-01, #10-02',
      options: [
        {
          key: 'A1',
          text: 'Step 1) Nikon Pte Ltd to Nikon Asia Pte Ltd',
          selected: false,
        },
        {
          key: 'A2',
          text: 'Step 2) Nikon Asia Pte Ltd to Nikon Japan Pte Ltd',
          selected: false,
        },
        {
          key: 'A3',
          text: 'Step 3',
          selected: false,
        },
        {
          key: 'A4',
          text: 'Step 4) Nikon Pte Ltd to Nikon Asia Pte Ltd',
          selected: false,
        },
        {
          key: 'A5',
          text: 'Step 5) Nikon Asia Pte Ltd to Nikon Japan Pte Ltd',
          selected: false,
        },
        {
          key: 'A6',
          text: 'Step 6',
          selected: false,
        },
      ],
    },
    {
      selected: false,
      text: 'ABC Pte Ltd, UEN-LOCAL CO 199012345A',
      key: 'B',
      options: [
        {
          text: 'Step 1) Nikon Japan Pte Ltd to Nikon Asia Pte Ltd',
          key: 'B1',
          selected: false,
        },
      ],
    },
  ];

  multiSelectNestedDropdownData = MULTI_SELECT_NESTED_DROPDOWN_DATA;
  multiSelectNestedDropdownDataType2 = MULTI_SELECT_NESTED_DROPDOWN_DATA_TYPE2;
  disabled = false;
  modalRef1: MatDialogRef<ModalComponent, any>;
  constructor(private formBuilder: FormBuilder, private modalService: ModalService) {}
  ngOnInit(): void {
    const selecteKeysForNestedDropdown = [];
    this.multiSelectNestedDropdownForm = this.formBuilder.group({
      transaction: [selecteKeysForNestedDropdown, [Validators.required]],
      nestedtransaction: [selecteKeysForNestedDropdown, [Validators.required]],
    });

    this.multiTreeListItems = JSON.parse(JSON.stringify(this.multiSelectNestedDropdownData));
  }

  get transaction() {
    return this.multiSelectNestedDropdownForm.controls.transaction;
  }

  patchValue() {
    this.transaction.patchValue(['A1', 'B1']);
  }

  onDropdownSelect(event: any) {
    console.log(event);
  }

  toggle() {
    if (this.multiSelectNestedDropdownForm.controls.transaction.dirty) {
      this.multiSelectNestedDropdownForm.controls.transaction.reset();
    } else {
      this.multiSelectNestedDropdownForm.controls.transaction.markAsDirty();
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
    this.multiTreeListItems = JSON.parse(JSON.stringify(this.multiSelectNestedDropdownData));
    this.transaction.reset();
  }

  resetForm() {
    this.transaction.patchValue([]);
    this.multiTreeListItems = JSON.parse(JSON.stringify(this.multiSelectNestedDropdownData));
    this.multiSelectNestedDropdownForm.reset();
  }

  changeList() {
    this.multiTreeListItems = JSON.parse(JSON.stringify(this.multiSelectNestedDropdownDataType2));
    this.transaction.reset();
  }

  showModalWith(typeOfModal: ModalTypes) {
    this.typeOfContent = typeOfModal;
    this.showModal();
  }
  showModal() {
    this.modalRef1 = this.modalService.show({
      data: {
        templateContentRef: this.modalContentRef,
      },
      panelClass: 'modal-showcase',
      backdropClass: 'modal-showcase-backdrop',
      disableClose: false,
    });
  }
}
