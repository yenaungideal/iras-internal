import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MENU_ROUTES_CHILDREN } from './menu-routes';

interface MenuItem extends Route {
  selected: boolean;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuRoutes = MENU_ROUTES_CHILDREN as MenuItem[];
  selectedPath: string;
  showMenu: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuRoutes[0].selected = true;
  }

  onMenuItemClick(index: number) {
    this.showMenu = false;
    this.menuRoutes.find((m) => m.selected).selected = false;
    this.menuRoutes[index].selected = true;
    this.selectedPath = this.menuRoutes[index].path;
    this.router.navigateByUrl(`menu/${this.selectedPath}`);
  }

  onMenuButtonClick() {
    this.showMenu = !this.showMenu;
  }
}
