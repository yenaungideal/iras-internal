import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TIconNames } from '../../../public-api';
import { ButtonColorType, ButtonFillType, ButtonShapeType, ButtonSizeType } from '../button.model';

type TIconClass = {
  [key in TIconNames]: boolean;
};
@Component({
  selector: 'iras-custom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input() disabled: boolean;
  @Input() fill: ButtonFillType = 'solid';
  @Input() shape: ButtonShapeType = 'round';
  @Input() size: ButtonSizeType = 'default';
  @Input() color: ButtonColorType = 'primary';
  @Input() buttonText: string;
  @Input() cssClass: string;
  @Input() buttonType: 'button' | 'submit' = 'button';
  @Input() showSpinner = false;
  @Input() width = 100;
  @Input() icon: TIconNames;
  @Output() buttonClicked: EventEmitter<void> = new EventEmitter();

  @ViewChild('button') buttonRef: ElementRef;
  _btnClass: {
    [key: string]: boolean;
  };
  iconClass: any;
  constructor(@Inject(DOCUMENT) private document: any) {}

  ngOnInit() {
    this._btnClass = this.computeButtonClass();
    this.iconClass = ['iras-icon', `iras-icon--${this.icon}`];
  }

  ngOnChanges(changes: SimpleChanges) {
    this._btnClass = this.computeButtonClass();
  }

  computeButtonClass() {
    // btn class manipulation
    const containerClassMap = {} as any;

    if (this.fill) {
      const fill = this.fill;
      containerClassMap[fill ? `iras-button__fill--${fill}` : 'iras-button__fill--solid'] = true;
    }

    if (this.shape) {
      const shape = this.shape;
      containerClassMap[shape ? `iras-button__shape--${shape}` : 'iras-button__shape--default'] = true;
    }

    if (this.size) {
      const size = this.size;
      containerClassMap[size ? `iras-button__size--${size}` : 'iras-button__size--medium'] = true;
    }

    if (this.color) {
      const color = this.color;
      containerClassMap[
        color
          ? `iras-color iras-color-${color} iras-button__color--${color}`
          : 'iras-color iras-color-primary iras-button__color--primary'
      ] = true;
    }

    return containerClassMap;
  }

  onButtonClick(event: any) {
    this.buttonClicked.emit();

    if (this.buttonType !== 'submit') {
      return;
    }
    const form = document.activeElement.closest('form');
    if (!form) {
      return;
    }
    event.preventDefault();
    const fakeSubmit = document.createElement('button');
    fakeSubmit.type = 'submit';
    fakeSubmit.style.display = 'none';
    form.appendChild(fakeSubmit);
    fakeSubmit.click();
    fakeSubmit.remove();
  }

  getContainerClassList() {
    return `${this.cssClass || ''} ${this.disabled ? 'iras-button__container--disabled' : ''} `;
  }
}
