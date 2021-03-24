import { TrackByFunction } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import {
  AddEvent,
  CancelEvent,
  CellClickEvent,
  CellCloseEvent,
  ColumnBase,
  ColumnComponent,
  ColumnMenuSettings,
  ColumnMenuTemplateDirective,
  ColumnReorderEvent,
  ColumnResizeArgs,
  ColumnVisibilityChangeEvent,
  ContentScrollEvent,
  DataStateChangeEvent,
  DetailCollapseEvent,
  DetailExpandEvent,
  DetailTemplateDirective,
  EditEvent,
  ExcelExportEvent,
  FilterableSettings,
  GridComponent,
  GridDataResult,
  GridItem,
  GroupableSettings,
  NoRecordsTemplateDirective,
  PageChangeEvent,
  PagerSettings,
  PagerTemplateDirective,
  RemoveEvent,
  RowClassArgs,
  RowClassFn,
  RowSelectedFn,
  SaveEvent,
  ScrollBottomEvent,
  ScrollMode,
  SelectableSettings,
  SelectionEvent,
  SortSettings,
  ToolbarTemplateDirective,
} from '@progress/kendo-angular-grid';
import {
  CompositeFilterDescriptor,
  FilterDescriptor,
  GroupDescriptor,
  GroupResult,
  SortDescriptor,
} from '@progress/kendo-data-query';
import { Override } from '../../helpers';
import { ButtonColorType, ButtonFillType } from '../button/button.model';
import { DropdownItem } from '../dropdowns/iras-dropdown/dropdown-item.model';
interface MenuTypeColumnConfig {
  menuItems: { text: string; onClick: (args: { dataItem: any }) => void }[];
}

interface RowSelectorTypeColumnConfig {
  showSelectAll: boolean;
}

export type CustomRowClassFn = (
  context: RowClassArgs
) => {
  [key: string]: boolean;
};
export enum FilterOperatorsEnum {
  equalTo = 'eq',
  notEqualTo = 'neq',
  startsWith = 'startswith',
  doesNotStartWith = 'doesnotstartwith',
  greaterThan = 'gt',
  greaterThanEqualTo = 'gte',
  lessThan = 'lt',
  lessThanEqualTo = 'lte',
  contains = 'contains',
  doesNotContain = 'doesnotcontain',
  endsWith = 'endswith',
  doesNotEndWith = 'doesnotendwith',
}

export interface FilterDetails {
  previousOperator?: string;
  showOperators: boolean;
  placeholder?: string;
  operators?: Array<{ text: string; value: string; selected?: boolean }>;
  showClearButton?: boolean;
}

export type IDataGridEditableColTypes = 'dropdown' | 'date' | 'text' | 'amount' | 'checkbox' | 'entity-search';

export type DataGridHeaderFilterTypes = 'dropdown' | 'date' | 'text' | 'amount' | 'checkbox';
export interface DataGridButtonConfig {
  text?: string;
  role?: 'delete';
  fill?: ButtonFillType;
  color?: ButtonColorType;
  getButtonColor?: (args?: { dataItem: any }) => ButtonColorType;
  getButtonFill?: (args?: { dataItem: any }) => ButtonFillType;
  getButtonDisabled?: (args?: { dataItem: any }) => boolean;
  getButtonText?: (args?: { dataItem: any }) => string;
  onClick?: (args?: { dataItem: any; currentGridState: DataGridState }) => void;
}

export interface ButtonsColumnConfig {
  buttons: Array<DataGridButtonConfig>;
}

export interface TextTypeColumnConfig {
  onClick?: (args?: { dataItem: any; clickedText?: string }) => void;
  textStyle?: 'link' | 'multiLink';
  inputPattern?: RegExp;
}

export interface BooleanTypeColumnConfig {
  displayType: 'checkbox' | 'icon';
  showSelectAll?: boolean;
}

