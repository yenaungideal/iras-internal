import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ButtonShowcaseComponent } from '../components/button-showcase/button-showcase.component';
import { CardShowcaseComponent } from '../components/card-showcase/card-showcase.component';
import { ExpansionPanelShowcaseComponent } from '../components/expansion-panel-showcase/expansion-panel-showcase.component';
import { CheckboxInputShowcaseComponent } from '../components/checkbox-input-showcase/checkbox-input-showcase.component';
import { InputShowcaseComponent } from '../components/input-showcase/input-showcase.component';
import { MaskedInputShowcaseComponent } from '../components/masked-input-showcase/masked-input-showcase.component';
import { ModalShowcaseComponent } from '../components/modal-showcase/modal-showcase.component';
import { NonModalShowcaseComponent } from '../components/non-modal-showcase/non-modal-showcase.component';
import { RadioInputShowcaseComponent } from '../components/radio-input-showcase/radio-input-showcase.component';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { SpinnerShowcaseComponent } from '../components/spinner-showcase/spinner-showcase.component';
import { DatetimepickersShowcaseComponent } from '../components/datepickers-showcase/datetimepickers-showcase.component';
import { CommonUiInternalLibraryModule } from '../../../../common-ui-lib/src/public-api';
import { TitleShowcaseComponent } from '../components/title-showcase/title-showcase.component';
import { DropdownShowcaseComponent } from '../components/dropdown-showcase/dropdown-showcase.component';
import { AutocompleteDropdownShowcaseComponent } from '../components/autocomplete-dropdown-showcase/autocomplete-dropdown-showcase.component';
import { TabsShowcaseComponent } from '../components/tabs-showcase/tabs-showcase.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { StepperViewShowcaseComponent } from '../components/stepper-view-showcase/stepper-view-showcase.component';
import { ButtonToggleShowcaseComponent } from '../components/button-toggle-showcase/button-toggle-showcase.component';
import { StickyButtonShowcaseComponent } from '../components/sticky-button-showcase/sticky-button-showcase.component';
import { TypographyShowcaseComponent } from '../components/typography-showcase/typography-showcase.component';
import { IconsShowcaseComponent } from '../components/icons-showcase/icons-showcase.component';

