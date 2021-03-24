import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ColumnComponent, ColumnGroupComponent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, process } from '@progress/kendo-data-query';
import { BehaviorSubject } from 'rxjs';
import { filter, pairwise, startWith, take } from 'rxjs/operators';
import { cloneArray, jsonCloneUsingStringify } from '../../helpers';
import { SubscriptionObserver } from '../../helpers/subscription-observer.util';
import { CheckboxOption } from '../checkbox/checkbox.module';
import { getThousandSeparatedAmount } from '../input/amount-input/amount-input.util';
import { ExportDataCreator, findColumnConfig } from './data-grid-export-data-creator.util';
import {
  DataGridBooleanColumnSelectAllStateChangeEvent,
  DataGridButtonConfig,
  DataGridColumnsConfig,
  DataGridEditableControlConfig,
  DataGridRowCreateEvent,
  DataGridRowDeleteEvent,
  DataGridRowEditEvent,
  DataGridRowItem,
  DataGridSelectionChangeEvent,
  DataGridState,
  DataStateChangeEvent,
  ExcelExportEvent,
  FilterOperatorsEnum,
  GridComponent,
  GridFilterValChangeEvent,
  IDataGridColumnTypes,
  IGridBottomFooterButtonClickParams,
  IGridCustomMessages,
  RowClassArgs,
  SortDescriptor,
  GroupedColumnsConfig,
} from './data-grid-state.model';

const distinct = (list: any[], type: string) => {
  let data = list.map((x) => {
    return x[type];
  });
  data = [...new Set(data)];
  return data.map((item) => {
    const obj = {};
    obj[`text`] = item;
    obj[type] = item;
    return obj;
  });
};

