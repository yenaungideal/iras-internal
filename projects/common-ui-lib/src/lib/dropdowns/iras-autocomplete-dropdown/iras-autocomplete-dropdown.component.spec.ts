import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IrasDropdownsModule } from '../dropdowns.module';
import { IrasAutocompleteDropdownComponent } from './iras-autocomplete-dropdown.component';

const dataToUseForAllTests = {
  data: [
    {
      key: '100',
      text: 'CASH 6 PAYMENT (SINGPOST)',
    },
    {
      key: '199',
      text: 'NETS PAYMENT (SINGPOST)',
    },
    {
      key: '200',
      text: 'CASH PAYMENT (SINGPOST)',
    },
    {
      key: '101',
      text: 'NETS PAYMENT (SINGPOST)',
    },
    {
      key: '102',
      text: 'CHEQUE PAYMENT (SINGPOST)',
    },
    {
      key: '103',
      text: 'AXS KIOSK PAYMENT',
    },
    {
      key: '104',
      text: 'CHEQUE PAYMENT',
    },
    {
      key: '105',
      text: 'AXS INTERNET PAYMENT',
    },
    {
      key: '106',
      text: 'AXS MOBILE PAYMENT',
    },
    {
      key: '107',
      text: 'ENETS DEBIT',
    },
    {
      key: '108',
      text: 'FAST - DBS',
    },
    {
      key: '109',
      text: 'PAYNOW QR - DBS',
    },
    {
      key: '110',
      text: 'FUND TRANSFER DBS8600',
    },
    {
      key: '111',
      text: 'IBG (HDB)',
    },
    {
      key: '112',
      text: 'OCBC APPT AGENT',
    },
    {
      key: '113',
      text: 'UOB APPT AGENT',
    },
    {
      key: '114',
      text: 'CPF APPT AGENT',
    },
    {
      key: '115',
      text: 'DBS APPT AGENT',
    },
  ],
  disabled: false,
  hasError: false,
  icon: 'iras-search_icon',
  placeholder: 'Enter Country Name',
};
describe('IrasAutocompleteDropdownComponent', () => {
  let component: IrasAutocompleteDropdownComponent;
  let fixture: ComponentFixture<IrasAutocompleteDropdownComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IrasDropdownsModule, BrowserAnimationsModule],
        declarations: [IrasAutocompleteDropdownComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IrasAutocompleteDropdownComponent);
    component = fixture.componentInstance;
    component.data = dataToUseForAllTests.data;
    component.disabled = dataToUseForAllTests.disabled;
    component.icon = dataToUseForAllTests.icon;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#writeValue should set value', () => {
    component.writeValue('test option 2');
    expect(component.selectedOption).toEqual('test option 2');
  });

  it('#registerOnChange should call onChange', () => {
    component.registerOnChange(() => {});
    expect(component.onChange).toBeTruthy();
  });

  it('#registerOnTouched should call onTouch', () => {
    component.registerOnTouched(() => {});
    expect(component.onTouch).toBeTruthy();
  });

  it('#onSelectionChange should emit selectionChange', () => {
    const spy = spyOn(component.selectionChange, 'emit').and.callThrough();
    const option = 'test option';
    component.selectedOption = option;
    component.onSelectionChange('test option');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(option);
  });

  it('#writeValue should emit null value', () => {
    const option = 'test option';
    component.selectedOption = option;
    fixture.detectChanges();
    component.writeValue(null);
    expect(component.selectedItemText).toEqual(null);
  });

  it('#onTextChange should call getFilteredList and test value should contain', () => {
    component.data = [
      { key: '100', text: 'TEST 1' },
      { key: '199', text: 'TEST 2' },
      { key: '200', text: 'TEST 3' },
    ];
    fixture.detectChanges();
    const searchVal = 'TEST 2';
    component.onTextChange(searchVal);
    const matchingText = component.dataList.value.find((f) => f.text === searchVal)?.text;
    expect(matchingText).toEqual(searchVal);
  });

  it('#onTextChange should call writeValue', () => {
    const spy = spyOn(component, 'writeValue').and.callThrough();
    component.data = [
      { key: '100', text: 'TEST 1' },
      { key: '199', text: 'TEST 2' },
      { key: '200', text: 'TEST 3' },
    ];
    fixture.detectChanges();
    component.onTextChange('');
    expect(spy).toHaveBeenCalled();
  });

  it('#onInputFocus should call getFilteredList and test value should contain', () => {
    const option = 'TEST 3';
    const spy = spyOn(component, 'onTextChange').and.callThrough();
    component.data = [
      { key: '100', text: 'TEST 1' },
      { key: '199', text: 'TEST 2' },
      { key: '200', text: 'TEST 3' },
    ];
    component.selectedItemText = option;

    const inputElement = fixture.debugElement.nativeElement.shadowRoot.querySelector(
      '.mat-autocomplete-trigger.iras-autocomplete__item-placeholder'
    );

    inputElement.value = option;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(option);
  });

  it('#ngOnChanges should work', () => {
    component.ngOnChanges({
      data: {
        isFirstChange: () => false,
        previousValue: [
          {
            key: '100',
            text: 'CASH 6 PAYMENT (SINGPOST)',
          },
          {
            key: '199',
            text: 'NETS PAYMENT (SINGPOST)',
          },
          {
            key: '200',
            text: 'CASH PAYMENT (SINGPOST)',
          },
          {
            key: '101',
            text: 'NETS PAYMENT (SINGPOST)',
          },
          {
            key: '102',
            text: 'CHEQUE PAYMENT (SINGPOST)',
          },
          {
            key: '103',
            text: 'AXS KIOSK PAYMENT',
          },
          {
            key: '104',
            text: 'CHEQUE PAYMENT',
          },
          {
            key: '105',
            text: 'AXS INTERNET PAYMENT',
          },
          {
            key: '106',
            text: 'AXS MOBILE PAYMENT',
          },
          {
            key: '107',
            text: 'ENETS DEBIT',
          },
          {
            key: '108',
            text: 'FAST - DBS',
          },
          {
            key: '109',
            text: 'PAYNOW QR - DBS',
          },
          {
            key: '110',
            text: 'FUND TRANSFER DBS8600',
          },
          {
            key: '111',
            text: 'IBG (HDB)',
          },
          {
            key: '112',
            text: 'OCBC APPT AGENT',
          },
          {
            key: '113',
            text: 'UOB APPT AGENT',
          },
          {
            key: '114',
            text: 'CPF APPT AGENT',
          },
          {
            key: '115',
            text: 'DBS APPT AGENT',
          },
        ],
        currentValue: [
          {
            key: '100',
            text: 'CASH 6 PAYMENT (SINGPOST)',
          },
          {
            key: '199',
            text: 'NETS PAYMENT (SINGPOST)',
          },
          {
            key: '200',
            text: 'CASH PAYMENT (SINGPOST)',
          },
          {
            key: '101',
            text: 'NETS PAYMENT (SINGPOST)',
          },
          {
            key: '102',
            text: 'CHEQUE PAYMENT (SINGPOST)',
          },
          {
            key: '103',
            text: 'AXS KIOSK PAYMENT',
          },
          {
            key: '104',
            text: 'CHEQUE PAYMENT',
          },
          {
            key: '105',
            text: 'AXS INTERNET PAYMENT',
          },
          {
            key: '106',
            text: 'AXS MOBILE PAYMENT',
          },
          {
            key: '107',
            text: 'ENETS DEBIT',
          },
        ],
        firstChange: false,
      },
    });
    expect(component.selectedItemText).toEqual(undefined);
  });

  it('#onOptionSelected should work', () => {
    component.onOptionSelected('ENETS DEBIT');
    fixture.detectChanges();
    expect(component.selectedItemText).toEqual('ENETS DEBIT');
  });
  it('#getOptionKeyByText should work', () => {
    const key = component.getOptionKeyByText('ENETS DEBIT');
    expect(key).toEqual('107');
  });

  it('#onInputClick should open autoComplete panel', () => {
    const spy = spyOn(component.inputAutoComplete, 'openPanel').and.callThrough();
    component.data = [
      { key: '100', text: 'TEST 1' },
      { key: '199', text: 'TEST 2' },
      { key: '200', text: 'TEST 3' },
    ];
    component.disabled = false;
    fixture.detectChanges();

    const inputElement = fixture.debugElement.nativeElement.shadowRoot.querySelector(
      '.mat-autocomplete-trigger.iras-autocomplete__item-placeholder'
    );
    inputElement.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('#onSearchIconClick should open autoComplete panel and should focus on input', () => {
    const spy = spyOn(component.inputAutoComplete, 'openPanel').and.callThrough();
    component.disabled = false;
    fixture.detectChanges();
    const inputElement = fixture.debugElement.nativeElement.shadowRoot.querySelector('.iras-icon.iras-search-icon');
    inputElement.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('#onInputBlur should close autoComplete panel if opened and update the focused to be false', fakeAsync(() => {
    component.inputAutoComplete.openPanel();
    fixture.detectChanges();
    component.onInputBlur();
    tick(200);
    expect(component.focused).toBeFalse();
  }));

  it('#onKeyPress should open autoComplete Panel if backspace.', () => {
    const spy = spyOn(component.inputAutoComplete, 'openPanel').and.callThrough();
    const option = { key: 'Backspace', keyCode: 8 };
    component.onKeyPress(option);
    expect(spy).toHaveBeenCalled();
  });

  it('#onKeyPress should open autoComplete Panel if delete.', () => {
    const spy = spyOn(component.inputAutoComplete, 'openPanel').and.callThrough();
    const option = { key: 'Delete', keyCode: 46 };
    component.onKeyPress(option);
    expect(spy).toHaveBeenCalled();
  });

  it('#onInputFocus should had been call onTextChange with selected text and focused to be changed to true', () => {
    const option = 'TEST 3';
    const spy = spyOn(component, 'onTextChange').and.callThrough();
    component.data = [
      { key: '100', text: 'TEST 1' },
      { key: '199', text: 'TEST 2' },
      { key: '200', text: 'TEST 3' },
    ];
    component.selectedItemText = option;
    fixture.detectChanges();
    component.onInputFocus();
    expect(spy).toHaveBeenCalledWith(option);
    expect(component.focused).toBeTrue();
  });

  it('#onAutoCompleteOpened should change the inputContainerWidth', () => {
    const defaultContainerWidth = 0;
    fixture.detectChanges();
    component.onAutoCompleteOpened();
    expect(component.inputContainerWidth).not.toEqual(defaultContainerWidth);
  });

  it('#onAutoCompleteClosed should reset the value if selectedItemText key not in the array list', () => {
    const spy = spyOn(component, 'writeValue').and.callThrough();
    component.selectedItemText = '111';
    component.data = [
      { key: '100', text: 'TEST 1' },
      { key: '199', text: 'TEST 2' },
      { key: '200', text: 'TEST 3' },
    ];
    fixture.detectChanges();
    component.onAutoCompleteClosed();
    expect(component.selectedItemText).toEqual(undefined);
    expect(spy).toHaveBeenCalledWith('');
  });

  it('#onInputChange should reset the value if selectedItemText key not in the array list', () => {
    const spy = spyOn(component, 'writeValue').and.callThrough();
    component.selectedItemText = '111';
    component.data = [
      { key: '100', text: 'TEST 1' },
      { key: '199', text: 'TEST 2' },
      { key: '200', text: 'TEST 3' },
    ];
    fixture.detectChanges();
    component.onInputChange();
    expect(component.selectedItemText).toEqual(undefined);
    expect(spy).toHaveBeenCalledWith('');
  });
});