import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { ContextMenuModule } from '@progress/kendo-angular-menu';
import { EntitySearchShowcaseComponent } from '../components/entity-search-showcase/entity-search-showcase.component';
import { ModalContentSampleComponent } from '../components/modal-showcase/modal-content-sample/modal-content-sample.component';
import { SnackBarComponentShowcaseComponent } from '../components/snack-bar-showcase/snack-bar-showcase.component';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { PostSubmitErrorShowcaseComponent } from '../components/post-submit-error-showcase/post-submit-error-showcase.component';
import { PaginationShowcaseComponent } from '../components/pagination-showcase/pagination-showcase.component';
import { DataGridShowcaseComponent } from '../components/data-grid-showcase/data-grid-showcase.component';
import { SGTDateFormatShowcaseComponent } from '../components/sgtdate-format-showcase/sgtdate-format-showcase.component';
import { EmptyStateBoxShowcaseComponent } from '../components/empty-state-box-showcase/empty-state-box-showcase.component';
import { AuditTrailShowcaseComponent } from '../components/audit-trail-showcase/audit-trail-showcase.component';
import { IrasDateTimePickerShowcaseComponent } from '../components/date-time-picker-showcase/iras-date-time-picker-showcase.component';
import { MultiSelectDropdownShowcaseComponent } from '../components/multi-select-dropdown-showcase/multi-select-dropdown-showcase.component';
import { MultiSelectNestedDropdownShowcaseComponent } from '../components/multi-select-nested-dropdown-showcase/multi-select-nested-dropdown-showcase.component';
import { DialogPopupShowcaseComponent } from '../components/dialog-popup-showcase/dialog-popup-showcase.component';
import { LevelUnitInputLayoutComponent } from '../components/level-unit-input-showcase/level-unit-input-layout.component';
import { FileUploadShowcaseComponent } from '../components/file-upload-showcase/file-upload-showcase.component';
import { ErrorShowcaseComponent } from '../components/error-showcase/error-showcase.component';
import { MultiSnackBarComponentShowcaseComponent } from '../components/multi-snack-bar-showcase/multi-snack-bar-showcase.component';
import { NumericStepperShowcaseComponent } from '../components/numeric-stepper-showcase/numeric-stepper-showcase.component';
@NgModule({
  declarations: [
    MenuComponent,
    CheckboxInputShowcaseComponent,
    InputShowcaseComponent,
    RadioInputShowcaseComponent,
    MaskedInputShowcaseComponent,
    LevelUnitInputLayoutComponent,
    ModalShowcaseComponent,
    NonModalShowcaseComponent,
    ButtonShowcaseComponent,
    CardShowcaseComponent,
    ExpansionPanelShowcaseComponent,
    SpinnerShowcaseComponent,
    DatetimepickersShowcaseComponent,
    TitleShowcaseComponent,
    DropdownShowcaseComponent,
    AutocompleteDropdownShowcaseComponent,
    TabsShowcaseComponent,
    StepperViewShowcaseComponent,
    MultiSelectDropdownShowcaseComponent,
    MultiSelectNestedDropdownShowcaseComponent,
    ButtonToggleShowcaseComponent,
    StickyButtonShowcaseComponent,
    TypographyShowcaseComponent,
    IconsShowcaseComponent,
    EntitySearchShowcaseComponent,
    ModalContentSampleComponent,
    SnackBarComponentShowcaseComponent,
    MultiSnackBarComponentShowcaseComponent,
    PostSubmitErrorShowcaseComponent,
    PaginationShowcaseComponent,
    DataGridShowcaseComponent,
    SGTDateFormatShowcaseComponent,
    EmptyStateBoxShowcaseComponent,
    AuditTrailShowcaseComponent,
    IrasDateTimePickerShowcaseComponent,
    DialogPopupShowcaseComponent,
    FileUploadShowcaseComponent,
    ErrorShowcaseComponent,
    NumericStepperShowcaseComponent,
  ],
  imports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    MenuRoutingModule,
    CommonUiInternalLibraryModule,
    GridModule,
    ExcelModule,
    ContextMenuModule,
    DropDownListModule,
  ],
  exports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    MenuRoutingModule,
    CommonUiInternalLibraryModule,
    GridModule,
    ExcelModule,
    ContextMenuModule,
    LayoutModule,
    DropDownListModule,
    MenuComponent,
    CheckboxInputShowcaseComponent,
    InputShowcaseComponent,
    RadioInputShowcaseComponent,
    MaskedInputShowcaseComponent,
    LevelUnitInputLayoutComponent,
    ModalShowcaseComponent,
    NonModalShowcaseComponent,
    ButtonShowcaseComponent,
    CardShowcaseComponent,
    SpinnerShowcaseComponent,
    DatetimepickersShowcaseComponent,
    TitleShowcaseComponent,
    DropdownShowcaseComponent,
    AutocompleteDropdownShowcaseComponent,
    TabsShowcaseComponent,
    StepperViewShowcaseComponent,
    MultiSelectDropdownShowcaseComponent,
    MultiSelectNestedDropdownShowcaseComponent,
    ButtonToggleShowcaseComponent,
    StickyButtonShowcaseComponent,
    TypographyShowcaseComponent,
    IconsShowcaseComponent,
    EntitySearchShowcaseComponent,
    ModalContentSampleComponent,
    SnackBarComponentShowcaseComponent,
    MultiSnackBarComponentShowcaseComponent,
    PostSubmitErrorShowcaseComponent,
    PaginationShowcaseComponent,
    DataGridShowcaseComponent,
    SGTDateFormatShowcaseComponent,
    EmptyStateBoxShowcaseComponent,
    AuditTrailShowcaseComponent,
    IrasDateTimePickerShowcaseComponent,
    DialogPopupShowcaseComponent,
    FileUploadShowcaseComponent,
    ErrorShowcaseComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuModule {}