export type IDataGridColumnTypes = 'buttons' | 'row_selector' | 'text' | 'menu' | 'boolean' | 'entity-search';
export type IDataGridCellContentFormattingTypes = 'date' | 'amount' | 'text' | 'checkbox' | 'icon';
export interface DataGridColumnsConfig {
  columnKey: string;
  columnTitle: string;
  filterType?: DataGridHeaderFilterTypes;
  filterDetails?: FilterDetails;
  columnWidth: number;
  locked: boolean;
  cellContentFormatting: IDataGridCellContentFormattingTypes;
  columnType: IDataGridColumnTypes;
  menuTypeColumnConfig?: MenuTypeColumnConfig;
  rowSelectorTypeColumnConfig?: RowSelectorTypeColumnConfig;
  booleanTypeColumnConfig?: BooleanTypeColumnConfig;
  buttonsTypeColumnConfig?: ButtonsColumnConfig;
  textTypeColumnConfig?: TextTypeColumnConfig;
  tooltip?: { content: string; position: string };
  hidden?: boolean;
  editable?: boolean;
  sortable?: boolean;
  resizable?: boolean;
  reorderable?: boolean;
  groupable?: boolean;
  filterable?: boolean;
  autoSize?: boolean;
  canExportToExcel?: boolean;
  viewState?: DataStateChangeEvent;
  allowNegative?: boolean;
}

export interface DataGridExportOptionsSettings {
  export: boolean;
  fileName: string;
  buttonText: string;
  /*
  if true, exports only filtered data, if false exports all data. Default is false. It exports all data. 
  */
  onlyFilteredData?: boolean;
  columnsOrder?: Array<string>;
}

export interface DataGridExportOptions {
  excel: DataGridExportOptionsSettings;
}

export interface IInputValidator {
  validator: ValidatorFn;
  errorMessage: string;
  errorIdentifier: string;
}
export interface DataGridEditableControlConfig {
  type: IDataGridEditableColTypes;
  dropdownParams?: { data: DropdownItem[]; placeholder: string; required: boolean };
  datePickerParams?: {
    selectedDate: Date;
    required: boolean;
    placeholder: string;
    minDate: Date;
    maxDate: Date;
  };
  inputValidators?: Array<IInputValidator>;
  entityIdSearchOptions?: {
    idList: Array<DropdownItem>;
    showValidationError: boolean;
    required?: boolean;
    errorMessages?: {
      idType: {
        required?: string;
        entityTypeErrorMessage?: string;
      };
      idInput: {
        required?: string;
      };
    };
  };
}

export interface DataGridEditableConfig {
  columnsInfo: { [key: string]: DataGridEditableControlConfig };
}

export interface DataGridRowEditEvent {
  currentState: DataGridState;
  selectedRowsUniqueId: Array<string>;
  editDetails: { columnKey: string; previousValue: DataGridRowItem; currentValue: DataGridRowItem };
  gridIsDirty: boolean;
}
export interface DataGridSelectionChangeEvent {
  currentState: DataGridState;
  selectAll: boolean;
  selectedRowsUniqueId: Array<string>;
}
export interface DataGridBooleanColumnSelectAllStateChangeEvent {
  currentState: DataGridState;
  selectAll: boolean;
  columnKey: string;
}

export interface DataGridRowDeleteEvent {
  deletedRows: Array<DataGridRowItem>;
  selectedRowsUniqueId: Array<string>;
  currentState: DataGridState;
}
export interface DataGridRowCreateEvent {
  createdRow: Array<DataGridRowItem>;
  selectedRowsUniqueId: Array<string>;
  currentState: DataGridState;
}

export interface GroupedColumnsConfig {
  mainHeader: string;
  autoSize?: boolean;
  locked?: boolean;
  reorderable?: boolean;
  resizable?: boolean;
  groups: Array<{ columnKey: string }>;
}

export interface DataGridRowItem {
  rowUniqueId: string;
  editable: boolean;
  [key: string]: any;
}

export interface IGridBottomFooterButtonClickParams {
  addEmptyRecordToGrid: () => void;
}

export type IGridBottomFooterButton = Override<
  DataGridButtonConfig,
  {
    onClick: (args?: IGridBottomFooterButtonClickParams) => void;
    iconName: string;
  }
>;

export interface IGridCustomMessages {
  noRecords: string;
}

interface DataGridState {
  data?: Array<DataGridRowItem>;
  /**
   * Defines the page size used by the Grid pager
   */
  pageSize?: number;
  /**
   * Defines the height (in pixels) that is used when the `scrollable` option of the Grid is set.
   */
  height?: number;
  /**
   * Defines the row height that is used when the `scrollable` option of the Grid is set to `virtual`.
   * Required by the [virtual scrolling functionality]({% slug scrollmmodes_grid %}).
   */
  rowHeight?: number;
  scrollable?: ScrollMode;

