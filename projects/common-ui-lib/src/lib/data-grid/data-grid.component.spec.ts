import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { GRID_TEST_DATA_1 } from '../../../../common-ui-lib-showcase/src/app/components/data-grid-showcase/data-grid-test-data-for-spec-file';
import { jsonCloneUsingStringify } from '../../helpers';
import { regexInputPattern } from '../../public-api';
import { findColumnConfig } from './data-grid-export-data-creator.util';
import { DataGridComponent } from './data-grid.component';
import { FilterOperatorsEnum, IrasDataGridModule } from './data-grid.module';
describe('DataGridComponent', () => {
  let component: DataGridComponent;
  let fixture: ComponentFixture<DataGridComponent>;
  let debugElement: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IrasDataGridModule],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(DataGridComponent);
          component = fixture.componentInstance;
          debugElement = fixture.debugElement;
        });
    })
  );
  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('check checkGridEditState', () => {
    const form = new FormGroup({
      status: new FormControl('INVALID'),
    });
    component.formGroupList = { rowNumber1: form };
    component.checkGridEditState('rowNumber1');
    expect(component).toBeTruthy();
  });

  it('should put data inside kendo-grid', fakeAsync(() => {
    component.gridStateStream.next(GRID_TEST_DATA_1);
    tick();
    expect(component.stateSnapshot).toBeTruthy();
  }));

  it('configureFilter function should return if no filterable present', fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1, filterable: false });
    tick();
    expect(component.stateSnapshot).toBeTruthy();
  }));

  it('getEditableInputType() should return custom', () => {
    const colConfig = findColumnConfig({ gridState: GRID_TEST_DATA_1, columnKey: 'entityId' });
    colConfig.textTypeColumnConfig.inputPattern = regexInputPattern.numericPattern;
    const inputType = component.getEditableInputType({ columnInfo: colConfig });

    expect(inputType).toEqual('custom');
  });
  it('getEditableInputType() should return text', () => {
    const colConfig = findColumnConfig({ gridState: GRID_TEST_DATA_1, columnKey: 'entityId' });
    colConfig.textTypeColumnConfig.inputPattern = null;
    const inputType = component.getEditableInputType({ columnInfo: colConfig });

    expect(inputType).toEqual('text');
  });
  it('getEditableInputType() should return amount', () => {
    const colConfig = findColumnConfig({ gridState: GRID_TEST_DATA_1, columnKey: 'payment' });
    colConfig.cellContentFormatting = 'amount';
    const inputType = component.getEditableInputType({ columnInfo: colConfig });

    expect(inputType).toEqual('amount');
  });
  it('getEditableInputType() should return amount', () => {
    const colConfig = findColumnConfig({ gridState: GRID_TEST_DATA_1, columnKey: 'payment' });
    colConfig.cellContentFormatting = 'amount';
    const inputType = component.getEditableInputType({ columnInfo: colConfig });

    expect(inputType).toEqual('amount');
  });

  it('#gridTest_checkbox_edit_event - columnType boolean should emit edit event when checkbox clicked', fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1, filterable: true });
    tick(200);
    spyOn(component.rowEdited, 'emit');
    spyOn(component.booleanColumnSelectAllStateChanged, 'emit');

    const allCheckboxElement = debugElement.queryAll(By.css('iras-checkbox'));

    allCheckboxElement[0].nativeElement.shadowRoot.querySelector('input.iras-checkbox__input').click();
    fixture.detectChanges();
    tick(400);
    expect(component.booleanColumnSelectAllStateChanged.emit).toHaveBeenCalled();
    allCheckboxElement[1].nativeElement.shadowRoot.querySelector('input.iras-checkbox__input').click();
    fixture.detectChanges();
    tick(400);
    expect(component.rowEdited.emit).toHaveBeenCalled();
  }));

  it('#activeFiltersToApply should change when gridFilterValChangeEvent is fired with value 0', fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1, filterable: true });
    tick(200);
    component.gridFilterValChange({
      columnKey: 'payableAmount',
      filters: [
        {
          field: 'payableAmount',
          operator: 'startswith',
          value: '0',
        },
      ],
    });

    const expectedState = {
      logic: 'and',
      filters: [
        {
          field: 'payableAmount',
          value: '0',
          operatorStrName: 'startswith',
        },
      ],
    };
    expect(jsonCloneUsingStringify(component.activeFiltersToApply)).toEqual(expectedState);

    const expectedViewState = {
      filter: {
        logic: 'and',
        filters: [
          {
            field: 'payableAmount',
            value: '0',
            operatorStrName: 'startswith',
          },
        ],
      },
      group: [],
      skip: 0,
      sort: [],
      take: 10,
    };
    expect(jsonCloneUsingStringify(component.stateSnapshot.viewState)).toEqual(expectedViewState);
  }));

  it('#gridFilterValChangeEvent should receive amount input with -0.', fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1, filterable: true });
    tick(200);
    spyOn(component, 'gridFilterValChange');

    const amountInput = fixture.debugElement
      .query(By.css('iras-data-grid-filter iras-amount-input[type="gridAmountFilter"]'))
      .nativeElement.shadowRoot.querySelector('.input__field');

    amountInput.value = '-0.';
    amountInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(400);
    expect(component.gridFilterValChange).toHaveBeenCalledWith({
      columnKey: 'payableAmount',
      filters: [
        {
          field: 'payableAmount',
          operator: 'startswith',
          value: '-0.',
        },
      ],
    });
  }));

  it('#component.groupedColumnsInfo.length should be 0 when no columnGrouping option is passed', fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1, columnGroupingOptions: null });
    fixture.detectChanges();
    tick();

    expect(component.groupedColumnsInfo.length).toEqual(0);
  }));

  it(`#addRecord button should add new row`, fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(200);
    fixture.detectChanges();
    const previousLength = component.stateSnapshot.data.length;
    const toolBarButton = fixture.debugElement.nativeElement.querySelectorAll('.data-grid__footer-toolbar-button')[0];
    toolBarButton.dispatchEvent(new Event('click'));
    tick(200);
    fixture.detectChanges();
    expect(component.stateSnapshot.data.length).toEqual(previousLength + 1);
  }));

  it('#getOperatorFunctionForAmountFilter Should work properly', () => {
    let value = '-12400147180.01';
    let strToSearch = '12';
    // check if value contains strToSearch
    let operator = FilterOperatorsEnum.contains;
    let operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeTrue();

    // check if value doesNotContain strToSearch
    operator = FilterOperatorsEnum.doesNotContain;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeFalse();

    // check if value startsWith strToSearch
    operator = FilterOperatorsEnum.startsWith;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeFalse();

    // check if value doesNotStartWith strToSearch
    operator = FilterOperatorsEnum.doesNotStartWith;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeTrue();

    // check if value endsWith strToSearch
    operator = FilterOperatorsEnum.endsWith;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeFalse();

    // check if value doesNotEndWith strToSearch
    operator = FilterOperatorsEnum.doesNotEndWith;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeTrue();

    // check if value equalTo strToSearch
    operator = FilterOperatorsEnum.equalTo;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeFalse();

    // check if value notEqualTo strToSearch
    operator = FilterOperatorsEnum.notEqualTo;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeTrue();

    // check if value lessThan strToSearch
    operator = FilterOperatorsEnum.lessThan;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeTrue();

    // check if value lessThanEqualTo strToSearch
    operator = FilterOperatorsEnum.lessThanEqualTo;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeTrue();

    // check if value greaterThan strToSearch
    operator = FilterOperatorsEnum.greaterThan;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeFalse();

    // check if value greaterThanEqualTo strToSearch
    operator = FilterOperatorsEnum.greaterThanEqualTo;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeFalse();

    value = '';
    strToSearch = '12';
    // check if value contains strToSearch
    operator = FilterOperatorsEnum.contains;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeFalse();

    // check if value doesNotContain strToSearch
    operator = FilterOperatorsEnum.doesNotContain;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeTrue();

    // check if value startsWith strToSearch
    operator = FilterOperatorsEnum.startsWith;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeFalse();

    // check if value doesNotStartWith strToSearch
    operator = FilterOperatorsEnum.doesNotStartWith;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeTrue();

    // check if value endsWith strToSearch
    operator = FilterOperatorsEnum.endsWith;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeFalse();

    // check if value doesNotEndWith strToSearch
    operator = FilterOperatorsEnum.doesNotEndWith;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeTrue();

    // check if value equalTo strToSearch
    operator = FilterOperatorsEnum.equalTo;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeFalse();

    // check if value notEqualTo strToSearch
    operator = FilterOperatorsEnum.notEqualTo;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeTrue();

    // check if value lessThan strToSearch
    operator = FilterOperatorsEnum.lessThan;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeTrue();

    // check if value lessThanEqualTo strToSearch
    operator = FilterOperatorsEnum.lessThanEqualTo;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeTrue();

    // check if value greaterThan strToSearch
    operator = FilterOperatorsEnum.greaterThan;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeFalse();

    // check if value greaterThanEqualTo strToSearch
    operator = FilterOperatorsEnum.greaterThanEqualTo;
    operatorFunction = component.getOperatorFunctionForAmountFilter({ operator, queryString: strToSearch });
    expect(operatorFunction(value)).toBeFalse();
  });

  it(`#pageNavigation button click should emit page change emit`, fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(200);
    fixture.detectChanges();
    spyOn(component.gridElement.pageChange, 'emit');

    const nextButton = fixture.debugElement.query(By.css('a[title="Go to the next page"]')).nativeElement;
    nextButton.dispatchEvent(new Event('click'));
    tick(100);
    fixture.detectChanges();
    expect(component.gridElement.pageChange.emit).toHaveBeenCalled();
  }));

  it(`#rowHoverFunction should have been called`, fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(200);
    fixture.detectChanges();
    spyOn(component, 'rowHoverFunction');
    component.onPageChange({} as any);
    expect(component.rowHoverFunction).toHaveBeenCalled();
  }));

  it(`#saveAsExcel function should be called on buttonClick`, fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(200);
    fixture.detectChanges();
    const exportToExcelButtonClickSpy = spyOn(component, 'saveAsExcel');
    const exportToExcelButtonClick = fixture.debugElement.nativeElement.querySelector(
      '.data-grid__export-to-excel-button'
    );
    exportToExcelButtonClick.dispatchEvent(new Event('click'));
    expect(exportToExcelButtonClickSpy).toHaveBeenCalled();
  }));

  it(`#saveAsExcel method for kendo-grid should be called on button click`, fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(200);
    fixture.detectChanges();
    spyOn(component.gridElement, 'saveAsExcel');
    const exportToExcelButtonClick = fixture.debugElement.nativeElement.querySelector(
      '.data-grid__export-to-excel-button'
    );
    exportToExcelButtonClick.dispatchEvent(new Event('click'));
    tick(50);
    fixture.detectChanges();
    expect(component.gridElement.saveAsExcel).toHaveBeenCalled();
  }));

  it(`#exportToExcel method should be called when excel export button is clicked`, fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(200);
    fixture.detectChanges();
    spyOn(component, 'onExcelExport');
    const exportToExcelButtonClick = fixture.debugElement.nativeElement.querySelector(
      '.data-grid__export-to-excel-button'
    );
    exportToExcelButtonClick.dispatchEvent(new Event('click'));
    tick(50);
    fixture.detectChanges();
    expect(component.onExcelExport).toHaveBeenCalled();
  }));

  it(`#onViewOnlyCellClick function should be called`, fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(200);
    fixture.detectChanges();

    spyOn(component, 'onViewOnlyCellClick');
    const cellItem = fixture.debugElement.query(
      By.css('.data-grid__column-cell--data.data-grid__column-cell--amount div:first-child')
    ).nativeElement;
    cellItem.dispatchEvent(new Event('click'));
    tick(50);
    fixture.detectChanges();
    expect(component.onViewOnlyCellClick).toHaveBeenCalled();
  }));

  it(`#onViewOnlyCellClick should work properly for columnType text and textStyle link`, fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(200);
    fixture.detectChanges();

    expect(
      component.onViewOnlyCellClick({
        columnInfo: {
          columnKey: 'entityId',
          columnTitle: 'Entity ID',
          filterable: true,
          filterType: 'text',
          filterDetails: {
            showOperators: true,
            operators: [
              {
                text: 'Is Equal To',
                value: 'eq',
              },
              {
                text: 'Is Not Equal To',
                value: 'neq',
              },
              {
                text: 'Contains',
                value: 'contains',
              },
              {
                text: 'Does not contain',
                value: 'doesnotcontain',
              },
              {
                text: 'Starts With',
                value: 'startswith',
                selected: true,
              },
              {
                text: 'Does Not Starts With',
                value: 'doesnotstartwith',
              },
              {
                text: 'Ends With',
                value: 'endswith',
              },
              {
                text: 'Does Not Ends With',
                value: 'doesnotendwith',
              },
            ],
            showClearButton: true,
          },
          columnWidth: 155,
          locked: false,
          columnType: 'text',
          editable: true,
          textTypeColumnConfig: {
            onClick: ({ dataItem }) => {
              console.log('entityId clicked', { dataItem });
            },
            textStyle: 'link',
            inputPattern: regexInputPattern.numericPattern,
          },
          cellContentFormatting: 'text',
          tooltip: {
            content: 'This is entity id',
            position: 'above',
          },
          sortable: true,
          groupable: true,
          canExportToExcel: true,
        },
        dataItem: {
          rowUniqueId: 'rowNumber1',
          editable: false,
          entityId: '2020010322113',
          type: 'DRN',
          suppressionType: 'Agent appointment',
          suppressionLevel: 'Entity',
          taxType: 'Stamp Duty',
          suppressionDate: '2020-01-11',
          releaseDate: '2020-01-12',
          status: 'Not Active',
          payableAmount: 0.1,
          payment: 0.1,
          lastModifiedBy: 'INL9GAG',
          caseSettled: false,
          paidOnTime: false,
        },
      })
    ).toBeFalsy();
  }));

  it(`#onViewOnlyCellClick should work properly for columnType text and textStyle multiLink`, fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(200);
    fixture.detectChanges();

    expect(
      component.onMultiLinkClick({
        columnInfo: {
          columnKey: 'entityId',
          columnTitle: 'Entity ID',
          filterable: true,
          filterType: 'text',
          filterDetails: {
            showOperators: true,
            operators: [
              {
                text: 'Is Equal To',
                value: 'eq',
              },
              {
                text: 'Is Not Equal To',
                value: 'neq',
              },
              {
                text: 'Contains',
                value: 'contains',
              },
              {
                text: 'Does not contain',
                value: 'doesnotcontain',
              },
              {
                text: 'Starts With',
                value: 'startswith',
                selected: true,
              },
              {
                text: 'Does Not Starts With',
                value: 'doesnotstartwith',
              },
              {
                text: 'Ends With',
                value: 'endswith',
              },
              {
                text: 'Does Not Ends With',
                value: 'doesnotendwith',
              },
            ],
            showClearButton: true,
          },
          columnWidth: 155,
          locked: false,
          columnType: 'text',
          editable: true,
          textTypeColumnConfig: {
            onClick: ({ dataItem }) => {
              console.log('entityId clicked', { dataItem });
            },
            textStyle: 'multiLink',
            inputPattern: regexInputPattern.numericPattern,
          },
          cellContentFormatting: 'text',
          tooltip: {
            content: 'This is entity id',
            position: 'above',
          },
          sortable: true,
          groupable: true,
          canExportToExcel: true,
        },
        dataItem: {
          rowUniqueId: 'rowNumber1',
          editable: false,
          entityId: '2020010322113,2020010328684',
          type: 'DRN',
          suppressionType: 'Agent appointment',
          suppressionLevel: 'Entity',
          taxType: 'Stamp Duty',
          suppressionDate: '2020-01-11',
          releaseDate: '2020-01-12',
          status: 'Not Active',
          payableAmount: 0.1,
          payment: 0.1,
          lastModifiedBy: 'INL9GAG',
          caseSettled: false,
          paidOnTime: false,
        },
        clickedText: '2020010322113',
        event: new Event('onMultiLinkClick'),
      })
    ).toBeFalsy();
  }));

  it('getMultiLink should work', fakeAsync(() => {
    const value = '1234567,12345678';
    const res = component.getMultiLink(value);
    expect(res.length).toEqual(2);
  }));

  it('trackLinkFunction should work', fakeAsync(() => {
    const res = component.trackLinkFunction(
      {
        dataItem: {
          rowUniqueId: 'rowNumber1',
          editable: false,
          entityId: '2020010322113',
          type: 'DRN',
          suppressionType: 'Agent appointment',
          suppressionLevel: 'Entity',
          taxType: 'Stamp Duty',
          suppressionDate: '2020-01-11',
          releaseDate: '2020-01-12',
          status: 'Not Active',
          payableAmount: 0.1,
          payment: 0.1,
          lastModifiedBy: 'INL9GAG',
          caseSettled: false,
          paidOnTime: false,
        },
        columnKey: 'entityId',
      },
      0,
      '2020010322113'
    );
    expect(res).toEqual('rowNumber1entityId');
  }));

  it('getAmount should work', fakeAsync(() => {
    const value = '100';
    const res = component.getAmount(value);
    expect(res).toEqual('100.00');
  }));

  it(`#gridFilterValChange should replace previous filter when for amount filter when changed`, fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(50);
    fixture.detectChanges();

    const amountFilterElement = fixture.debugElement
      .query(By.css('iras-data-grid-filter iras-amount-input[type="gridAmountFilter"]'))
      .nativeElement.shadowRoot.querySelector('.input__field');
    amountFilterElement.value = '0.01';
    amountFilterElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(300);

    amountFilterElement.value = '0.10';
    amountFilterElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();
    const index = component.appliedFiltersTracker.findIndex((fl) => fl.columnKey === 'payableAmount');
    expect(component.appliedFiltersTracker[index].filters.length).toEqual(1);
  }));

  it(`custom no records available message should show.`, fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(50);
    fixture.detectChanges();

    const amountFilterElement = fixture.debugElement
      .query(By.css('iras-data-grid-filter iras-amount-input[type="gridAmountFilter"]'))
      .nativeElement.shadowRoot.querySelector('.input__field');
    amountFilterElement.value = '1090992';
    amountFilterElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(300);

    const noRecordMessage = (Array.from(fixture.debugElement.nativeElement.querySelectorAll('.k-grid-norecords')).find(
      (f) => !!(f as HTMLElement).innerText
    ) as HTMLElement)?.innerText;

    expect(noRecordMessage).toEqual(component.stateSnapshot.customMessages.noRecords);
  }));

  it('#onButtonClicked should be called when delete is clicked', fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(50);
    fixture.detectChanges();
    const currentDataLength = component.stateSnapshot.data.length;
    component.onButtonClicked({
      dataItem: {
        rowUniqueId: 'rowNumber0',
        editable: false,
        entityId: '2020010322112',
        type: 'DRN',
        suppressionType: 'Imposition of penalty',
        suppressionLevel: 'Entity',
        taxType: 'Stamp Duty',
        suppressionDate: '2020-04-10',
        releaseDate: '2020-04-11',
        status: 'Active',
        payment: 0,
        lastModifiedBy: 'INL9GAG',
        payableAmount: 0,
        caseSettled: true,
        paidOnTime: true,
      },
      button: {
        text: 'Delete',
        role: 'delete',
      },
    });

    fixture.detectChanges();
    tick(200);

    expect(component.stateSnapshot.data.length).toEqual(currentDataLength - 1);
  }));

  it('#onSortChange should work', fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(50);
    fixture.detectChanges();
    component.onSortChange([
      {
        dir: 'asc',
        field: 'payment',
      },
    ]);
    expect(component.sortTracker).toEqual({
      payment: {
        dir: 'asc',
        field: 'payment',
      },
    });
  }));
  it('#onRowSelectorColumnSelectionChange should work', fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(50);
    fixture.detectChanges();
    component.onRowSelectorColumnSelectionChange({
      checkboxState: [
        {
          label: '',
          selected: true,
          buttonTheme: 'primary',
        },
      ],
      rowItem: {
        rowUniqueId: 'rowNumber0',
        editable: true,
        entityId: '2020010322112',
        type: 'DRN',
        suppressionType: 'Imposition of penalty',
        suppressionLevel: 'Entity',
        taxType: 'Stamp Duty',
        suppressionDate: '2020-04-10',
        releaseDate: '2020-04-11',
        status: 'Active',
        payment: 500001.87,
        lastModifiedBy: 'INL9GAG',
        payableAmount: 500001.87,
      },
    });
    expect(component.rowSelectorSelectAllOptionTracker).toEqual([
      {
        buttonTheme: 'primary',
        label: '',
        selected: false,
      },
    ]);
  }));

  it('toggleSelectAllOptionForRowSelector should work', fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(50);
    fixture.detectChanges();
    component.toggleSelectAllOptionForRowSelector({
      checkboxState: [
        {
          buttonTheme: 'primary',
          label: '',
          selected: true,
        },
      ],
    });

    expect(component.rowSelectionTracker).toEqual({
      rowNumber0: [
        {
          label: '',
          selected: true,
          buttonTheme: 'primary',
        },
      ],
      rowNumber1: [
        {
          label: '',
          selected: true,
          buttonTheme: 'primary',
        },
      ],
      rowNumber2: [
        {
          label: '',
          selected: true,
          buttonTheme: 'primary',
        },
      ],
      rowNumber3: [
        {
          label: '',
          selected: true,
          buttonTheme: 'primary',
        },
      ],
      rowNumber4: [
        {
          label: '',
          selected: true,
          buttonTheme: 'primary',
        },
      ],
      rowNumber5: [
        {
          label: '',
          selected: true,
          buttonTheme: 'primary',
        },
      ],
      rowNumber6: [
        {
          label: '',
          selected: true,
          buttonTheme: 'primary',
        },
      ],
      rowNumber7: [
        {
          label: '',
          selected: true,
          buttonTheme: 'primary',
        },
      ],
      rowNumber8: [
        {
          label: '',
          selected: true,
          buttonTheme: 'primary',
        },
      ],
      rowNumber9: [
        {
          label: '',
          selected: true,
          buttonTheme: 'primary',
        },
      ],
      rowNumber10: [
        {
          label: '',
          selected: true,
          buttonTheme: 'primary',
        },
      ],
      rowNumber11: [
        {
          label: '',
          selected: true,
          buttonTheme: 'primary',
        },
      ],
      rowNumber12: [
        {
          label: '',
          selected: true,
          buttonTheme: 'primary',
        },
      ],
      rowNumber13: [
        {
          label: '',
          selected: true,
          buttonTheme: 'primary',
        },
      ],

      rowNumber14: [{ label: '', selected: true, buttonTheme: 'primary' }],
      rowNumber15: [{ label: '', selected: true, buttonTheme: 'primary' }],
      rowNumber16: [{ label: '', selected: true, buttonTheme: 'primary' }],
      rowNumber17: [{ label: '', selected: true, buttonTheme: 'primary' }],
      rowNumber18: [{ label: '', selected: true, buttonTheme: 'primary' }],
    });
  }));

  it('onToolTipClick should work', fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(50);
    fixture.detectChanges();

    const res = component.onToolTipClick(new Event('click'));
    expect(res).toBeFalsy();
  }));
  it('onExcelExport should work', fakeAsync(() => {
    component.gridStateStream.next({ ...GRID_TEST_DATA_1 });
    tick(50);
    fixture.detectChanges();
    const res = component.onExcelExport({
      prevented: false,
      workbook: {
        sheets: [
          {
            columns: [
              {
                width: 155,
                autoWidth: false,
              },
              {
                width: 155,
                autoWidth: false,
              },
              {
                width: 155,
                autoWidth: false,
              },
              {
                width: 155,
                autoWidth: false,
              },
              {
                width: 215,
                autoWidth: false,
              },
              {
                width: 215,
                autoWidth: false,
              },
              {
                width: 160,
                autoWidth: false,
              },
              {
                width: 250,
                autoWidth: false,
              },
              {
                width: 155,
                autoWidth: false,
              },
            ],
            rows: [
              {
                type: 'header',
                cells: [
                  {
                    background: '#7a7a7a',
                    color: '#fff',
                    value: 'Entity ID',
                    colSpan: 1,
                    firstCell: true,
                    rowSpan: 1,
                  },
                  {
                    background: '#7a7a7a',
                    color: '#fff',
                    value: 'Type',
                    colSpan: 1,
                    firstCell: false,
                    rowSpan: 1,
                  },
                  {
                    background: '#7a7a7a',
                    color: '#fff',
                    value: 'Last Modified By',
                    colSpan: 1,
                    firstCell: false,
                    rowSpan: 1,
                  },
                  {
                    background: '#7a7a7a',
                    color: '#fff',
                    value: 'Status',
                    colSpan: 1,
                    firstCell: false,
                    rowSpan: 1,
                  },
                  {
                    background: '#7a7a7a',
                    color: '#fff',
                    value: 'Suppression Date',
                    colSpan: 1,
                    firstCell: false,
                    rowSpan: 1,
                  },
                  {
                    background: '#7a7a7a',
                    color: '#fff',
                    value: 'Release Date',
                    colSpan: 1,
                    firstCell: false,
                    rowSpan: 1,
                  },
                  {
                    background: '#7a7a7a',
                    color: '#fff',
                    value: 'Suppression Level',
                    colSpan: 1,
                    firstCell: false,
                    rowSpan: 1,
                  },
                  {
                    background: '#7a7a7a',
                    color: '#fff',
                    value: 'Suppression Type',
                    colSpan: 1,
                    firstCell: false,
                    rowSpan: 1,
                  },
                  {
                    background: '#7a7a7a',
                    color: '#fff',
                    value: 'Tax Type',
                    colSpan: 1,
                    firstCell: false,
                    rowSpan: 1,
                  },
                ],
              },
              {
                type: 'data',
                cells: [
                  {
                    value: '2020010322112',
                  },
                  {
                    value: 'DRN',
                  },
                  {
                    value: 'INL9GAG',
                  },
                  {
                    value: 'Active',
                  },
                  {
                    value: '2020-04-10',
                  },
                  {
                    value: '2020-04-11',
                  },
                  {
                    value: 'Entity',
                  },
                  {
                    value: 'Imposition of penalty',
                  },
                  {
                    value: 'Stamp Duty',
                  },
                ],
                level: null,
              },
              {
                type: 'data',
                cells: [
                  {
                    value: '2020010322113',
                  },
                  {
                    value: 'DRN',
                  },
                  {
                    value: 'INL9GAG',
                  },
                  {
                    value: 'Not Active',
                  },
                  {
                    value: '2020-01-11',
                  },
                  {
                    value: '2020-01-12',
                  },
                  {
                    value: 'Entity',
                  },
                  {
                    value: 'Agent appointment',
                  },
                  {
                    value: 'Stamp Duty',
                  },
                ],
                level: null,
              },
              {
                type: 'data',
                cells: [
                  {
                    value: '2020010322122',
                  },
                  {
                    value: 'DRN',
                  },
                  {
                    value: 'INL9GAG',
                  },
                  {
                    value: 'Not Active',
                  },
                  {
                    value: '2020-02-11',
                  },
                  {
                    value: '2020-02-12',
                  },
                  {
                    value: 'Entity',
                  },
                  {
                    value: 'Imposition of penalty',
                  },
                  {
                    value: 'Stamp Duty',
                  },
                ],
                level: null,
              },
              {
                type: 'data',
                cells: [
                  {
                    value: '2020010322142',
                  },
                  {
                    value: 'DRN',
                  },
                  {
                    value: 'INL9GAG',
                  },
                  {
                    value: 'Not Active',
                  },
                  {
                    value: '2020-02-15',
                  },
                  {
                    value: '2020-02-17',
                  },
                  {
                    value: 'Entity',
                  },
                  {
                    value: 'Imposition of penalty',
                  },
                  {
                    value: 'Stamp Duty',
                  },
                ],
                level: null,
              },
              {
                type: 'data',
                cells: [
                  {
                    value: '2020010312345',
                  },
                  {
                    value: 'DRN',
                  },
                  {
                    value: 'INL9GAG',
                  },
                  {
                    value: 'Active',
                  },
                  {
                    value: '2020-02-20',
                  },
                  {
                    value: '2020-02-25',
                  },
                  {
                    value: 'Entity',
                  },
                  {
                    value: 'Imposition of penalty',
                  },
                  {
                    value: 'Stamp Duty',
                  },
                ],
                level: null,
              },
              {
                type: 'data',
                cells: [
                  {
                    value: '2020010322110',
                  },
                  {
                    value: 'DRN',
                  },
                  {
                    value: 'INLG8HB',
                  },
                  {
                    value: 'Active',
                  },
                  {
                    value: '2020-01-11',
                  },
                  {
                    value: '2020-01-12',
                  },
                  {
                    value: 'Entity',
                  },
                  {
                    value: 'Imposition of penalty',
                  },
                  {
                    value: 'Stamp Duty',
                  },
                ],
                level: null,
              },
              {
                type: 'data',
                cells: [
                  {
                    value: '2020010322118',
                  },
                  {
                    value: 'DRN',
                  },
                  {
                    value: 'INL4CHN',
                  },
                  {
                    value: 'Active',
                  },
                  {
                    value: '2020-01-11',
                  },
                  {
                    value: '2020-01-12',
                  },
                  {
                    value: 'Entity',
                  },
                  {
                    value: 'Imposition of penalty',
                  },
                  {
                    value: 'Stamp Duty',
                  },
                ],
                level: null,
              },
              {
                type: 'data',
                cells: [
                  {
                    value: '2020010322112',
                  },
                  {
                    value: 'DRN',
                  },
                  {
                    value: 'INL9GAG',
                  },
                  {
                    value: 'Active',
                  },
                  {
                    value: '2020-01-11',
                  },
                  {
                    value: '2020-01-12',
                  },
                  {
                    value: 'Entity',
                  },
                  {
                    value: 'Imposition of penalty',
                  },
                  {
                    value: 'Stamp Duty',
                  },
                ],
                level: null,
              },
              {
                type: 'data',
                cells: [
                  {
                    value: '2020010322113',
                  },
                  {
                    value: 'DRN',
                  },
                  {
                    value: 'INL9GAG',
                  },
                  {
                    value: 'Active',
                  },
                  {
                    value: '2020-01-11',
                  },
                  {
                    value: '2020-01-12',
                  },
                  {
                    value: 'Entity',
                  },
                  {
                    value: 'Agent appointment',
                  },
                  {
                    value: 'Stamp Duty',
                  },
                ],
                level: null,
              },
              {
                type: 'data',
                cells: [
                  {
                    value: '2020010322122',
                  },
                  {
                    value: 'DRN',
                  },
                  {
                    value: 'INL9GAG',
                  },
                  {
                    value: 'Active',
                  },
                  {
                    value: '2020-01-11',
                  },
                  {
                    value: '2020-01-12',
                  },
                  {
                    value: 'Entity',
                  },
                  {
                    value: 'Imposition of penalty',
                  },
                  {
                    value: 'Stamp Duty',
                  },
                ],
                level: null,
              },
            ],
            freezePane: {
              rowSplit: 1,
              colSplit: 0,
            },
            filter: null,
          },
        ],
        rtl: null,
      },
    } as any);
    expect(res).toBeFalsy();
  }));
});
