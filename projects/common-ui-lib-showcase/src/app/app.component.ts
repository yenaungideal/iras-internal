import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'common-ui-lib-showcase';
  routes = [
    {
      path: 'menu',
      text: 'split-view',
    },
  ];

  constructor(private router: Router) {}
  ngOnDestroy(): void {}

  onButtonClick(path: string) {
    this.router.navigateByUrl(path);
  }
}
