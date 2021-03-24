import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'iras-empty-state-box',
  templateUrl: './empty-state-box.component.html',
  styleUrls: ['./empty-state-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmptyStateBoxComponent {
  @Input() header: string;
  @Input() description: string;
}
