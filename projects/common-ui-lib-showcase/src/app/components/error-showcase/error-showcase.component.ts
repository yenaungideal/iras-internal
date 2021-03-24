import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'error-showcase',
  templateUrl: './error-showcase.component.html',
  styleUrls: ['./error-showcase.component.scss']
})
export class ErrorShowcaseComponent implements OnInit {

  errorDescription = {
    headerTitle: "Sorry",
    description: [
      "System has encountered some technical problems", "Please try again later."
    ],
    action: "BACK TO MYTAX PORTAL",
    others: [
      "If the problem persists, please contact us"
    ],
    timestamp: "13 Jan 2021 06:30 PM 13/1/21-O8P"
  };

  constructor() {}

  ngOnInit(): void {}
}
