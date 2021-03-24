import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { IrasButtonsModule } from '../button/button.module';
import { IrasModalModule } from '../modal/modal.module';
import { DialogPopupComponent } from './dialog-popup.component';

@NgModule({
  declarations: [DialogPopupComponent],
  imports: [CommonModule, DialogModule, IrasButtonsModule, FlexLayoutModule, IrasModalModule],
  exports: [CommonModule, DialogModule, IrasButtonsModule, FlexLayoutModule, DialogPopupComponent],
})
export class IrasDialogPopupModule {}
