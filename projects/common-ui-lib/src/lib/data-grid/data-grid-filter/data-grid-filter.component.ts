import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseFilterCellComponent, FilterService } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import * as moment from 'moment';
import { debounceTime } from 'rxjs/operators';
import { SubscriptionObserver } from '../../../helpers/subscription-observer.util';
import {
  DataGridHeaderFilterTypes,
  FilterDetails,
  FilterOperatorsEnum,
  GridFilterValChangeEvent,
} from '../data-grid-state.model';
import { getDateFromStr } from '../get-date-from-str.util';

@Component({
  selector: 'iras-data-grid-filter',
  templateUrl: './data-grid-filter.component.html',
  styleUrls: ['./data-grid-filter.component.scss'],
})
export class DataGridFilterComponent extends BaseFilterCellComponent implements OnInit, OnDestroy, OnChanges {
  @Input() data: any[];
  @Input() textField: string;
  @Input() valueField: string;
  @Input() filterDetails: FilterDetails;
  @Input() filterType: DataGridHeaderFilterTypes;
  @Input() inputPattern: RegExp = null;
  @Input() activeFiltersToApply: CompositeFilterDescriptor;
  @Input() allowNegative = true;
  @ViewChild('.k-dropdown') dropdownList: any;
  @Output() gridFilterValChange = new EventEmitter<GridFilterValChangeEvent>();

  dropdownFormControl: FormControl;
  dropDownData: any[] = [{ text: 'Clear', key: 'clear' }];
  selectedDate: moment.Moment;

  queryString: Date | string = '';
  selectedOperator = null;
  filterForm = new FormGroup({
    userInput: new FormControl(),
  });
  currentFilterState: string = null;
  subscriptionObserver = new SubscriptionObserver();

  constructor(public filterService: FilterService, private elm: ElementRef) {
    super(filterService);
  }

  ngOnInit(): void {
    if (this.filterType === 'dropdown') {
      this.data.forEach((item) => {
        this.dropDownData.push({ text: item.text, key: item[this.valueField] });
      });
    } else if (this.filterType === 'date') {
      this.data = this.data.map((d) => {
        const modifiedValue = d;
        for (const [key, value] of Object.entries(d)) {
          modifiedValue[key] = getDateFromStr(value);
        }
        return modifiedValue;
      });
    }
    this.subscriptionObserver.observe(
      this.filterForm.controls.userInput.valueChanges.pipe(debounceTime(300)),
      (val) => {
        this.selectedOperator = (this.filterDetails.operators || []).find((o) => o.selected)?.value || 'eq';
        switch (this.filterType) {
          case 'text': {
            this.queryString = val;
            break;
          }
          case 'amount': {
            this.queryString = val;
            break;
          }
          case 'date': {
            this.selectedDate = moment(val, 'yyyy-MM-DD');
            this.queryString = val;
            break;
          }
          case 'dropdown': {
            this.queryString = val === 'clear' ? null : val;
            if (val === 'clear') {
              this.filterForm.reset();
              break;
            }
            this.selectedOperator = FilterOperatorsEnum.equalTo;

            break;
          }
        }
        this.setFilter();
      }
    );
    const elements = this.elm.nativeElement.querySelectorAll('.filter-operators');
    if (!this.filterDetails.showClearButton) {
      elements[0].lastChild.remove();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.activeFiltersToApply?.currentValue) {
      const allFiltersPreviousStr = JSON.stringify(changes.activeFiltersToApply?.previousValue || {});
      const allFiltersCurrentStr = JSON.stringify(changes.activeFiltersToApply.currentValue || {});

      if (allFiltersPreviousStr === allFiltersCurrentStr) {
        return;
      }
      const currentFilterState = JSON.stringify(
        (changes.activeFiltersToApply.currentValue.filters || []).filter((fl) => fl.field === this.valueField)
      );

      if (this.currentFilterState === currentFilterState) {
        return;
      }
      this.currentFilterState = currentFilterState;
      this.filterService.filter(changes.activeFiltersToApply.currentValue);
    }
  }

  ngOnDestroy() {
    this.subscriptionObserver.removeSubscriptions();
  }

  setFilter(): void {
    const value = this.queryString;
    const operator = this.selectedOperator;
    const filterConditions: Array<FilterDescriptor> = [];
    filterConditions.push(
      ...[
        {
          field: this.valueField,
          operator,
          value,
        },
      ]
    );

    this.gridFilterValChange.emit({ columnKey: this.valueField, filters: filterConditions });
  }

  onOperatorChange(value: string) {
    this.selectedOperator = value;
    if (this.filterDetails.operators) {
      this.filterDetails.operators = this.filterDetails.operators.map((o) => {
        o.selected = false;
        if (o.value === value) {
          o.selected = true;
        }
        return o;
      });
    }
    this.setFilter();
  }

  onClearButtonPress() {
    this.queryString = null;
    this.filterForm.reset();
  }
}
