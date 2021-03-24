import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper-view-showcase.component',
  templateUrl: './stepper-view-showcase.component.html',
})
export class StepperViewShowcaseComponent implements OnInit {
  // Stepper View
  headingTitles: Array<string> = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'];
  currentIndex = 0;

  ngOnInit(): void {}

  onStepBack() {
    if (this.currentIndex === 0) {
      return;
    }
    this.currentIndex = this.currentIndex - 1;
  }

  onStepNext() {
    this.currentIndex = this.currentIndex + 1;
  }
}
