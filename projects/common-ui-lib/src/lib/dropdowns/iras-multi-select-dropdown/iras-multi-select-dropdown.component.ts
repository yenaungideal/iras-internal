import { Component, forwardRef, Input, ViewChild, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownCdkPortalComponent } from '../dropdown-cdkportal.component';
import { IMultiSelectDropdownModel } from '../models/dropdown-model.component';

@Component({
  selector: 'iras-multi-select-dropdown',
  templateUrl: './iras-multi-select-dropdown.component.html',
  styleUrls: ['./iras-multi-select-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IrasMultiSelectDropdownComponent),
      multi: true,
    },
  ],
})
export class IrasMultiSelectDropdownComponent implements ControlValueAccessor {
  public selectAllOption: IMultiSelectDropdownModel = {
    key: 'selectAll',
    text: 'Select All',
    selected: false,
  };

  @Input()
  public data: IMultiSelectDropdownModel[];

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
      this.modifySelectedAllOption();
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

  getAllKeys(data: Array<IMultiSelectDropdownModel>) {
    return data
      .filter((item) => item.key !== 'selectAll')
      .map((o) => o.key)
      .reduce((acc, val) => acc.concat(val), []);
  }

  createList({ selectedKeys, data }: { selectedKeys: Array<string>; data: Array<IMultiSelectDropdownModel> }) {
    return data.map((item) => {
      if (selectedKeys.indexOf(item.key) !== -1) {
        item.selected = true;
      } else {
        item.selected = false;
      }
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

  onOptionChanged(clickedOption: IMultiSelectDropdownModel) {
    const optionState = clickedOption.selected;
    if (clickedOption.key === 'selectAll') {
      if (optionState === true) {
        this.data = this.createList({
          selectedKeys: this.getAllKeys(this.data),
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
          selectedKeys: [...this.getSelectedOptions().map((val) => val.key), ...clickedOption.key],
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

    this.modifySelectedAllOption();
    const selectedKeys = this.getSelectedOptions().map((val) => val.key);
    this.notifyChange(selectedKeys);
  }

  modifySelectedAllOption() {
    let selectAllOptionChecked = true;
    this.data.forEach((val) => {
      if (val.key !== 'selectAll' && !val.selected) {
        selectAllOptionChecked = false;
      }
    });

    this.data[0].selected = selectAllOptionChecked;
  }

  getSelectedOptions() {
    const selecteOptions = [];
    this.data.forEach((val) => {
      if (val.key !== 'selectAll' && val.selected) {
        selecteOptions.push({ key: val.key, text: val.text });
      }
    });

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
        if (item.key === key) {
          item.selected = false;
        }
      });

      this.modifySelectedAllOption();
      const selectedKeys = this.getSelectedOptions().map((val) => val.key);
      this.notifyChange(selectedKeys);
    }
  }
}
