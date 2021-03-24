import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'iras-sticky-button',
  templateUrl: 'sticky-button.component.html',
  styleUrls: ['./sticky-button.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  animations: [
    trigger('fabToggler', [
      state(
        'inactive',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      state(
        'active',
        style({
          transform: 'rotate(-180deg)',
        })
      ),
      transition('* <=> *', animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('openClose', [
      state(
        'active',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      state(
        'inactive',
        style({
          height: '0',
          opacity: 0,
        })
      ),
      transition('* <=> *', animate('100ms cubic-bezier(0.35, 0, 0.25, 1)')),
    ]),
  ],
})
export class StickyButtonComponent implements OnInit {
  fabTogglerState = 'inactive';
  @Input() data: { header: string; links: { title: string; items: string[] } };
  @Output() linkClicked = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onToggleFab() {
    this.fabTogglerState === 'active' ? (this.fabTogglerState = 'inactive') : (this.fabTogglerState = 'active');
  }

  onLinkClicked(linkName: string, title: string) {
    this.fabTogglerState = 'inactive';
    this.linkClicked.emit({ linkName, title });
  }
}
