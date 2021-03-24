import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import {
  DataGridState,
  FilterOperatorsEnum,
  IGridBottomFooterButtonClickParams,
  RowClassArgs,
} from '../../../../../common-ui-lib/src/lib/data-grid/data-grid-state.model';
import { regexInputPattern } from '../../../../../common-ui-lib/src/public-api';

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
      columnKey: 'caseSettled',
      reorderable: true,
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
      tooltip: {
        content: 'This is case settled',
        position: 'above',
      },
    },
    {
      columnKey: 'paidOnTime',
      reorderable: true,
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
      tooltip: {
        content: 'This is paid on time',
        position: 'above',
      },
    },
    {
      columnKey: 'entityId',
      reorderable: true,
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
      columnKey: 'payableAmount',
      reorderable: true,
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
      reorderable: true,
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
      columnType: 'buttons',
      reorderable: true,
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
      editable: false,
      entityId: '2020010322112,2020024328684',
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
    },
    {
      rowUniqueId: '2',
      editable: false,
      entityId: '2020010322113',
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
    },
    {
      rowUniqueId: '3',
      editable: false,
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
    },
    {
      rowUniqueId: '4',
      editable: false,
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
    },
    {
      rowUniqueId: '5',
      editable: false,
      entityId: '2020010312345',
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
    },
    {
      rowUniqueId: '6',
      editable: false,
      entityId: '2020010322110',
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
    },
  ],
  navigable: true,
  sortable: true,
  scrollable: 'scrollable',
  // height: 500,
  groupable: true,
  filterable: true,
  pageable: false,
  // pageable: false,
  exportOptions: {
    excel: {
      buttonText: 'EXPORT TO EXCEL',
      export: true,
      fileName: 'Billing.xlsx',
      onlyFilteredData: true,
    },
  },
  bottomToolbarOptions: {
    buttons: [
      {
        text: 'Attach Document',
        iconName: 'add-record-svg',
        onClick: (args?: IGridBottomFooterButtonClickParams) => {
          args.addEmptyRecordToGrid();
          alert('here to open some other modal');
        },
      },
    ],
  },
  showPageCountMessageOnTop: true,
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
  rowItem.status = statusDropdownData.find((d) => d.key === rowItem.status)?.text;

  if (((index as unknown) as number) % 2 === 0) {
    rowItem.caseSettled = true;
    rowItem.paidOnTime = true;
  } else {
    rowItem.caseSettled = false;
    rowItem.paidOnTime = false;
  }
}

gridState1.data.push({
  rowUniqueId: 'last_editable_row',
  caseSettled: false,
  paidOnTime: false,
  editable: true,
  entityId: '',
  type: '',
  suppressionType: '',
  suppressionLevel: '',
  taxType: '',
  suppressionDate: '',
  releaseDate: '',
  status: '',
  payableAmount: 0,
  payment: 0,
  lastModifiedBy: '',
});

export const MOCK_GRID_STATE_5 = gridState1;
