import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ContextMenuModule } from '@progress/kendo-angular-menu';
import { PipesModule } from '../../pipes/pipes.module';
import { IrasButtonsModule } from '../button/button.module';
import { IrasCheckboxModule } from '../checkbox/checkbox.module';
import { IrasEntitySearchModule } from '../entity-search/entity-search.module';
import { IrasFormInputErrorModule } from '../form-input-error/form-input-error.module';
import { IrasLinkModule } from '../link/link.module';
import { IrasTooltipModule } from '../tooltip/tooltip.module';
import { DataGridFilterComponent } from './data-grid-filter/data-grid-filter.component';
import { DataGridFilterModule } from './data-grid-filter/data-grid-filter.module';
import { DataGridComponent } from './data-grid.component';

@NgModule({
  declarations: [DataGridComponent, DataGridFilterComponent],
  imports: [
    CommonModule,
    GridModule,
    ContextMenuModule,
    FormsModule,
    ExcelModule,
    PDFModule,
    DataGridFilterModule,
    IrasButtonsModule,
    InputsModule,
    IrasLinkModule,
    IrasTooltipModule,
    IrasFormInputErrorModule,
    IrasCheckboxModule,
    IrasEntitySearchModule,
    PipesModule,
  ],
  exports: [
    DataGridComponent,
    ContextMenuModule,
    DataGridFilterComponent,
    GridModule,
    IrasButtonsModule,
    InputsModule,
    IrasLinkModule,
    IrasTooltipModule,
    IrasFormInputErrorModule,
    IrasCheckboxModule,
    IrasEntitySearchModule,
    PipesModule,
  ],
  providers: [],
})
export class IrasDataGridModule {}

export * from './data-grid-state.model';
