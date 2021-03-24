import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { updateOverlayPosition } from '../dropdown-cdkportal.util';
import { DropdownItem } from './dropdown-item.model';

@Component({
  selector: 'iras-dropdown',
  templateUrl: './iras-dropdown.component.html',
  styleUrls: ['./iras-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IrasDropdownComponent),
      multi: true,
    },
  ],
})
export class IrasDropdownComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() data: DropdownItem[];
  @Input() placeholder: string;
  @Input() hasError: boolean;
  @Input() showRequiredSymbol: false;
  @Input() disabled: boolean;
  @Input() overlayPanelHeight = 300;
  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
  irasSelectOverPanel: any;
  irasSelectOverPanelWrap: any;
  overlayPane: any;
  selectedItemText: string;
  @ViewChild('matSelect') matSelect: MatSelect;
  @ViewChild('dropdownContainer') dropdownContainer: ElementRef;
  irasSelectTriggerElement: any;
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
      this.selectedItemText = this.data.find((d) => d.key === this._value)?.text;
    }
  }
  selectOpened = false;
  selectFocused = false;
  private _value: string;
  constructor() {}
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
  setDisabledState?(isDisabled: boolean): void {}
  onSelectionChange(event: any) {
    this.irasSelectOverPanel.style.display = 'none';
    this.irasSelectOverPanel.style.opacity = '0';
    this.selectionChange.emit(this.selectedOption);
  }

  onOpenedChange(event: boolean) {
    this.selectOpened = event;
    setTimeout(() => {
      const boundClient = this.irasSelectTriggerElement?.getBoundingClientRect() || {};

      this.irasSelectOverPanelWrap = document.querySelector('.mat-select-panel-wrap');
      this.irasSelectOverPanel = document.querySelector('.mat-select-panel.iras-select-overlay-panel');

      if (this.irasSelectOverPanel) {
        this.irasSelectOverPanel.classList.add('iras-select-overlay-panel--showing');
        this.irasSelectOverPanel.style.maxWidth = `${boundClient.width}px`;
        this.irasSelectOverPanel.style.minWidth = `${boundClient.width}px`;
        const height = `max-height:${this.overlayPanelHeight}px;`;
        this.irasSelectOverPanel.setAttribute('style', height);
      }
      if (this.irasSelectOverPanelWrap) {
        this.irasSelectOverPanelWrap.style.maxWidth = `${boundClient.width}px`;
        this.irasSelectOverPanelWrap.style.minWidth = `${boundClient.width}px`;
      }
      if (this.selectOpened) {
        this.matSelect.focus();
        const selectOptionHeight = (this.irasSelectOverPanel?.getBoundingClientRect() || {}).height;

        const topValue = updateOverlayPosition({
          selectOptionHeight,
          boundClient,
          windowHeight: window.innerHeight,
        });

        const overlayPane: HTMLElement = document.querySelector('.cdk-overlay-pane');
        if (overlayPane) {
          overlayPane.style.top = `${topValue}px`;
          overlayPane.style.transform = 'unset';
        }
      }
    }, 5);
  }

  setMatSelectAppearance(event: any) {
    this.irasSelectTriggerElement = event?.target?.closest('div.iras-select .iras-select__selector');

    if (!this.selectOpened) {
      this.matSelect.open();
      return;
    }
  }

  closeDropDown() {
    if (this.selectOpened) {
      this.selectOpened = false;
      this.matSelect.close();
    }
  }

  onSelectFocus() {
    this.selectFocused = true;
  }
  onSelectBlur() {
    this.selectFocused = false;
    this.onTouch();
  }
}
