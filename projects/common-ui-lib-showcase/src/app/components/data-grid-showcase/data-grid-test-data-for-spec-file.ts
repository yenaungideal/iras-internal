import {
  DataGridState,
  FilterOperatorsEnum,
  RowClassArgs,
  IGridBottomFooterButtonClickParams,
} from '../../../../../common-ui-lib/src/lib/data-grid/data-grid-state.model';
import { Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { regexInputPattern } from '../../../../../common-ui-lib/src/public-api';
import { entityTypeList } from '../entity-search-showcase/entity-id-list';

class CustomValidators {
  static mustContainOnlyNumbers(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const pattern = '^[0-9]*$';
    const regex = new RegExp(pattern);
    const match = control.value.match(regex);
    if (!match) {
      return { mustContainOnlyNumbers: true };
    }
    return null;
  }

  static paymentAmountMustNotBeGreaterThanPayableAmount(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    if (!control.parent) {
      return null;
    }

    const payableAmount = control.parent.value?.payableAmount;

    if (+control.value > +payableAmount) {
      return { paymentAmountMustNotBeGreaterThanPayableAmount: true };
    }
    return null;
  }
}
const textFilterOperators = [
  {
    text: 'Is Equal To',
    value: FilterOperatorsEnum.equalTo,
  },
  {
    text: 'Is Not Equal To',
    value: FilterOperatorsEnum.notEqualTo,
  },
  {
    text: 'Contains',
    value: FilterOperatorsEnum.contains,
  },
  {
    text: 'Does not contain',
    value: FilterOperatorsEnum.doesNotContain,
  },
  {
    text: 'Starts With',
    value: FilterOperatorsEnum.startsWith,
    selected: true,
  },
  {
    text: 'Does Not Starts With',
    value: FilterOperatorsEnum.doesNotStartWith,
  },
  {
    text: 'Ends With',
    value: FilterOperatorsEnum.endsWith,
  },
  {
    text: 'Does Not Ends With',
    value: FilterOperatorsEnum.doesNotEndWith,
  },
];

const statusDropdownData = [
  {
    key: 'select',
    text: 'Select',
  },
  {
    key: 'active',
    text: 'Active',
  },
  {
    key: 'inactive',
    text: 'Not Active',
  },
  {
    key: '303',
    text: 'GIRO',
  },
];

export const dateFilterOperators = [
  {
    text: 'Is equal to',
    value: FilterOperatorsEnum.equalTo,
    selected: true,
  },
  {
    text: 'Is after',
    value: FilterOperatorsEnum.greaterThan,
  },
  {
    text: 'Is after or equal to',
    value: FilterOperatorsEnum.greaterThanEqualTo,
  },
  {
    text: 'Is before',
    value: FilterOperatorsEnum.lessThan,
  },
  {
    text: 'Is before or equal to',
    value: FilterOperatorsEnum.lessThanEqualTo,
  },
];
const gridState1: DataGridState = {
  columnsConfig: [
    {
      locked: true,
      columnWidth: 45,
      columnTitle: '',
      columnType: 'menu',
      columnKey: 'menu_1',
      filterable: false,
      menuTypeColumnConfig: {
        menuItems: [
          {
            text: 'Create Case Item',
            onClick: ({ dataItem }) => {
              console.log('Create Case Item context menu clicked', { dataItem });
            },
          },
          {
            text: 'View Credit Information',
            onClick: ({ dataItem }) => {
              console.log('View Credit Information context menu clicked', { dataItem });
            },
          },
        ],
      },
      cellContentFormatting: 'text',
    },
    {
      columnKey: 'row_selector_1',
      columnTitle: 'Select All',
      columnType: 'row_selector',
      columnWidth: 100,
      filterable: false,
      locked: true,
      editable: true,
      hidden: true,
      cellContentFormatting: 'text',
      rowSelectorTypeColumnConfig: {
        showSelectAll: true,
      },
    },
    {
      columnKey: 'caseSettled',
      columnTitle: 'Case Settled (Select All)',
      columnType: 'boolean',
      columnWidth: 150,
      filterable: true,
      locked: true,
      editable: false,
      cellContentFormatting: 'text',
      booleanTypeColumnConfig: {
        showSelectAll: true,
        displayType: 'checkbox',
      },
    },

    {
      columnKey: 'entitySearch',
      columnTitle: 'Entity Search',
      columnWidth: 400,
      locked: false,
      columnType: 'entity-search',
      editable: true,
      cellContentFormatting: 'text',
      canExportToExcel: true,
      filterable: true,
      sortable: true,
      filterType: 'text',
      filterDetails: { showOperators: true, operators: textFilterOperators },
    },
    {
      columnKey: 'paidOnTime',
      columnTitle: 'Paid On Time',
      columnType: 'boolean',
      columnWidth: 100,
      filterable: false,
      locked: true,
      editable: false,
      cellContentFormatting: 'text',
      booleanTypeColumnConfig: {
        showSelectAll: false,
        displayType: 'icon',
      },
    },
    {
      columnKey: 'entityId',
      columnTitle: 'Entity ID',
      filterable: true,
      filterType: 'text',
      filterDetails: {
        showOperators: true,
        operators: textFilterOperators,
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
    {
      columnKey: 'defaultersList',
      columnTitle: 'Defaulters list',
      filterable: true,
      filterType: 'text',
      filterDetails: {
        showOperators: true,
        operators: textFilterOperators,
        showClearButton: true,
      },
      columnWidth: 155,
      locked: false,
      columnType: 'text',
      editable: false,
      textTypeColumnConfig: {
        onClick: ({ dataItem, clickedText }) => {
          console.log('entityId clicked', { dataItem, clickedText });
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
    {
      columnKey: 'type',
      columnTitle: 'Type',
      filterable: false,
      columnWidth: 155,
      locked: false,
      columnType: 'text',
      editable: false,
      cellContentFormatting: 'text',
      canExportToExcel: true,
      sortable: true,
      groupable: true,
    },
    {
      columnKey: 'suppressionType',
      columnTitle: 'Suppression Type',
      filterable: true,
      filterDetails: {
        placeholder: 'Select item from list',
        showOperators: false,
      },
      filterType: 'dropdown',
      columnWidth: 250,
      locked: false,
      columnType: 'text',
      editable: true,
      cellContentFormatting: 'text',
      canExportToExcel: true,
      sortable: true,
      groupable: true,
    },
    {
      columnKey: 'suppressionLevel',
      columnTitle: 'Suppression Level',
      filterable: true,
      filterDetails: {
        placeholder: 'Select item from list',
        showOperators: false,
      },
      filterType: 'dropdown',
      columnWidth: 160,
      locked: false,

      columnType: 'text',
      editable: true,
      cellContentFormatting: 'text',
      canExportToExcel: true,
      sortable: true,
      groupable: true,
    },
    {
      columnKey: 'taxType',
      columnTitle: 'Tax Type',
      filterable: true,
      filterType: 'text',
      filterDetails: {
        showOperators: true,
        operators: textFilterOperators,
        showClearButton: true,
      },
      columnWidth: 155,
      locked: false,

      columnType: 'text',
      editable: true,
      cellContentFormatting: 'text',
      canExportToExcel: true,
      sortable: true,
      groupable: true,
    },
    {
      columnKey: 'suppressionDate',
      columnTitle: 'Suppression Date',
      filterable: true,
      filterType: 'date',
      filterDetails: {
        showOperators: true,
        placeholder: 'dd/mm/yyyy',
        operators: dateFilterOperators,
        showClearButton: true,
      },
      columnWidth: 215,
      locked: false,

      columnType: 'text',
      editable: true,
      cellContentFormatting: 'date',
      canExportToExcel: true,
      sortable: true,
      groupable: true,
      hidden: true,
    },
    {
      columnKey: 'releaseDate',
      columnTitle: 'Release Date',
      filterable: false,
      filterType: 'date',
      columnWidth: 215,
      locked: false,

      columnType: 'text',
      editable: true,
      cellContentFormatting: 'date',
      canExportToExcel: true,
      sortable: true,
      groupable: true,
      hidden: true,
    },
    {
      columnKey: 'status',
      columnTitle: 'Status',
      filterable: true,
      filterType: 'dropdown',
      filterDetails: {
        placeholder: 'Select item from list',
        showOperators: false,
      },
      columnWidth: 155,
      locked: false,
      columnType: 'text',
      editable: true,
      cellContentFormatting: 'text',
      canExportToExcel: true,
      sortable: true,
      groupable: true,
    },
    {
      columnKey: 'payableAmount',
      columnTitle: 'Payable Amount',
      filterable: true,
      filterDetails: {
        showOperators: true,
        operators: textFilterOperators,
        showClearButton: true,
      },
      filterType: 'amount',
      columnWidth: 200,
      locked: false,
      columnType: 'text',
      editable: false,
      cellContentFormatting: 'amount',
      canExportToExcel: true,
      sortable: true,
      groupable: true,
      allowNegative: true,
    },
    {
      columnKey: 'payment',
      columnTitle: 'Payment Amount',
      filterable: true,
      filterDetails: {
        showOperators: true,
        operators: textFilterOperators,
        showClearButton: true,
      },
      filterType: 'amount',
      columnWidth: 200,
      locked: false,
      columnType: 'text',
      editable: true,
      cellContentFormatting: 'amount',
      canExportToExcel: true,
      sortable: true,
      groupable: true,
      allowNegative: true,
    },
    {
      columnKey: 'lastModifiedBy',
      columnTitle: 'Last Modified By',
      filterable: true,
      filterDetails: {
        placeholder: 'Select item from list',
        showOperators: false,
      },
      filterType: 'dropdown',
      columnWidth: 155,
      locked: false,
      columnType: 'text',
      cellContentFormatting: 'text',
      editable: true,
      hidden: true,
      canExportToExcel: true,
      sortable: true,
      groupable: true,
    },
    {
      columnType: 'buttons',
      columnTitle: 'Actions',
      columnKey: 'buttons_1',
      columnWidth: 300,
      filterable: false,
      locked: false,

      buttonsTypeColumnConfig: {
        buttons: [
          {
            text: 'Delete',
            role: 'delete',
            getButtonDisabled: ({ dataItem }) => {
              return dataItem.entityId === '2020010322113';
            },
            getButtonColor: ({ dataItem }) => {
              return dataItem.entityId === '2020010322113' ? 'grey' : 'primary';
            },
          },
        ],
      },
      editable: true,
      cellContentFormatting: 'text',
    },
  ],
  data: [
    {
      rowUniqueId: '1',
      defaultersList: 'INLBADGUY,INLCHEATER',
      editable: false,
      entityId: '2020010322112',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-04-10',
      releaseDate: '2020-04-11',
      status: 'active',
      payment: 0,
      lastModifiedBy: 'INL9GAG',
      payableAmount: 0,
      entitySearch: 'S6087818H,1',
    },
    {
      rowUniqueId: '2',
      editable: false,
      entityId: '2020010322113',
      defaultersList: 'INLBADGUY,INLCHEATER',
      type: 'DRN',
      suppressionType: 'Agent appointment',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-01-11',
      releaseDate: '2020-01-12',
      status: 'inactive',
      payableAmount: 0.1,
      payment: 0.1,
      lastModifiedBy: 'INL9GAG',
      entitySearch: 'g1659942k,2',
    },
    {
      rowUniqueId: '3',
      editable: false,
      defaultersList: 'INLBADGUY,INLCHEATER',
      entityId: '2020010322122',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-02-11',
      releaseDate: '2020-02-12',
      status: 'inactive',
      payableAmount: 0.99,
      payment: 0.99,
      lastModifiedBy: 'INL9GAG',
      entitySearch: null,
    },
    {
      rowUniqueId: '4',
      editable: false,
      defaultersList: 'INLBADGUY,INLCHEATER',
      entityId: '2020010322142',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-02-15',
      releaseDate: '2020-02-17',
      status: 'inactive',
      payment: 0.12,
      payableAmount: 0.12,
      lastModifiedBy: 'INL9GAG',
      entitySearch: null,
    },
    {
      rowUniqueId: '5',
      editable: false,
      entityId: '2020010312345',
      defaultersList: 'INLBADGUY,INLCHEATER',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-02-20',
      releaseDate: '2020-02-25',
      status: 'active',
      payment: 0.01,
      payableAmount: 0.01,
      lastModifiedBy: 'INL9GAG',
      entitySearch: null,
    },
    {
      rowUniqueId: '6',
      editable: false,
      entityId: '2020010322110',
      defaultersList: 'INLBADGUY,INLCHEATER',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-01-11',
      releaseDate: '2020-01-12',
      status: 'active',
      payableAmount: 100,
      payment: 100,
      lastModifiedBy: 'INLG8HB',
      entitySearch: null,
    },
    {
      rowUniqueId: '7',
      editable: false,
      entityId: '2020010322118',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-01-11',
      releaseDate: '2020-01-12',
      status: 'active',
      payableAmount: 100.1,
      payment: 100.1,
      lastModifiedBy: 'INL4CHN',
      entitySearch: null,
    },
    {
      rowUniqueId: '8',
      editable: false,
      entityId: '2020010322112',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-01-11',
      releaseDate: '2020-01-12',
      status: 'active',
      payableAmount: 100.99,
      payment: 100.99,
      lastModifiedBy: 'INL9GAG',
      entitySearch: null,
    },
    {
      rowUniqueId: '9',
      editable: false,
      entityId: '2020010322113',
      type: 'DRN',
      suppressionType: 'Agent appointment',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-01-11',
      releaseDate: '2020-01-12',
      status: 'active',
      payableAmount: 100.12,
      payment: 100.12,
      lastModifiedBy: 'INL9GAG',
      entitySearch: null,
    },
    {
      rowUniqueId: '10',
      editable: false,
      entityId: '2020010322122',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-01-11',
      releaseDate: '2020-01-12',
      status: 'active',
      payableAmount: 100.01,
      payment: 100.01,
      lastModifiedBy: 'INL9GAG',
      entitySearch: null,
    },
    {
      rowUniqueId: '11',
      editable: false,
      entityId: '2020010322142',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-01-11',
      releaseDate: '2020-01-12',
      status: 'active',
      payableAmount: -100,
      payment: -100,
      lastModifiedBy: 'INL9GAG',
      entitySearch: null,
    },
    {
      rowUniqueId: '12',
      editable: false,
      entityId: '2020010322135',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-01-11',
      releaseDate: '2020-01-12',
      status: 'active',
      payableAmount: -100.1,
      payment: -100.1,
      lastModifiedBy: 'INL9GAG',
      entitySearch: null,
    },
    {
      rowUniqueId: '13',
      editable: false,
      entityId: '2020010322110',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-01-11',
      releaseDate: '2020-01-12',
      status: 'active',
      payableAmount: -100.99,
      payment: -100.99,
      lastModifiedBy: 'INLG8HB',
      entitySearch: null,
    },
    {
      rowUniqueId: '14',
      editable: false,
      entityId: '2020010322118',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-01-11',
      releaseDate: '2020-01-12',
      status: 'active',
      payableAmount: -100.12,
      payment: -100.12,
      lastModifiedBy: 'INL4CHN',
      entitySearch: null,
    },
    {
      rowUniqueId: '15',
      editable: false,
      entityId: '2020010322119',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-01-11',
      releaseDate: '2020-01-12',
      status: 'active',
      payableAmount: -100.01,
      payment: -100.01,
      lastModifiedBy: 'INL4CHN',
      entitySearch: null,
    },
    {
      rowUniqueId: '16',
      editable: false,
      entityId: '2020010322120',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-01-11',
      releaseDate: '2020-01-12',
      status: 'active',
      payableAmount: -0.1,
      payment: -0.1,
      lastModifiedBy: 'INL4CHN',
      entitySearch: null,
    },
    {
      rowUniqueId: '17',
      editable: false,
      entityId: '2020010322121',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-01-11',
      releaseDate: '2020-01-12',
      status: 'active',
      payableAmount: -0.99,
      payment: -0.99,
      lastModifiedBy: 'INL4CHN',
      entitySearch: null,
    },
    {
      rowUniqueId: '18',
      editable: false,
      entityId: '2020010322122',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-01-11',
      releaseDate: '2020-01-12',
      status: 'active',
      payableAmount: -0.12,
      payment: -0.12,
      lastModifiedBy: 'INL4CHN',
      entitySearch: null,
    },
    {
      rowUniqueId: '19',
      editable: false,
      entityId: '2020010322123',
      type: 'DRN',
      suppressionType: 'Imposition of penalty',
      suppressionLevel: 'Entity',
      taxType: 'Stamp Duty',
      suppressionDate: '2020-01-11',
      releaseDate: '2020-01-12',
      status: 'active',
      payableAmount: -0.01,
      payment: -0.01,
      lastModifiedBy: 'INL4CHN',
    },
  ],
  navigable: true,
  sortable: true,
  scrollable: 'scrollable',
  // height: 500,
  groupable: true,
  filterable: true,
  pageSize: 10,
  pageable: {
    buttonCount: 5,
    pageSizes: [10, 20, 50, 100],
    previousNext: true,
    info: true,
    type: 'input',
  },
  // pageable: false,
  exportOptions: {
    excel: {
      buttonText: 'EXPORT TO EXCEL',
      export: true,
      fileName: 'Billing.xlsx',
      onlyFilteredData: true,
    },
  },

  showPageCountMessageOnTop: true,
  bottomToolbarOptions: {
    buttons: [
      {
        iconName: 'add-record-svg',
        text: 'Attach Document',
        onClick: (args?: IGridBottomFooterButtonClickParams) => {
          args.addEmptyRecordToGrid();
        },
      },
    ],
  },
  columnGroupingOptions: [
    { columnKey: 'menu_1' },
    {
      columnKey: 'row_selector_1',
    },
    {
      columnKey: 'caseSettled',
    },
    {
      columnKey: 'paidOnTime',
    },
    {
      columnKey: 'entitySearch',
    },
    { columnKey: 'entityId' },
    { columnKey: 'type' },
    { columnKey: 'lastModifiedBy' },
    { columnKey: 'status' },
    { columnKey: 'suppressionDate' },
    {
      mainHeader: 'Grouped Item',
      autoSize: false,
      locked: false,
      reorderable: true,
      resizable: true,
      groups: [{ columnKey: 'payableAmount' }, { columnKey: 'payment' }],
    },
    { columnKey: 'releaseDate' },
    { columnKey: 'suppressionLevel' },
    { columnKey: 'suppressionType' },
    { columnKey: 'taxType' },
    { columnKey: 'buttons_1' },
  ],
  reorderable: true,

  editOptions: {
    columnsInfo: {
      caseSettled: {
        type: 'checkbox',
      },
      entityId: {
        type: 'text',
        inputValidators: [
          {
            errorMessage: 'This field is required',
            validator: Validators.required,
            errorIdentifier: 'required',
          },
          {
            errorMessage: 'Entity Id must be exactly 13 characters.',
            validator: Validators.minLength(13),
            errorIdentifier: 'minlength',
          },
          {
            errorMessage: 'Entity id can only contain numbers',
            validator: CustomValidators.mustContainOnlyNumbers,
            errorIdentifier: 'mustContainOnlyNumbers',
          },
        ],
      },
      type: {
        type: 'dropdown',
        dropdownParams: {
          data: [
            {
              key: 'select',
              text: 'Select',
            },
            {
              text: 'DRN',
              key: 'drn',
            },
          ],
          placeholder: 'Select Item',
          required: true,
        },
      },
      entitySearch: {
        type: 'entity-search',
        entityIdSearchOptions: {
          showValidationError: true,
          required: true,
          errorMessages: {
            idInput: {
              required: 'this is a required field.',
            },
            idType: {
              required: 'idType is required field',
              entityTypeErrorMessage: 'Selected Type is not valid for id input',
            },
          },
          idList: entityTypeList,
        },
      },
      suppressionType: {
        type: 'dropdown',
        dropdownParams: {
          data: [
            {
              key: 'select',
              text: 'Select',
            },
            {
              text: 'Imposition of penalty',
              key: 'impositionOfPenalty',
            },
            {
              text: 'Agent appointment',
              key: 'agentAppointment',
            },
          ],
          placeholder: 'Select Item',
          required: true,
        },
      },
      suppressionLevel: {
        type: 'dropdown',
        dropdownParams: {
          data: [
            {
              key: 'select',
              text: 'Select',
            },
            { key: 'entity', text: 'Entity' },
          ],
          placeholder: 'Select Item',
          required: true,
        },
      },
      taxType: {
        type: 'dropdown',
        dropdownParams: {
          data: [
            {
              key: 'select',
              text: 'Select',
            },
            { key: 'stampduty', text: 'Stamp Duty' },
          ],
          placeholder: 'Select Item',
          required: true,
        },
      },
      suppressionDate: {
        type: 'date',
        datePickerParams: {
          maxDate: new Date(2021, 10, 5),
          minDate: new Date(),
          placeholder: 'select date',
          required: true,
          selectedDate: new Date(),
        },
      },
      releaseDate: {
        type: 'date',
        datePickerParams: {
          maxDate: new Date(2021, 10, 5),
          minDate: new Date(),
          placeholder: 'select date',
          required: true,
          selectedDate: new Date(),
        },
      },
      status: {
        type: 'dropdown',
        dropdownParams: {
          data: statusDropdownData,
          placeholder: 'Select Item',
          required: true,
        },
      },
      payment: {
        type: 'text',
        inputValidators: [
          {
            errorMessage: 'This field is required',
            validator: Validators.required,
            errorIdentifier: 'required',
          },
          {
            errorMessage: 'Payment amount can not be greater than payable amount. please check.',
            validator: CustomValidators.paymentAmountMustNotBeGreaterThanPayableAmount,
            errorIdentifier: 'paymentAmountMustNotBeGreaterThanPayableAmount',
          },
        ],
      },
      lastModifiedBy: { type: 'text' },
    },
  },

  rowClassFn: (context: RowClassArgs): { [key: string]: boolean } => {
    return {
      'data-row--highlighted': context.dataItem.entityId === '2020010322122',
    };
  },
  customMessages: {
    noRecords: '0 records here',
  },
};

for (const [index, rowItem] of Object.entries(gridState1.data)) {
  rowItem.rowUniqueId = 'rowNumber' + index;
  rowItem.status = statusDropdownData.find((d) => d.key === rowItem.status).text;

  if (((index as unknown) as number) % 2 === 0) {
    rowItem.caseSettled = true;
    rowItem.paidOnTime = true;
  } else {
    rowItem.caseSettled = false;
    rowItem.paidOnTime = false;
  }
}

export const GRID_TEST_DATA_1 = gridState1;
