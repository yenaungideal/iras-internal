import { animate, state, style, transition, trigger } from '@angular/animations';
// Monkey patch to work with Shadow Dom
import { ɵWebAnimationsDriver } from '@angular/animations/browser';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

ɵWebAnimationsDriver.prototype.containsElement = (el1: any, el2: any) => {
  // Travel up the tree to the root node.
  let elem = el2;
  while (elem && elem !== document.documentElement) {
    if (elem === el1) return true;
    elem = elem.parentNode || elem.host;
  }
  return false;
};
@Component({
  selector: 'iras-button-menu',
  templateUrl: './button-menu.component.html',
  styleUrls: ['./button-menu.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  animations: [
    trigger('changeDivSize', [
      state(
        'initial',
        style({
          backgroundColor: 'var(--background-color)',
          width: '36px',
          height: '36px',
          borderRadius: '18px',
        })
      ),
      state(
        'final',
        style({
          backgroundColor: 'var(--background-color)',
          width: 'var(--expanded-width)',
          height: '36px',
          borderRadius: '18px',
        })
      ),
      transition('initial=>final', animate('300ms')),
      transition('final=>initial', animate('300ms')),
    ]),
  ],
})
export class FloatingButtonMenuComponent {
  @Input() data: [];
  @Input() width = '25%';
  @Output() selectionChange = new EventEmitter<any>();

  currentState = 'initial';

  expandMenu() {
    this.currentState = 'final';
  }

  collapseMenu() {
    this.currentState = 'initial';
  }

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  onMenuClick(item: any) {
    this.selectionChange.emit(item);
  }
}
