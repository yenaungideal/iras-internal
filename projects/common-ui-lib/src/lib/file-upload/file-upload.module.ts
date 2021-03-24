import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IrasCardsModule } from '../card/cards.module';
import { IrasButtonsModule } from '../button/button.module';
import { FileUploadComponent } from './file-upload.component';
import { IrasFileDropDirective } from './file-upload.directive';

@NgModule({
  declarations: [FileUploadComponent, IrasFileDropDirective],
  imports: [CommonModule, FlexLayoutModule, IrasCardsModule, IrasButtonsModule],
  exports: [
    CommonModule,
    FlexLayoutModule,
    IrasCardsModule,
    IrasButtonsModule,
    FileUploadComponent,
    IrasFileDropDirective,
  ],
  providers: [],
})
export class IrasFileUploadModule {}
