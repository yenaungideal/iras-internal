import { Component, forwardRef, Input, ViewChild, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownCdkPortalComponent } from '../dropdown-cdkportal.component';
import { IMultiSelectNestedDropdownModel } from '../models/dropdown-model.component';

@Component({
  selector: 'iras-multi-select-nested-dropdown',
  templateUrl: './iras-multi-select-nested-dropdown.component.html',
  styleUrls: ['./iras-multi-select-nested-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IrasMultiSelectNestedDropdownComponent),
      multi: true,
    },
  ],
})
export class IrasMultiSelectNestedDropdownComponent implements ControlValueAccessor {
  public selectAllOption: IMultiSelectNestedDropdownModel = {
    key: 'selectAll',
    text: 'Select All',
    selected: false,
    options: [],
  };

  @Input()
  public data: IMultiSelectNestedDropdownModel[];

  @Input() placeholder: string;

  @Input() hasError: boolean;

  @Input() disabled: boolean;

  @Input() dropdownOptionContanierHeight = 300;

  @ViewChild(DropdownCdkPortalComponent)
  public dropdown: DropdownCdkPortalComponent;
  public selectedItemLists: Array<{ key; text }> = [];
  selectOpened = false;
  selectFocused = false;
  onChange: any = () => {};
  onTouch: any = () => {};
  // useful when have ngModel on input elements
  writeValue(value: Array<string>): void {
    let selectedKeys: string[];
    if (value) {
      this.data = this.createList({ selectedKeys: value, data: this.data });
      if (!this.data.find((val) => val.key === 'selectAll')) {
        this.data.splice(0, 0, this.selectAllOption);
      }
      this.modifyParent();
      selectedKeys = this.getSelectedOptions().map((val) => val.key);
      this.notifyChange(selectedKeys);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.previousValue !== changes.data.currentValue) {
      this.data = this.createList({ selectedKeys: [], data: changes.data.currentValue });
      if (!this.data.find((val) => val.key === 'selectAll')) {
        this.data.splice(0, 0, this.selectAllOption);
      }
    }
  }

  public showDropdown(event: any) {
    if (!this.disabled) {
      this.dropdown.show();
    }
    this.selectFocused = true;
  }

  onDropdownStatusChange(status: boolean) {
    this.selectOpened = status;
    if (!status) {
      this.onTouch();
    }
  }

  getAllChildKeys(data: Array<IMultiSelectNestedDropdownModel>) {
    return data.map((d) => d.options.map((o) => o.key)).reduce((acc, val) => acc.concat(val), []);
  }

  createList({ selectedKeys, data }: { selectedKeys: Array<string>; data: Array<IMultiSelectNestedDropdownModel> }) {
    return data.map((item) => {
      let allSelected = true;

      item.options = item.options.map((option) => {
        if (selectedKeys.indexOf(option.key) !== -1) {
          option.selected = true;
        } else {
          option.selected = false;
          allSelected = false;
        }

        return option;
      });

      item.selected = allSelected;

      return item;
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onOptionChanged(clickedOption: IMultiSelectNestedDropdownModel, levelType: 'primaryOption' | 'secondaryOption') {
    if (levelType === 'primaryOption') {
      const optionState = clickedOption.selected;
      if (clickedOption.key === 'selectAll') {
        if (optionState === true) {
          this.data = this.createList({
            selectedKeys: this.getAllChildKeys(this.data),
            data: this.data,
          });
        } else {
          this.data = this.createList({
            selectedKeys: [],
            data: this.data,
          });
        }
      } else {
        if (optionState === true) {
          this.data = this.createList({
            selectedKeys: [
              ...this.getSelectedOptions().map((val) => val.key),
              ...clickedOption.options.map((o) => o.key),
            ],
            data: this.data,
          });
        } else {
          this.data = this.createList({
            selectedKeys: this.getSelectedOptions()
              .filter((val) => val.parentKey !== clickedOption.key)
              .map((sk) => sk.key),
            data: this.data,
          });
        }
      }
    }

    this.modifyParent();
    const selectedKeys = this.getSelectedOptions().map((val) => val.key);
    this.notifyChange(selectedKeys);
  }

  modifyParent() {
    let selectAllOptionChecked = true;
    let index;
    for (index = 0; index < this.data.length; index++) {
      // Skip the select all check option.
      if (index > 0) {
        let primaryOptionSelected = true;
        let list = this.data[index].options;

        list.forEach((val) => {
          if (!val.selected) {
            primaryOptionSelected = false;
          }
        });
        this.data[index].selected = primaryOptionSelected;

        if (!primaryOptionSelected) {
          selectAllOptionChecked = primaryOptionSelected;
        }
      }
    }

    this.data[0].selected = selectAllOptionChecked;
  }

  getSelectedOptions() {
    const selecteOptions = [];
    for (const index in this.data) {
      let list = this.data[index].options;
      list.forEach((val) => {
        if (val.selected) {
          selecteOptions.push({ key: val.key, text: val.text, parentKey: this.data[index].key });
        }
      });
    }
    this.selectedItemLists = selecteOptions;
    return selecteOptions;
  }

  public notifyChange(selectedKeys: Array<string>) {
    this.onChange(selectedKeys);
    this.onTouch(true);
  }

  public removeSelectedOption(key: string) {
    if (!this.disabled) {
      this.data.forEach((item) => {
        item.options.forEach((option) => {
          if (option.key === key) {
            option.selected = false;
          }
        });
      });

      this.modifyParent();
      const selectedKeys = this.getSelectedOptions().map((val) => val.key);
      this.notifyChange(selectedKeys);
    }
  }
}
