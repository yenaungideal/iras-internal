export interface MultiDropdownInputModel {
  text: string;
  input: string;
  rowCheckbox: boolean;
}

export interface MultiDropdownModel {
  text: string;
  rowCheckbox: boolean;
}

export interface TreeDropdownModel {
  text: string;
  rowCheckbox: boolean;
  parentClass: boolean;
}

export interface AutoCompleteDropdownModel {
  key: string;
  text: string;
}

export interface IMultiSelectDropdownModel {
  key: string;
  text: string;
  selected: boolean;
}

export interface IMultiSelectNestedDropdownModel {
  key: string;
  text: string;
  selected: boolean;
  options: IMultiSelectNestedDropdownChildModel[];
}

export interface IMultiSelectNestedDropdownChildModel {
  key: string;
  text: string;
  selected: boolean;
}
