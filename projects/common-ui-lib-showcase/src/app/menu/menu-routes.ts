import { ButtonShowcaseComponent } from '../components/button-showcase/button-showcase.component';
import { ButtonToggleShowcaseComponent } from '../components/button-toggle-showcase/button-toggle-showcase.component';
import { CardShowcaseComponent } from '../components/card-showcase/card-showcase.component';
import { CheckboxInputShowcaseComponent } from '../components/checkbox-input-showcase/checkbox-input-showcase.component';
import { DataGridShowcaseComponent } from '../components/data-grid-showcase/data-grid-showcase.component';
import { DatetimepickersShowcaseComponent } from '../components/datepickers-showcase/datetimepickers-showcase.component';
import { DropdownShowcaseComponent } from '../components/dropdown-showcase/dropdown-showcase.component';
import { AutocompleteDropdownShowcaseComponent } from '../components/autocomplete-dropdown-showcase/autocomplete-dropdown-showcase.component';
import { EmptyStateBoxShowcaseComponent } from '../components/empty-state-box-showcase/empty-state-box-showcase.component';
import { EntitySearchShowcaseComponent } from '../components/entity-search-showcase/entity-search-showcase.component';
import { ExpansionPanelShowcaseComponent } from '../components/expansion-panel-showcase/expansion-panel-showcase.component';
import { IconsShowcaseComponent } from '../components/icons-showcase/icons-showcase.component';
import { InputShowcaseComponent } from '../components/input-showcase/input-showcase.component';
import { MaskedInputShowcaseComponent } from '../components/masked-input-showcase/masked-input-showcase.component';
import { ModalShowcaseComponent } from '../components/modal-showcase/modal-showcase.component';
import { NonModalShowcaseComponent } from '../components/non-modal-showcase/non-modal-showcase.component';
import { PaginationShowcaseComponent } from '../components/pagination-showcase/pagination-showcase.component';
import { PostSubmitErrorShowcaseComponent } from '../components/post-submit-error-showcase/post-submit-error-showcase.component';
import { RadioInputShowcaseComponent } from '../components/radio-input-showcase/radio-input-showcase.component';
import { SGTDateFormatShowcaseComponent } from '../components/sgtdate-format-showcase/sgtdate-format-showcase.component';
import { SnackBarComponentShowcaseComponent } from '../components/snack-bar-showcase/snack-bar-showcase.component';
import { SpinnerShowcaseComponent } from '../components/spinner-showcase/spinner-showcase.component';
import { StepperViewShowcaseComponent } from '../components/stepper-view-showcase/stepper-view-showcase.component';
import { StickyButtonShowcaseComponent } from '../components/sticky-button-showcase/sticky-button-showcase.component';
import { TabsShowcaseComponent } from '../components/tabs-showcase/tabs-showcase.component';
import { TitleShowcaseComponent } from '../components/title-showcase/title-showcase.component';
import { TypographyShowcaseComponent } from '../components/typography-showcase/typography-showcase.component';
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

const sortedRoutes = [
  { path: 'icons', component: IconsShowcaseComponent },
  { path: 'input', component: InputShowcaseComponent },
  { path: 'masked-input', component: MaskedInputShowcaseComponent },
  { path: 'level-unit-input', component: LevelUnitInputLayoutComponent },
  { path: 'radio', component: RadioInputShowcaseComponent },
  { path: 'checkbox', component: CheckboxInputShowcaseComponent },
  { path: 'button', component: ButtonShowcaseComponent },
  { path: 'button-toggle', component: ButtonToggleShowcaseComponent },
  { path: 'titles', component: TitleShowcaseComponent },
  { path: 'card', component: CardShowcaseComponent },
  { path: 'modal', component: ModalShowcaseComponent },
  { path: 'non-modal', component: NonModalShowcaseComponent },
  { path: 'datepickers', component: DatetimepickersShowcaseComponent },
  { path: 'dropdowns', component: DropdownShowcaseComponent },
  { path: 'dialog-popups', component: DialogPopupShowcaseComponent },
  { path: 'autocomplete-dropdown', component: AutocompleteDropdownShowcaseComponent },
  { path: 'multi-select-dropdown', component: MultiSelectDropdownShowcaseComponent },
  { path: 'multi-select-nested-dropdown', component: MultiSelectNestedDropdownShowcaseComponent },
  { path: 'data-grid-example', component: DataGridShowcaseComponent },
  { path: 'entity-search', component: EntitySearchShowcaseComponent },
  { path: 'expansion-panel', component: ExpansionPanelShowcaseComponent },
  { path: 'post-submit-error', component: PostSubmitErrorShowcaseComponent },
  { path: 'snack-bar', component: SnackBarComponentShowcaseComponent },
  { path: 'multi-snack-bar', component: MultiSnackBarComponentShowcaseComponent },
  { path: 'stepper', component: StepperViewShowcaseComponent },
  { path: 'spinner', component: SpinnerShowcaseComponent },
  { path: 'sticky-button', component: StickyButtonShowcaseComponent },
  { path: 'tabs', component: TabsShowcaseComponent },
  { path: 'typography', component: TypographyShowcaseComponent },
  { path: 'pagination', component: PaginationShowcaseComponent },
  { path: 'empty-state-box', component: EmptyStateBoxShowcaseComponent },
  { path: 'audit-trail', component: AuditTrailShowcaseComponent },
  { path: 'error', component: ErrorShowcaseComponent },
  {
    path: 'sgt-date-format-experiment',
    component: SGTDateFormatShowcaseComponent,
  },
  { path: 'datetime-picker', component: IrasDateTimePickerShowcaseComponent },
  { path: 'file-upload', component: FileUploadShowcaseComponent },
  { path: 'numeric-stepper', component: NumericStepperShowcaseComponent },
].sort((a, b) => (a.path > b.path ? 1 : -1));

sortedRoutes.push({ path: '**', component: InputShowcaseComponent });
export const MENU_ROUTES_CHILDREN = sortedRoutes;
