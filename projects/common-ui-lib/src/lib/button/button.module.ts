import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { IrasLinkModule } from '../link/link.module';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { ButtonComponent } from './button/button.component';
import { FloatingButtonMenuComponent } from './floating-button-menu/button-menu.component';
import { StickyButtonComponent } from './sticky-button/sticky-button.component';

@NgModule({
  declarations: [ButtonComponent, FloatingButtonMenuComponent, ButtonToggleComponent, StickyButtonComponent],
  imports: [CommonModule, FlexLayoutModule, IrasLinkModule, MatButtonToggleModule],
  exports: [
    ButtonComponent,
    FloatingButtonMenuComponent,
    ButtonToggleComponent,
    StickyButtonComponent,
    CommonModule,
    FlexLayoutModule,
    IrasLinkModule,
    MatButtonToggleModule,
  ],
})
export class IrasButtonsModule {}
export * from './button.model';
