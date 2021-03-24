import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmountInputComponent } from './amount-input.component';

describe('AmountInputComponent', () => {
  let fixture: ComponentFixture<AmountInputComponent>;
  let component: AmountInputComponent;
  let inputElement: HTMLInputElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AmountInputComponent],
        imports: [FormsModule, ReactiveFormsModule],
        providers: [
          {
            provide: ComponentFixtureAutoDetect,
            useValue: true,
          },
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AmountInputComponent);
          component = fixture.componentInstance;
          inputElement = fixture.debugElement.nativeElement.shadowRoot.querySelector('.input__field');
        });
    })
  );

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('#setValue should change native input value', fakeAsync(() => {
    const testInput = '1000';
    component.type = 'amount';
    fixture.detectChanges();
    component.value = testInput;
    fixture.detectChanges();
    tick();
    expect(inputElement.value).toBe(testInput);
  }));

  it('#disabled should allow no value in input', () => {
    component.disabled = true;
    fixture.detectChanges();
    inputElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'a' }));
    expect(component.value).not.toBeTruthy();
  });

  it('#removeCommas should remove commas to the given input and add .00 if type is amount', () => {
    component.type = 'amount';
    fixture.detectChanges();
    component.writeValue('1000000');
    component.removeCommas();
    expect(component.value).toEqual('1000000.00');
  });

  it('#onFocusOut should addCommas if type is amount', () => {
    component.type = 'amount';
    fixture.detectChanges();
    component.writeValue(1000000);
    component.onFocusOut();
    expect(component.value).toEqual('1,000,000.00');
  });

  it('#onFocusOut should addCommas if type is gridAmountFilter', () => {
    component.type = 'gridAmountFilter';
    fixture.detectChanges();
    component.writeValue(1000000);
    component.onFocusOut();
    expect(component.value).toEqual('1,000,000');
  });

  it('#setDisabledState should set true', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTruthy();
  });

  it('#onFocusOut should clear if value is -', () => {
    const spy = spyOn(component, 'onClear').and.callThrough();
    component.type = 'amount';
    fixture.detectChanges();
    component.writeValue('-');
    component.onFocusOut();
    expect(spy).toHaveBeenCalled();
  });

  it('#onFocusIn should removeCommas if type is amount', fakeAsync(() => {
    const spy = spyOn(component, 'removeCommas').and.callThrough();
    component.type = 'amount';
    fixture.detectChanges();
    component.writeValue(1000000);
    inputElement.dispatchEvent(new Event('focus'));
    tick(1000);
    expect(spy).toHaveBeenCalled();
  }));

  it('#onFocusIn should removeCommas if type is gridAmountFilter', fakeAsync(() => {
    const spy = spyOn(component, 'removeCommas').and.callThrough();
    component.type = 'gridAmountFilter';
    fixture.detectChanges();
    component.writeValue(1000000);
    inputElement.dispatchEvent(new Event('focus'));
    tick(1000);
    expect(spy).toHaveBeenCalled();
  }));

  it('#addCommas should return null when input is undefined', () => {
    component.type = 'amount';
    fixture.detectChanges();
    component.writeValue(undefined);
    component.addCommas();
    expect(component.value).toEqual('');
  });
  it('#removeCommas should return null when input is undefined', () => {
    component.writeValue(undefined);
    component.removeCommas();
    expect(component.value).toEqual('');
  });

  it('#onClear should clear the value', () => {
    component.writeValue(1000000);
    component.onClear();
    expect(component.value).toEqual('');
  });
  it('#addCommas should add commas to the given input if type is amount', () => {
    component.type = 'amount';
    fixture.detectChanges();
    component.writeValue(1000000);
    component.addCommas();
    expect(component.value).toEqual('1,000,000.00');
  });

  it('#addCommas should add commas to the given input  if type is gridAmountFilter', () => {
    component.type = 'gridAmountFilter';
    fixture.detectChanges();
    component.writeValue(1000000);
    component.addCommas();
    expect(component.value).toEqual('1,000,000');
  });

  it('#onFocusOut should add zero if type is amount', () => {
    component.type = 'amount';
    fixture.detectChanges();
    component.writeValue(1000000.9);
    component.onFocusOut();
    expect(component.value).toEqual('1,000,000.90');
  });

  it('clear icon should not clear value if control is disabled', () => {
    const value = '1000';
    const expectedValue = '1,000.00';
    component.type = 'amount';
    fixture.detectChanges();
    component.writeValue(value);
    component.setDisabledState(true);
    component.onClear();
    expect(component.value).toEqual(expectedValue);
  });

  it('clear icon should clear value if control is enabled', () => {
    const value = '1000';
    const expectedValue = '';
    component.type = 'amount';
    fixture.detectChanges();
    component.writeValue(value);
    component.setDisabledState(false);
    component.onClear();
    expect(component.value).toEqual(expectedValue);
  });

  it('#checkInput should return false if allowNegative false', () => {
    const val = '-132';
    component.type = 'amount';
    component.allowNegative = false;
    fixture.detectChanges();
    expect(component.checkInput({ currentValue: val })).toBe(false);
  });

  it('#checkInput should return true if allowNegative true', () => {
    const val = '-132';
    component.type = 'amount';
    component.allowNegative = true;
    fixture.detectChanges();
    expect(component.checkInput({ currentValue: val })).toBe(true);
  });
});
