import { Component, Input } from '@angular/core';
@Component({
  selector: 'iras-stepper-view',
  templateUrl: './stepper-view.component.html',
  styleUrls: ['./stepper-view.component.scss'],
})
export class StepperViewComponent {
  @Input() headings: Array<string> = [];
  @Input() activeIndex = 0;

  changeActive() {
    this.activeIndex = this.activeIndex + 1;
  }
}
