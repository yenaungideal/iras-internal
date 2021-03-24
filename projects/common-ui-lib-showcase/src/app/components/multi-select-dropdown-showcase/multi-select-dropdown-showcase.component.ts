import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MULTI_SELECT_DROPDOWN_DATA, MULTI_SELECT_DROPDOWN_DATA_TYPE2 } from './multi-select-dropdown-showcase.data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../../../../common-ui-lib/src/lib/modal/modal.component';
import { ModalService } from '../../../../../common-ui-lib/src/lib/modal/modal.service';
type ModalTypes = 'grid' | 'lotsOfHtml' | 'secondModal';
@Component({
  selector: 'app-multi-select-dropdown-showcase.component',
  templateUrl: './multi-select-dropdown-showcase.component.html',
})
export class MultiSelectDropdownShowcaseComponent implements OnInit {
  @ViewChild('modalContentRef', { static: false }) modalContentRef: TemplateRef<any>;
  multiSelectDropdownForm: FormGroup;
  typeOfContent: ModalTypes = 'secondModal';
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
  modalRef1: MatDialogRef<ModalComponent, any>;
  constructor(private formBuilder: FormBuilder, private modalService: ModalService) {}
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
