import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ExcelModule, FilterService, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { FilterOperatorsEnum } from '../data-grid-state.model';
import { DataGridHeaderFilterTypes } from '../data-grid.module';
import { DataGridFilterComponent } from './data-grid-filter.component';
import { DataGridFilterModule } from './data-grid-filter.module';
const textTypeFilterDefaultSettings = {
  data: [
    {
      text: '2020010322112',
      entityId: '2020010322112',
    },
    {
      text: '2020010322113',
      entityId: '2020010322113',
    },
    {
      text: '2020010322122',
      entityId: '2020010322122',
    },
    {
      text: '2020010322142',
      entityId: '2020010322142',
    },
    {
      text: '2020010312345',
      entityId: '2020010312345',
    },
    {
      text: '2020010322110',
      entityId: '2020010322110',
    },
    {
      text: '2020010322118',
      entityId: '2020010322118',
    },
    {
      text: '2020010322135',
      entityId: '2020010322135',
    },
  ],
  textField: 'entityId',
  valueField: 'entityId',
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
        selected: true,
      },
      {
        text: 'Does not contain',
        value: 'doesnotcontain',
      },
      {
        text: 'Starts With',
        value: 'startswith',
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
      {
        text: 'Is Null',
        value: 'isnull',
      },
      {
        text: 'Is Not Null',
        value: 'isnotnull',
      },
      {
        text: 'Is Empty',
        value: 'isempty',
      },
      {
        text: 'Is Not Empty',
        value: 'isnotempty',
      },
    ],
    showClearButton: true,
  },
  inputPattern: /^[0-9]*$/,
};