@Component({
  selector: 'iras-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() gridStateStream = new BehaviorSubject<DataGridState>(null);
  @ViewChild('gridElement', { static: false }) gridElement: GridComponent;
  @Output() rowDeleted: EventEmitter<DataGridRowDeleteEvent> = new EventEmitter();
  @Output() rowCreated: EventEmitter<DataGridRowCreateEvent> = new EventEmitter();
  @Output() rowEdited: EventEmitter<DataGridRowEditEvent> = new EventEmitter();
  @Output() rowsSelectorSelectionChanged: EventEmitter<DataGridSelectionChangeEvent> = new EventEmitter();
  @Output()
  booleanColumnSelectAllStateChanged: EventEmitter<DataGridBooleanColumnSelectAllStateChangeEvent> = new EventEmitter();
  formsData: any = [];
  appliedFiltersTracker: Array<GridFilterValChangeEvent> = [];
  activeFiltersToApply: CompositeFilterDescriptor;
  subscriptionTracker = new SubscriptionObserver();
  formValueObserver = new SubscriptionObserver();
  gridFiltersConfigMap = {};
  formGroupList: { [key: string]: FormGroup } = {};
  stateSnapshot: DataGridState;
  groupedColumnsInfo: Array<DataGridColumnsConfig | { mainHeader: string; groups: Array<DataGridColumnsConfig> }> = [];
  rowSelectionTracker = {} as { [key: string]: [CheckboxOption] };
  rowSelectorSelectAllOptionTracker: [CheckboxOption] = [{ buttonTheme: 'primary', label: '', selected: false }];
  booleanColumnsSelectAllTracker: { [key: string]: [CheckboxOption] } = {};
  booleanColumnsValuesTracker: {
    [key: string]: {
      [key: string]: [CheckboxOption];
    };
  } = {};
  rowCountInfo = {} as { totalRows: number; startNumber: number; endNumber: number };
  sortTracker: { [key: string]: SortDescriptor } = {};
  firstTimeLoad = true;
  freshFilter: any;
  private afterViewInitCalled = new BehaviorSubject<boolean>(false);
  private gridElementPresenceTracker = new BehaviorSubject<boolean>(false);
  constructor(private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const elementFinderInterval = setInterval(() => {
        if (this.gridElement?.columns) {
          this.gridElementPresenceTracker.next(true);
          clearInterval(elementFinderInterval);
        }
      }, 30);
    });
    this.subscriptionTracker.observe(this.gridStateStream.pipe(filter((state) => !!state)), (state) => {
      this.stateSnapshot = state;
      this.stateSnapshot.viewState = this.stateSnapshot.viewState || ({} as DataStateChangeEvent);
      // for backward compatibility set pageSize to take property in viewState
      this.stateSnapshot.viewState.take = this.stateSnapshot.viewState?.take || this.stateSnapshot.pageSize;
      this.stateSnapshot.viewState.skip = this.stateSnapshot.viewState?.skip || 0;

      // set default messages
      this.stateSnapshot.customMessages = this.stateSnapshot.customMessages || ({} as IGridCustomMessages);
      if (this.stateSnapshot.customMessages) {
        this.stateSnapshot.customMessages.noRecords =
          this.stateSnapshot.customMessages.noRecords || 'No records available.';
      }

      // set boolean valued rows tracker
      const booleanColumnsWithCheckboxDisplayType = this.getBooleanColumnsWithDisplayTypeCheckbox();

      for (const columnKey of booleanColumnsWithCheckboxDisplayType) {
        this.booleanColumnsValuesTracker[columnKey] = {};
        const stateForColumn = this.booleanColumnsSelectAllTracker[columnKey] || [
          { label: '', selected: false, buttonTheme: 'primary' },
        ];
        this.booleanColumnsSelectAllTracker[columnKey] = stateForColumn;
      }

      for (const column of this.stateSnapshot.columnsConfig) {
        // for booleanColumnsWithCheckboxDisplayType set them to editable. so that editable column below can send value in form group
        if (booleanColumnsWithCheckboxDisplayType.indexOf(column.columnKey) !== -1) {
          column.editable = true;
        }

        // make multiLink column non-editable.
        if (column?.textTypeColumnConfig?.textStyle === 'multiLink') {
          column.editable = false;
        }
      }
      // set for row_selector column
      for (const d of this.stateSnapshot.data) {
        this.rowSelectionTracker[d.rowUniqueId] = [{ label: '', selected: false, buttonTheme: 'primary' }];
        for (const key of booleanColumnsWithCheckboxDisplayType) {
          this.booleanColumnsValuesTracker[key][d.rowUniqueId] = [
            { label: '', selected: d[key] === true, buttonTheme: 'primary' },
          ];
        }
      }

      // map columns from columngroup setttings to a sequence of columns
      if (this.stateSnapshot.columnGroupingOptions) {
        const findItem = ({ columnKey }: { columnKey: string }) => {
          return this.stateSnapshot.columnsConfig.find((col) => col.columnKey === columnKey);
        };
        const groupings = cloneArray({ arr: this.stateSnapshot.columnGroupingOptions });
        for (const [headerIndex, headerColumn] of Object.entries(groupings) as [number, any]) {
          if ('columnKey' in headerColumn) {
            groupings[headerIndex] = findItem({ columnKey: headerColumn.columnKey });
          } else {
            for (const [subHeaderIndex, subHeaderColumn] of Object.entries(headerColumn.groups) as [number, any]) {
              groupings[headerIndex].groups[subHeaderIndex] = findItem({ columnKey: subHeaderColumn.columnKey });
            }
          }
        }

        this.groupedColumnsInfo = groupings;
      }

      this.configureFilter();
      this.onDataStateChange(this.stateSnapshot.viewState);
    });
  }

  getBooleanColumnsWithDisplayTypeCheckbox() {
    return this.stateSnapshot.columnsConfig
      .filter((cc) => cc.columnType === 'boolean' && cc.booleanTypeColumnConfig.displayType === 'checkbox')
      .map((cc) => cc.columnKey);
  }
  forceRefreshGrid() {
    this.stateSnapshot.data = cloneArray({ arr: this.stateSnapshot.data });
    this.cdr.detectChanges();
  }

  configureFilter() {
    if (!this.stateSnapshot.filterable) {
      return;
    }
    this.stateSnapshot.columnsConfig.forEach((label: { columnKey: string }) => {
      this.gridFiltersConfigMap[label.columnKey] = distinct(this.stateSnapshot.data, label.columnKey);
    });
  }

  async configureEditable() {
    this.formValueObserver.removeSubscriptions();
    const dataBoundColumnKeys = this.getDataBoundKeys();
    const nonHiddenEditableColumnKeys = this.stateSnapshot.columnsConfig
      .filter((cc) => dataBoundColumnKeys.indexOf(cc.columnKey) !== -1 && !cc.hidden && cc.editable)
      .map((cc) => cc.columnKey);
    const processedData = process(this.stateSnapshot.data, this.stateSnapshot.viewState);
    await this.afterViewInitCalled
      .pipe(
        filter((val) => val === true),
        take(1)
      )
      .toPromise();
    this.formGroupList = {};
    this.cdr.detectChanges();
    for (const [index, rowItem] of Object.entries(processedData.data)) {
      const formGroup = {};
      // for all editable rows create form group
      const editableColumnsEntries = Object.entries(rowItem).filter(
        ([key, value]: [string, DataGridRowItem]) => nonHiddenEditableColumnKeys.indexOf(key) !== -1
      );
      for (const [columnKey, columnValue] of editableColumnsEntries) {
        const editableColumnInfo = this.stateSnapshot.editOptions.columnsInfo[columnKey];
        const formControlIdentifier = columnKey;
        if (!('type' in (editableColumnInfo || {}))) {
          throw new Error(
            `Since you have editable=true for column ${columnKey},you must also set editOptions for this field`
          );
        }
        if (editableColumnInfo.type === 'dropdown') {
          formGroup[formControlIdentifier] = new FormControl(
            editableColumnInfo.dropdownParams.data.find((d) => d.text === columnValue)?.key,
            editableColumnInfo?.inputValidators?.map((v) => v.validator) || []
          );
        } else if (editableColumnInfo.type === 'entity-search') {
          const [entitySearchId, entitySearchType] = ((columnValue || '') as string).split(',');

          formGroup[formControlIdentifier] = this.formBuilder.group({
            idInput: new FormControl(entitySearchId),
            idType: new FormControl(entitySearchType),
          });
        } else {
          formGroup[formControlIdentifier] = new FormControl(
            columnValue,
            editableColumnInfo?.inputValidators?.map((v) => v.validator) || []
          );
        }
      }

      const keysInDataExcludingNonHiddenEditableColumnKeys = Object.keys(rowItem).filter(
        (k) => nonHiddenEditableColumnKeys.indexOf(k) === -1
      );

      // this is to add all keys that are hidden but editable. All columns that are boolean value and have displayType option set as 'checkbox' must also set column to be editable.
      for (const keyToAdd of keysInDataExcludingNonHiddenEditableColumnKeys) {
        formGroup[keyToAdd] = rowItem[keyToAdd];
      }
      this.formGroupList[rowItem.rowUniqueId] = this.formBuilder.group(formGroup);

      const gridItemRowIndex = this.rowCountInfo.startNumber - 1 + +index;
      if (rowItem.editable === true) {
        this.gridElement.editRow(gridItemRowIndex, this.formGroupList[rowItem.rowUniqueId]);
      } else {
        this.gridElement.closeRow(gridItemRowIndex);
      }

      this.formValueObserver.observe(
        this.formGroupList[rowItem.rowUniqueId].valueChanges.pipe(
          startWith(this.formGroupList[rowItem.rowUniqueId].value as any),
          pairwise(),
          filter(([previous, current]) => JSON.stringify(previous) !== JSON.stringify(current))
        ),
        ([previousValue, currentValue]: [DataGridRowItem, DataGridRowItem]) => {
          this.emitEditEvent({
            value: { currentValue, previousValue },
            editableColumnKeys: nonHiddenEditableColumnKeys,
            rowUniqueId: rowItem.rowUniqueId,
            columnKey: null,
          });
        }
      );
    }
    this.cdr.detectChanges();
  }

  getChangedProp(currentValue, previousValue): string {
    let properties = Object.keys(currentValue);
    let changedPropertyName = null;

    for (const prop of properties) {
      if (JSON.stringify(previousValue[prop]) !== JSON.stringify(currentValue[prop])) {
        changedPropertyName = prop;
        break;
      }
    }
    return changedPropertyName;
  }

  ngAfterViewInit(): void {
    this.afterViewInitCalled.next(true);
    this.configureStaticFunctions();
    this.rowHoverFunction();
  }

  onPageChange(event: PageChangeEvent): void {
    this.rowHoverFunction();
  }

  emitEditEvent({
    value,
    editableColumnKeys,
    rowUniqueId,
    columnKey,
  }: {
    value: { currentValue: DataGridRowItem; previousValue: DataGridRowItem };
    editableColumnKeys: Array<string>;
    rowUniqueId: string;
    columnKey: string;
  }) {
    const { previousValue, currentValue } = value;

    const dropdownColumnsEditOption = Object.entries(this.stateSnapshot?.editOptions?.columnsInfo || []).filter(
      ([secKey, secValue]: [string, DataGridEditableControlConfig]) =>
        secValue.type === 'dropdown' && editableColumnKeys.indexOf(secKey) !== -1
    );

    for (const entry of dropdownColumnsEditOption) {
      currentValue[entry[0]] = entry[1].dropdownParams.data.find((d) => d.key === currentValue[entry[0]])?.text;
    }

    const entitySearchEditOptions = Object.entries(this.stateSnapshot?.editOptions?.columnsInfo || []).filter(
      ([secKey, secValue]: [string, DataGridEditableControlConfig]) =>
        secValue.type === 'entity-search' && editableColumnKeys.indexOf(secKey) !== -1
    );

    for (const entry of entitySearchEditOptions) {
      currentValue[entry[0]] = [currentValue[entry[0]].idInput?.toUpperCase().trim(), currentValue[entry[0]].idType]
        .join(',')
        .trim();
    }

    const rowIndex = this.stateSnapshot.data.findIndex((d) => d.rowUniqueId === rowUniqueId);
    this.stateSnapshot.data[rowIndex] = Object.assign({}, { ...currentValue });
    this.rowEdited.emit({
      selectedRowsUniqueId: this.getSelectRowsUniqueId(),
      currentState: this.stateSnapshot,
      editDetails: {
        previousValue,
        currentValue,
        columnKey: this.getChangedProp(currentValue, previousValue),
      },
      gridIsDirty: this.checkGridEditState(rowUniqueId),
    });

    this.cdr.detectChanges();
  }

  checkGridEditState(rowUniqueId) {
    let status = this.formGroupList[rowUniqueId].status;
    return status.toUpperCase() === 'VALID' ? false : true;
  }

  rowHoverFunction() {
    const toggleClass = ({
      action,
      itemIndex,
      element,
    }: {
      action: 'add' | 'remove';
      itemIndex: string;
      element: any;
    }) => {
      try {
        if (element.closest('.k-grid-content')) {
          document
            .querySelector(`.k-grid-content-locked tr[data-kendo-grid-item-index="${itemIndex}"]`)
            .classList[action]('grid-row-hover-active');
        } else {
          document
            .querySelector(`.k-grid-content tr[data-kendo-grid-item-index="${itemIndex}"]`)
            .classList[action]('grid-row-hover-active');
        }
        return true;
      } catch (error) {}
    };
    setTimeout(() => {
      const rows = document.querySelectorAll('.k-grid .k-grid-container tr[class*="row-number-"]');
      for (const row of Array.from(rows || [])) {
        const itemIndex = row.getAttribute('data-kendo-grid-item-index');
        row.addEventListener('mouseenter', () => toggleClass({ element: row, action: 'add', itemIndex }));
        row.addEventListener('mouseleave', () => toggleClass({ element: row, action: 'remove', itemIndex }));
      }
    }, 1000);
  }

  configureStaticFunctions() {
    this.gridElementPresenceTracker
      .pipe(
        filter((v) => v === true),
        take(1)
      )
      .subscribe((_) => {
        if (this.stateSnapshot.rowClassFn) {
          this.gridElement.rowClass = (context: RowClassArgs): { [key: string]: boolean } => {
            return {
              [`row-number-${context.dataItem.rowUniqueId}`]: true,
              ...this.stateSnapshot.rowClassFn(context),
            };
          };
        }

        if (this.stateSnapshot.rowSelectedFn) {
          this.gridElement.rowSelected = this.stateSnapshot.rowSelectedFn;
        }
        this.cdr.detectChanges();
      });
  }

  trackByFn(index: number, item: any) {
    return item.rowUniqueId;
  }

  ngOnDestroy(): void {
    this.subscriptionTracker.removeSubscriptions();
    this.formValueObserver.removeSubscriptions();
  }

  saveAsExcel(): void {
    this.gridElement.saveAsExcel();
  }

  onViewOnlyCellClick({ columnInfo, dataItem }: { columnInfo: DataGridColumnsConfig; dataItem: any }): void {
    if (columnInfo.columnType === 'text' && columnInfo.textTypeColumnConfig?.textStyle === 'link') {
      columnInfo.textTypeColumnConfig?.onClick({ dataItem });
    }
  }

  onButtonClicked({ dataItem, button }: { dataItem: any; button: DataGridButtonConfig }) {
    if (button?.role === 'delete') {
      this.formValueObserver.removeSubscriptions(); // to prevent edit trigger
      const itemIndex = this.stateSnapshot.data.findIndex((d) => d.rowUniqueId === dataItem.rowUniqueId);
      const deletedRows = this.stateSnapshot.data.splice(itemIndex, 1);
      this.gridStateStream.next(this.stateSnapshot);
      this.rowDeleted.emit({
        currentState: this.stateSnapshot,
        deletedRows,
        selectedRowsUniqueId: this.getSelectRowsUniqueId(),
      });
    }
    if (button.onClick) {
      button.onClick({ dataItem, currentGridState: this.stateSnapshot });
    }
  }

  getDataBoundKeys() {
    return this.stateSnapshot.columnsConfig
      .filter(
        (cc) => (['text', 'boolean', 'entity-search'] as Array<IDataGridColumnTypes>).indexOf(cc.columnType) !== -1
      )
      .map((cc) => cc.columnKey);
  }

  addEmptyRecord() {
    const dataBoundColumnKeys = this.getDataBoundKeys();
    let newRow: any = {};
    for (const key of dataBoundColumnKeys) {
      newRow[key] = '';
    }
    const numberOfNewRows = this.stateSnapshot.data.filter((d) => d.rowUniqueId.includes('newRow'))?.length || 0;
    newRow = { ...newRow, rowUniqueId: `newRow_${numberOfNewRows + 1}`, editable: true };
    this.stateSnapshot.data.splice(this.gridElement.pageSize - 1, 0, newRow);
    this.gridStateStream.next(this.stateSnapshot);
    setTimeout(() => {
      this.gridElement.scrollTo({
        row: this.gridElement.pageSize - 1,
        column: 1,
      });
    }, 200);
  }

  onSortChange(sorts: SortDescriptor[]) {
    for (const sort of sorts) {
      this.sortTracker[sort.field] = sort;
    }
  }

  getSelectRowsUniqueId() {
    return Object.entries(this.rowSelectionTracker)
      .filter(([key, entry]: [string, [CheckboxOption]]) => entry[0].selected)
      .map(([key, entry]: [string, [CheckboxOption]]) => key);
  }

  onRowSelectorColumnSelectionChange({
    checkboxState,
    rowItem,
  }: {
    checkboxState: CheckboxOption[];
    rowItem: DataGridRowItem;
  }) {
    const rowNotChecked = Object.values(this.rowSelectionTracker).find((s) => !s[0].selected);
    this.rowSelectorSelectAllOptionTracker[0].selected = !rowNotChecked;

    this.emitRowsSelectionChangeEvent();
  }

  toggleSelectAllOptionForRowSelector({ checkboxState }: { checkboxState: [CheckboxOption] }) {
    const selectAll = checkboxState[0].selected;
    for (const item of Object.values(this.rowSelectionTracker)) {
      item[0].selected = selectAll ? true : false;
    }
    this.emitRowsSelectionChangeEvent();
  }

  emitRowsSelectionChangeEvent() {
    const selectedRowsUniqueId = this.getSelectRowsUniqueId();
    this.rowsSelectorSelectionChanged.emit({
      currentState: this.stateSnapshot,
      selectAll: Object.entries(this.rowSelectionTracker).length === selectedRowsUniqueId.length,
      selectedRowsUniqueId,
    });
  }

  toggleStateForBooleanSelectAllTracker({
    columnKey,
    checkboxState,
  }: {
    columnKey: string;
    checkboxState: [CheckboxOption];
  }) {
    const selectAll = checkboxState[0].selected ? true : false;
    for (const item of Object.values(this.booleanColumnsValuesTracker[columnKey])) {
      item[0].selected = selectAll;
    }

    this.booleanColumnsSelectAllTracker[columnKey] = checkboxState;

    for (const rowItem of this.stateSnapshot.data) {
      rowItem[columnKey] = selectAll;
    }
    this.gridStateStream.next(this.stateSnapshot);

    this.booleanColumnSelectAllStateChanged.emit({
      selectAll,
      currentState: this.stateSnapshot,
      columnKey,
    });
  }

  onBooleanColumnSelectionChange({
    checkboxState,
    rowItem,
    columnKey,
  }: {
    checkboxState: CheckboxOption[];
    rowItem: DataGridRowItem;
    columnKey: string;
  }) {
    const rowNotChecked = Object.values(this.booleanColumnsValuesTracker[columnKey]).find((s) => !s[0].selected);
    this.booleanColumnsSelectAllTracker[columnKey][0].selected = !rowNotChecked;
    this.patchValueForBooleanColumn({ columnKey, columnValue: checkboxState[0].selected, rowItem });
  }

  patchValueForBooleanColumn({
    columnKey,
    columnValue,
    rowItem,
  }: {
    columnKey: string;
    columnValue: boolean;
    rowItem: DataGridRowItem;
  }) {
    this.formGroupList[rowItem.rowUniqueId].controls[columnKey].patchValue(columnValue);
  }

  async onDataStateChange(viewState: DataStateChangeEvent) {
    this.stateSnapshot.viewState = viewState || ({} as DataStateChangeEvent);
    this.rowCountInfo = this.getRowCountInfo();
    this.cdr.detectChanges();
    if (this.stateSnapshot.editOptions?.columnsInfo) {
      await this.configureEditable();
      this.forceRefreshGrid();
      return;
    }
    this.forceRefreshGrid();
  }

  getAmount(val: string) {
    return getThousandSeparatedAmount(val);
  }

  getMultiLink(val: string) {
    return (val || '').split(',');
  }

  trackLinkFunction(
    { dataItem, columnKey }: { dataItem: DataGridRowItem; columnKey: string },
    index: number,
    item: string
  ) {
    return dataItem.rowUniqueId + columnKey;
  }

  onMultiLinkClick({
    columnInfo,
    dataItem,
    clickedText,
    event,
  }: {
    columnInfo: DataGridColumnsConfig;
    dataItem: any;
    clickedText: string;
    event: any;
  }): void {
    event.stopPropagation();
    columnInfo.textTypeColumnConfig?.onClick({ dataItem, clickedText });
  }

  getRowCountInfo() {
    const filterState = (this.stateSnapshot.viewState || {}) as DataStateChangeEvent;
    const processedData = process(this.stateSnapshot.data, filterState);
    const pageStartAnchorPoint = filterState.skip || 0;
    const pageEndAnchorPoint =
      pageStartAnchorPoint + (filterState.take || this.stateSnapshot.pageSize) || this.stateSnapshot.data.length;
    return {
      totalRows: processedData.total,
      startNumber: processedData.total > 0 ? pageStartAnchorPoint + 1 : 0,
      endNumber: pageEndAnchorPoint > processedData.total ? processedData.total : pageEndAnchorPoint,
    };
  }

  onToolTipClick(event: any) {
    event.stopPropagation();
  }

  print(...args: any) {
    console.log(...args);
  }

  onExcelExport(event: ExcelExportEvent) {
    const filterState = jsonCloneUsingStringify(
      this.stateSnapshot.exportOptions.excel.onlyFilteredData ? this.stateSnapshot.viewState || {} : {}
    );
    (filterState as any).skip = 0;
    (filterState as any).take = this.stateSnapshot.data.length;

    let orderIndexes = [];

    for (const column of this.gridElement.columns) {
      if (column instanceof ColumnGroupComponent) {
        const reorderedColumns = column.children
          .map((c: any) => ({ key: c.field, orderIndex: c.orderIndex }))
          .sort((a, b) => a.orderIndex - b.orderIndex);
        const groupedColumnInfo = this.stateSnapshot.columnGroupingOptions.find(
          (c: any) => c.groups?.length && c.mainHeader === column.title
        ) as GroupedColumnsConfig;

        const newOrder: Array<{ columnKey: string }> = [];
        for (const rc of reorderedColumns) {
          newOrder.push({ columnKey: rc.key });
          orderIndexes.push({ key: rc.key, orderIndex: column.orderIndex });
        }
        groupedColumnInfo.groups = newOrder;
      } else if (column instanceof ColumnComponent && column.field) {
        orderIndexes.push({ key: column.field, orderIndex: column.orderIndex });
      }
    }

    orderIndexes = orderIndexes.sort((a, b) => a.orderIndex - b.orderIndex);

    const itemsForExportInSequence = orderIndexes.map((column) => ({
      ...findColumnConfig({ columnKey: column.key, gridState: this.stateSnapshot }),
      locked: column.locked,
    }));

    // find columns exclusive
    const itemsNotForExport = this.stateSnapshot.columnsConfig.filter(
      (c) => itemsForExportInSequence.findIndex((cc) => cc.columnKey === c.columnKey) === -1
    );

    const data = process(this.stateSnapshot.data, filterState).data;
    const settings = ExportDataCreator.create({
      gridState: { ...this.stateSnapshot, columnsConfig: [...itemsForExportInSequence, ...itemsNotForExport], data },
    });

    // Freeze the locked columns in excel.

    const lockedColumnTitles: Array<string> = new Array<string>();
    this.gridElement.columns.forEach((x) => {
      if (x.isLocked) lockedColumnTitles.push(x.title);
    });

    settings.freezePane.colSplit =
      this.stateSnapshot.columnsConfig.filter(
        (x) => lockedColumnTitles.includes(x.columnTitle) && x.canExportToExcel === true && x.hidden !== true
      ).length +
      this.stateSnapshot.columnsConfig.filter((x) => x.canExportToExcel === true && x.hidden === true).length;

    event.workbook.sheets[0] = settings;
  }

  getEditableInputType({ columnInfo }: { columnInfo: DataGridColumnsConfig }) {
    if (columnInfo.cellContentFormatting === 'amount') {
      return 'amount';
    } else if (columnInfo.textTypeColumnConfig && columnInfo.textTypeColumnConfig.inputPattern) {
      return 'custom';
    }
    return 'text';
  }

  gridFilterValChange(event: GridFilterValChangeEvent) {
    const index = this.appliedFiltersTracker.findIndex((fl) => fl.columnKey === event.columnKey);
    if (index === -1) {
      this.appliedFiltersTracker.push(event);
    } else {
      this.appliedFiltersTracker[index].filters = event.filters;
    }
    // for all filters applied filter out values from grid

    const amountColumns = this.stateSnapshot.columnsConfig
      .filter((cc) => cc.cellContentFormatting === 'amount')
      .map((m) => m.columnKey);

    const allFilters = [];

    for (const af of jsonCloneUsingStringify(this.appliedFiltersTracker)
      .map((fl: { filters: any }) => fl.filters)
      .reduce((acc: string | any[], val: any) => acc.concat(val), [])
      .filter((f: { value: { toString: () => any } }) => !!f.value?.toString())) {
      const tempFilter = af;
      if (amountColumns.indexOf(af.field as string) >= 0) {
        tempFilter.operatorStrName = af.operator;
        tempFilter.operator = this.getOperatorFunctionForAmountFilter({
          operator: af.operator,
          queryString: af.value,
        }) as (v: string) => boolean;
      }

      allFilters.push(tempFilter);
    }

    this.activeFiltersToApply = {
      logic: 'and',
      filters: allFilters,
    };

    this.stateSnapshot.viewState = {
      ...(this.stateSnapshot.viewState || {}),
      filter: this.activeFiltersToApply,
    } as DataStateChangeEvent;
    this.cdr.detectChanges();
  }

  footerButtonOnClick(onClick: (args?: IGridBottomFooterButtonClickParams) => void) {
    return onClick({
      addEmptyRecordToGrid: this.addEmptyRecord.bind(this),
    });
  }

  getOperatorFunctionForAmountFilter({
    operator,
    queryString,
  }: {
    operator: string;
    queryString: string;
  }): (value: string) => boolean {
    queryString = (queryString || '').toString();
    if (operator === FilterOperatorsEnum.contains) {
      return (value: string) => (+(value || '').toString()).toFixed(2).indexOf(queryString) >= 0;
    } else if (operator === FilterOperatorsEnum.doesNotContain) {
      return (value: string) => (+(value || '').toString()).toFixed(2).indexOf(queryString) === -1;
    } else if (operator === FilterOperatorsEnum.startsWith) {
      return (value: string) => (+(value || '').toString()).toFixed(2).startsWith(queryString);
    } else if (operator === FilterOperatorsEnum.doesNotStartWith) {
      return (value: string) => !(+(value || '').toString()).toFixed(2).startsWith(queryString);
    } else if (operator === FilterOperatorsEnum.endsWith) {
      return (value: string) => (+(value || '').toString()).toFixed(2).endsWith(queryString);
    } else if (operator === FilterOperatorsEnum.doesNotEndWith) {
      return (value: string) => !(+(value || '').toString()).toFixed(2).endsWith(queryString);
    } else if (operator === FilterOperatorsEnum.equalTo) {
      return (value: string) => (+(value || '').toString()).toFixed(2) === queryString;
    } else if (operator === FilterOperatorsEnum.notEqualTo) {
      return (value: string) => (+(value || '').toString()).toFixed(2) !== queryString;
    } else if (operator === FilterOperatorsEnum.lessThan) {
      return (value: string) => +(+(value || '').toString()).toFixed(2) < +queryString;
    } else if (operator === FilterOperatorsEnum.lessThanEqualTo) {
      return (value: string) => +(+(value || '').toString()).toFixed(2) <= +queryString;
    } else if (operator === FilterOperatorsEnum.greaterThan) {
      return (value: string) => +(+(value || '').toString()).toFixed(2) > +queryString;
    } else if (operator === FilterOperatorsEnum.greaterThanEqualTo) {
      return (value: string) => +(+(value || '').toString()).toFixed(2) >= +queryString;
    }
  }
}
