import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { BehaviorSubject, Observable } from 'rxjs';
import { AutoCompleteDropdownModel } from '../models/dropdown-model.component';

@Component({
  selector: 'iras-autocomplete-dropdown',
  templateUrl: './iras-autocomplete-dropdown.component.html',
  styleUrls: ['./iras-autocomplete-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IrasAutocompleteDropdownComponent),
      multi: true,
    },
  ],
})
export class IrasAutocompleteDropdownComponent implements ControlValueAccessor, OnChanges {
  @Input() label: string;
  @Input() data: AutoCompleteDropdownModel[];
  @Input() placeholder: string;
  @Input() hasError: boolean;
  @Input() showRequiredSymbol: false;
  @Input() disabled: boolean;
  @Input() showIcon = true;
  @Input() icon = 'iras-icon--search-svg';
  @Input() overlayPanelHeight = 300;
  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
  dataList = new BehaviorSubject<AutoCompleteDropdownModel[]>([]);
  filteredOptions: Observable<AutoCompleteDropdownModel[]>;
  autocompleteOverPanel: any;
  boundClient: any;
  overlayPane: any;
  selectedItemText: string;
  focused = false;
  irasSelectTriggerElement: any;
  inputContainerWidth = 0;
  selectOpened = false;
  @ViewChild('inputContainer') inputContainer: ElementRef<HTMLElement>;
  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) inputAutoComplete: MatAutocompleteTrigger;

  get selectedOption() {
    return this._value;
  }

  @Input() set selectedOption(val: string) {
    if (val !== undefined && this._value !== val) {
      if (val === null) {
        this._value = val;
        this.selectedItemText = val;
        return;
      }
      this._value = val;
      this.onChange(val);
      this.onTouch(val);
      this.selectedItemText = this.data.find((d) => d.key === val)?.text;
    }
  }

  private _value: string;
  constructor(private cdr: ChangeDetectorRef) {}
  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: string): void {
    this.selectedOption = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.previousValue !== changes.data.currentValue) {
      this.data = changes.data.currentValue;
      this.dataList.next(this.data);
    }
  }

  onSelectionChange(event: any) {
    this.selectionChange.emit(this.selectedOption);
  }

  onInputClick(evt: any) {
    if (this.disabled !== true) {
      evt.stopPropagation();
      this.inputAutoComplete.openPanel();
    }
  }

  onSearchIconClick(evt: any) {
    if (this.disabled !== true) {
      evt.stopPropagation();
      if (!this.inputAutoComplete.panelOpen) {
        this.inputAutoComplete.openPanel();
        const inputElement: HTMLElement = this.inputContainer.nativeElement.querySelector('.mat-autocomplete-trigger');
        inputElement.focus();
      }
    }
  }

  onInputBlur() {
    setTimeout(() => {
      if (this.inputAutoComplete.panelOpen) {
        this.inputAutoComplete.closePanel();
      }
      this.focused = false;
      this.onTouch();
    }, 200);
  }

  onInputChange() {
    this.resetAutoCompleteValue();
  }

  onOptionSelected(val: string) {
    this.writeValue(this.getOptionKeyByText(val));
  }

  getOptionKeyByText(val: string) {
    return this.data.find((d) => d.text === val)?.key;
  }

  onAutoCompleteClosed() {
    this.resetAutoCompleteValue();
  }

  resetAutoCompleteValue() {
    if (!!!this.data.find((d) => d.text === this.selectedItemText)?.key) {
      this.selectedItemText = '';
      this.writeValue('');
      this.cdr.detectChanges();
    }
  }

  onAutoCompleteOpened() {
    const doc = document.querySelector('.mat-autocomplete-panel');
    if (doc) {
      const height = `max-height:${this.overlayPanelHeight}px;`;
      doc.setAttribute('style', height);
    }

    this.inputContainerWidth = this.inputContainer.nativeElement.clientWidth;
    const autoCompleteInput = this.inputContainer.nativeElement.querySelector(
      '.iras-autocomplete__item-placeholder'
    ) as HTMLInputElement;
    autoCompleteInput.select();
  }

  onInputFocus() {
    this.onTextChange(this.selectedItemText);
    this.focused = true;
  }

  onTextChange(searchVal: string) {
    if (!searchVal) {
      this.selectedItemText = '';
      this.writeValue('');
    }
    const filteredData = this.getFilteredList(searchVal);
    this.dataList.next(filteredData);
  }

  getFilteredList(value: string) {
    return this.data.filter((item) => item.text.toLowerCase().includes((value || '').toLowerCase()));
  }

  onKeyPress(event: any) {
    // Trigger Open Panel if backspace or delete keycode.
    if (event.keyCode === 8 || event.keyCode === 46) {
      this.inputAutoComplete.openPanel();
    }
  }
}