const amountTypeFilterDefaultSettings = {
  data: [
    {
      text: 500001.87,
      payableAmount: 500001.87,
    },
    {
      text: 101,
      payableAmount: 101,
    },
    {
      text: 86.99,
      payableAmount: 86.99,
    },
    {
      text: 100.99,
      payableAmount: 100.99,
    },
  ],
  textField: 'payableAmount',
  valueField: 'payableAmount',
  filterType: 'amount',
  filterDetails: {
    showOperators: true,
    operators: [
      {
        text: 'Is Equal To',
        value: 'eq',
        selected: false,
      },
      {
        text: 'Is Not Equal To',
        value: 'neq',
        selected: false,
      },
      {
        text: 'Contains',
        value: 'contains',
        selected: true,
      },
      {
        text: 'Does not contain',
        value: 'doesnotcontain',
        selected: false,
      },
      {
        text: 'Starts With',
        value: 'startswith',
        selected: false,
      },
      {
        text: 'Does Not Starts With',
        value: 'doesnotstartwith',
        selected: false,
      },
      {
        text: 'Ends With',
        value: 'endswith',
        selected: false,
      },
      {
        text: 'Does Not Ends With',
        value: 'doesnotendwith',
        selected: false,
      },
      {
        text: 'Is Empty',
        value: 'isempty',
        selected: false,
      },
    ],
    showClearButton: true,
    previousOperator: 'contains',
  },
};
describe('DataGridFilterComponent', () => {
  let component: DataGridFilterComponent;
  let fixture: ComponentFixture<DataGridFilterComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DataGridFilterModule, ExcelModule, GridModule, PDFModule],
        providers: [
          FilterService,
          LocalizationService,
          { provide: L10N_PREFIX, useValue: '' },
          { provide: [ComponentFixtureAutoDetect], useValue: true },
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(DataGridFilterComponent);
          component = fixture.componentInstance;
        });
    })
  );

  it('#onClearButtonPress should remove filter', () => {
    component.filterDetails = {
      showOperators: true,
      placeholder: '',
      operators: [],
      showClearButton: true,
    };
    component.onClearButtonPress();
    fixture.detectChanges();
    expect(component.filterForm.pristine).toBeTrue();
  });

  it('#for filter type text - should be able to filter data correctly', fakeAsync(() => {
    component.data = textTypeFilterDefaultSettings.data;
    component.textField = textTypeFilterDefaultSettings.textField;
    component.valueField = textTypeFilterDefaultSettings.valueField;
    component.filterType = textTypeFilterDefaultSettings.filterType as DataGridHeaderFilterTypes;
    component.filterDetails = textTypeFilterDefaultSettings.filterDetails;
    component.inputPattern = new RegExp(textTypeFilterDefaultSettings.inputPattern);
    fixture.detectChanges();

    const input = fixture.debugElement
      .query(By.css('iras-input'))
      .nativeElement.shadowRoot.querySelector('.input__field');
    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(400);

    expect(component.queryString).toBeFalsy();

    input.value = '123';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(400);
    expect(component.queryString).toEqual('123');

    // set input pattern to null
    component.inputPattern = null;
    fixture.detectChanges();
    input.value = 'Prem123';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(400);
    expect(component.queryString).toEqual('Prem123');
  }));

  it('#onOperatorChange should remove filter', () => {
    const spy = spyOn(component, 'setFilter').and.callThrough();
    component.filterDetails = {
      showOperators: true,
      placeholder: 'Test',
      operators: [{ text: 'Equal', value: 'eq', selected: true }],
      showClearButton: true,
    };
    component.queryString = '';
    component.filterType = 'text';
    component.selectedOperator = 'eq';
    component.onOperatorChange('eq');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('#onOperatorChange should apply filter', () => {
    const spy = spyOn(component, 'setFilter').and.callThrough();
    component.filterDetails = {
      showOperators: true,
      placeholder: 'Test',
      operators: [{ text: 'Equal', value: 'eq', selected: true }],
      showClearButton: true,
    };
    component.queryString = 'Text';
    component.filterType = 'text';
    component.selectedOperator = 'eq';
    component.onOperatorChange('eq');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('#should emit gridFilterValChange event for amount field with val 100.00', fakeAsync(() => {
    spyOn(component.gridFilterValChange, 'emit');
    // check amount type is emitting it correct.
    component.data = amountTypeFilterDefaultSettings.data;
    component.textField = amountTypeFilterDefaultSettings.textField;
    component.valueField = amountTypeFilterDefaultSettings.valueField;
    component.filterType = amountTypeFilterDefaultSettings.filterType as DataGridHeaderFilterTypes;
    component.filterDetails = amountTypeFilterDefaultSettings.filterDetails;
    fixture.detectChanges();

    const input = fixture.debugElement
      .query(By.css('iras-amount-input'))
      .nativeElement.shadowRoot.querySelector('.input__field');

    const amountFieldFilterVal = '100.00';
    input.value = amountFieldFilterVal;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(400);

    expect(component.gridFilterValChange.emit).toHaveBeenCalledWith({
      columnKey: component.valueField,
      filters: [
        {
          field: component.valueField,
          operator: component.selectedOperator,
          value: '100.00',
        },
      ],
    });
  }));

  it('#should emit gridFilterValChange event for columnType amount -100.0', fakeAsync(() => {
    spyOn(component.gridFilterValChange, 'emit');
    component.data = amountTypeFilterDefaultSettings.data;
    component.textField = amountTypeFilterDefaultSettings.textField;
    component.valueField = amountTypeFilterDefaultSettings.valueField;
    component.filterType = amountTypeFilterDefaultSettings.filterType as DataGridHeaderFilterTypes;
    component.filterDetails = amountTypeFilterDefaultSettings.filterDetails;
    fixture.detectChanges();

    const input =
      component.filterType === 'amount'
        ? fixture.debugElement
            .query(By.css('iras-amount-input'))
            .nativeElement.shadowRoot.querySelector('.input__field')
        : fixture.debugElement.query(By.css('iras-input')).nativeElement.shadowRoot.querySelector('.input__field');

    // now check for 100.0
    const amountFieldFilterVal = '-100.0';
    input.value = amountFieldFilterVal;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(400);

    const expectedEmittedVal = {
      columnKey: component.valueField,
      filters: [
        {
          field: component.valueField,
          operator: FilterOperatorsEnum.contains,
          value: '-100.0',
        },
      ],
    };

    tick(200);
    expect(component.gridFilterValChange.emit).toHaveBeenCalledWith(expectedEmittedVal);
  }));

  it('#should emit gridFilterValChange event for columnType text', fakeAsync(() => {
    spyOn(component.gridFilterValChange, 'emit');

    // check on input type
    component.data = textTypeFilterDefaultSettings.data;
    component.textField = textTypeFilterDefaultSettings.textField;
    component.valueField = textTypeFilterDefaultSettings.valueField;
    component.filterType = textTypeFilterDefaultSettings.filterType as DataGridHeaderFilterTypes;
    component.filterDetails = textTypeFilterDefaultSettings.filterDetails;
    component.inputPattern = new RegExp(textTypeFilterDefaultSettings.inputPattern);
    fixture.detectChanges();

    const input = fixture.debugElement
      .query(By.css('iras-input'))
      .nativeElement.shadowRoot.querySelector('.input__field');

    // set input for this filter
    const entityIdFilterVal = '2112';
    input.value = entityIdFilterVal;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(400);

    expect(component.gridFilterValChange.emit).toHaveBeenCalledWith({
      columnKey: component.valueField,
      filters: [
        {
          field: component.valueField,
          operator: FilterOperatorsEnum.contains,
          value: entityIdFilterVal,
        },
      ],
    });
  }));
});
