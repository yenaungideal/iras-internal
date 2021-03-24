import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MENU_ROUTES_CHILDREN } from './menu-routes';
import { MenuComponent } from './menu.component';

export const MENU_ROUTES: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: MENU_ROUTES_CHILDREN,
  },
];

@NgModule({
  imports: [RouterModule.forChild(MENU_ROUTES)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
