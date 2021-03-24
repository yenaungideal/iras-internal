import { NgModule } from '@angular/core';
import { IrasAuditTrailModule } from './audit-trail/audit-trail.module';
import { IrasButtonsModule } from './button/button.module';
import { IrasCardsModule } from './card/cards.module';
import { IrasCheckboxModule } from './checkbox/checkbox.module';
import { IrasDataGridModule } from './data-grid/data-grid.module';
import { IrasDatePickerModule } from './datepickers/iras-date-picker/iras-date-picker.module';
import { IrasDateRangePickerModule } from './datepickers/iras-date-range-picker/iras-date-range-picker.module';
import { IrasMonthPickerModule } from './datepickers/iras-month-picker/iras-month-picker.module';
import { IrasMonthYearPickerModule } from './datepickers/iras-month-year-picker/iras-month-year-picker.module';
import { IrasYearPickerModule } from './datepickers/iras-year-picker/iras-year-picker.module';
import { IrasDialogPopupModule } from './dialog-popup/dialog-popup.module';
import { IrasDropdownsModule } from './dropdowns/dropdowns.module';
import { IrasEmptyStateBoxModule } from './empty-state-box/empty-state-box.module';
import { IrasEntitySearchModule } from './entity-search/entity-search.module';
import { IrasErrorModule } from './error/error.module';
import { IrasExpansionPanelModule } from './expansion-panel/expansion-panel.module';
import { IrasFormInputErrorModule } from './form-input-error/form-input-error.module';
import { IrasInputModule } from './input/input.module';
import { IrasLevelUnitInputModule } from './level-unit-input/level-unit-input.module';
import { IrasLinkModule } from './link/link.module';
import { IrasMaskedInputModule } from './masked-input/masked-input.module';
import { ModalComponent } from './modal/modal.component';
import { IrasModalModule } from './modal/modal.module';
import { IrasNonModalModule } from './non-modal/non-modal.module';
import { ModalService } from './modal/modal.service';
import { NonModalService } from './non-modal/non-modal.service';
import { IrasPaginationModule } from './pagination/pagination.module';
import { IrasPopoverModule } from './popover/popover.module';
import { PopoverService } from './popover/popover.service';
import { IrasRadioButtonModule } from './radio-button/radio-button.module';
import { RequiredSymbolModule } from './required-symbol/required-symbol.module';
import { SnackbarComponent } from './snack-bar/snack-bar.component';
import { IrasSnackbarModule } from './snack-bar/snack-bar.module';
import { MultiSnackbarComponent } from './multi-snack-bar/multi-snack-bar.component';
import { MultiSnackbarService } from './multi-snack-bar/multi-snack-bar.service';
import { IrasMultiSnackbarModule } from './multi-snack-bar/multi-snack-bar.module';
import { SnackbarService } from './snack-bar/snack-bar.service';
import { IrasSpinnerModule } from './spinner/spinner.module';
import { IrasStepperViewModule } from './stepper-view/stepper-view.module';
import { IrasTabsModule } from './tabs/tabs.module';
import { IrasTextAreaModule } from './text-area/text-area.module';
import { IrasTimePickerModule } from './time-picker/time-picker.module';
import { IrasTitleModule } from './title/title.module';
import { IrasTooltipModule } from './tooltip/tooltip.module';
import { IrasFileUploadModule } from './file-upload/file-upload.module';
import { PipesModule } from '../pipes/pipes.module';

import { IrasNumericStepperModule } from './numeric-stepper/numeric-stepper.module';
import { ComponentOnDestroyObserver } from '../helpers';
@NgModule({
  declarations: [ComponentOnDestroyObserver],
  exports: [
    ComponentOnDestroyObserver,
    // Common Component Modules
    IrasButtonsModule,
    IrasTitleModule,
    IrasStepperViewModule,
    IrasPaginationModule,
    IrasDropdownsModule,
    IrasDialogPopupModule,
    IrasCheckboxModule,
    IrasRadioButtonModule,
    IrasCardsModule,
    IrasLinkModule,
    IrasInputModule,
    IrasNumericStepperModule,
    IrasLevelUnitInputModule,
    IrasTextAreaModule,
    IrasMaskedInputModule,
    IrasFormInputErrorModule,
    IrasMaskedInputModule,
    IrasModalModule,
    IrasNonModalModule,
    IrasTooltipModule,
    IrasPopoverModule,
    IrasSpinnerModule,
    IrasEntitySearchModule,
    IrasAuditTrailModule,
    IrasExpansionPanelModule,
    IrasFileUploadModule,
    // Date Pickers
    IrasDatePickerModule,
    IrasMonthYearPickerModule,
    IrasMonthPickerModule,
    IrasYearPickerModule,
    IrasDateRangePickerModule,
    IrasSnackbarModule,
    IrasMultiSnackbarModule,
    RequiredSymbolModule,
    IrasTabsModule,
    // DATA GRID
    IrasDataGridModule,
    IrasEmptyStateBoxModule,
    IrasTimePickerModule,
    PipesModule,
    IrasErrorModule,
  ],
  providers: [ModalService, SnackbarService, MultiSnackbarService, PopoverService],
  entryComponents: [ModalComponent, SnackbarComponent, MultiSnackbarComponent],
})
export class CommonUiInternalLibraryModule {}