  /**
   * If set to `true`, the grid will render only the columns in the current viewport.
   */
  virtualColumns?: boolean;

  /**
   * Enables the [filtering]({% slug filtering_grid %}) of the Grid columns that have their `field` option set.
   */
  filterable?: FilterableSettings;
  /**
   * Enables the [sorting]({% slug sorting_grid %}) of the Grid columns that have their `field` option set.
   */
  sortable?: SortSettings;
  /**
   * Configures the pager of the Grid ([see example]({% slug paging_grid %})).
   *
   * The available options are:
   * - `buttonCount?:Number`&mdash;Sets the maximum numeric buttons count before the buttons are collapsed.
   * - `info?:Boolean`&mdash;Toggles the information about the current page and the total number of records.
   * - `type?:PagerType`&mdash;Accepts the `numeric` (buttons with numbers) and `input` (input for typing the page number) values.
   * - `pageSizes?:Boolean` or `Array<number>`&mdash;Shows a menu for selecting the page size.
   * - `previousNext?:Boolean`&mdash;Toggles the **Previous** and **Next** buttons.
   */
  pageable?: PagerSettings | boolean;

  /**
   * If set to `true`, the user can group the Grid by dragging the column header cells.
   * By default, grouping is disabled ([see example]({% slug groupingbasics_grid %})).
   */
  groupable?: GroupableSettings | boolean;
  /**
   * If set to `true`, the user can use dedicated shortcuts to interact with the Grid.
   * By default, navigation is disabled and the Grid content is accessible in the normal tab sequence.
   */
  navigable?: boolean;

  /**
   * Indicates whether the Grid columns will be resized during initialization so that
   * they fit their headers and row content. Defaults to `false`.
   * Columns with `autoSize` set to `false` are excluded.
   * To dynamically update the column width to match the new content,
   * refer to [this example]({% slug resizing_columns_grid %}).
   */
  autoSize?: boolean;
  resizable?: boolean;
  reorderable?: boolean;
  /**
   * Specifies if the loading indicator of the Grid will be displayed ([see example]({% slug databinding_grid %})).
   *
   * false by default
   */
  loading?: boolean;
  bottomToolbarOptions?: {
    buttons: Array<IGridBottomFooterButton>;
  };
  showPageCountMessageOnTop: boolean;
  viewState?: DataStateChangeEvent;
  /**
   * Specifies if the header of the grid will be hidden. The header is visible by default.
   *
   * > The header includes column headers and the [filter row]({% slug filtering_grid %}#toc-filter-row).
   */
  hideHeader?: boolean;
  lockedHeader?: any;
  columnsConfig: DataGridColumnsConfig[];

  exportOptions?: DataGridExportOptions;
  editOptions?: DataGridEditableConfig;
  columnGroupingOptions?: Array<{ columnKey: string } | GroupedColumnsConfig>;
  rowClassFn?: CustomRowClassFn;
  rowSelectedFn?: RowSelectedFn;
  customMessages?: IGridCustomMessages;
}

export interface GridFilterValChangeEvent {
  columnKey: string;
  filters: Array<FilterDescriptor>;
}

export {
  AddEvent,
  CancelEvent,
  CellClickEvent,
  CellCloseEvent,
  ColumnBase,
  ColumnMenuSettings,
  ColumnMenuTemplateDirective,
  ColumnReorderEvent,
  ColumnResizeArgs,
  ColumnVisibilityChangeEvent,
  ContentScrollEvent,
  DataStateChangeEvent,
  DetailCollapseEvent,
  DetailExpandEvent,
  DetailTemplateDirective,
  EditEvent,
  ExcelExportEvent,
  FilterableSettings,
  GridDataResult,
  GridItem,
  GroupableSettings,
  NoRecordsTemplateDirective,
  PageChangeEvent,
  PagerSettings,
  PagerTemplateDirective,
  RemoveEvent,
  RowClassFn,
  RowSelectedFn,
  SaveEvent,
  ScrollBottomEvent,
  ScrollMode,
  SelectableSettings,
  SelectionEvent,
  SortSettings,
  ToolbarTemplateDirective,
  CompositeFilterDescriptor,
  GroupDescriptor,
  GroupResult,
  SortDescriptor,
  TrackByFunction,
  RowClassArgs,
  GridComponent,
  DataGridState,
  ColumnComponent,
};
