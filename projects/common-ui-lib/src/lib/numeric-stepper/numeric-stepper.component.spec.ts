import { tick, fakeAsync, async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumericStepperComponent } from './numeric-stepper.component';

describe('NumericStepperComponent', () => {
  let component: NumericStepperComponent;
  let fixture: ComponentFixture<NumericStepperComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NumericStepperComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: ComponentFixtureAutoDetect,
          useValue: true,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericStepperComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.nativeElement.shadowRoot.querySelector('.input__field');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#writeValue should set value', () => {
    const testInput = '999';
    component.writeValue(testInput);
    expect(component.value).toEqual(testInput);
  });

  it('#registerOnChange should call onChange', () => {
    component.registerOnChange(() => {});
    expect(component.onChange).toBeTruthy();
  });

  it('#registerOnTouched should call onTouch', () => {
    component.registerOnTouched(() => {});
    expect(component.onTouch).toBeTruthy();
  });

  it('#setDisabledState should set true', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTruthy();
  });

  it('#disabled should allow no value in input', () => {
    component.disabled = true;
    fixture.detectChanges();
    inputElement.dispatchEvent(new KeyboardEvent('keypress', { key: '1' }));
    expect(component.value).not.toBeTruthy();
  });

  it('#onFocusIn should have been called once focus out from input', () => {
    const spy = spyOn(component, 'onFocusIn').and.callThrough();
    component.writeValue('999');
    inputElement.dispatchEvent(new Event('focus'));
    expect(spy).toHaveBeenCalled();
  });

  it('#onFocusOut should trigger onTouch ', () => {
    const spy = spyOn(component, 'onTouch').and.callThrough();
    component.writeValue('999');
    component.onFocusOut();
    expect(spy).toHaveBeenCalled();
  });

  // testing component with actual input
  it('#paste event should allow matching regexPattern', fakeAsync(() => {
    const event = ({
      preventDefault: () => true,
      clipboardData: {
        getData: () => {
          return '999';
        },
      },
    } as unknown) as ClipboardEvent;
    component.onPaste(event);
    tick(52);
    fixture.detectChanges();
    expect(component.value).toBeFalsy();
  }));

  it('#stepCountReload should return ', () => {
    const testValue = '0';
    component.writeValue(testValue);
    component.stepCountReload(-1);
    expect(component.value).toEqual('0');
  });

  it('#stepCountReload should increase the number of step count ', () => {
    const testValue = '1';
    component.writeValue(testValue);
    component.stepCountReload(1);
    expect(component.value).toEqual('2');
  });
  it('#stepCountReload should decrease the number of step count ', () => {
    const testValue = '2';
    component.writeValue(testValue);
    component.stepCountReload(-1);
    expect(component.value).toEqual('1');
  });

  it('#stepCountReload should decrease the number of step count ', () => {
    const testValue = '2';
    component.writeValue(testValue);
    component.stepCountReload(-1);
    expect(component.value).toEqual('1');
  });

  it('#set value should return 1 if regex does not match', () => {
    const testValue = '1';
    component.value = testValue;
    fixture.detectChanges();
    component.writeValue('abc');
    expect(component.value).toEqual(testValue);

    component.value = null;
    fixture.detectChanges();
    expect(component.value).toEqual(testValue);
  });

  it('#validate should return null if it is valid', () => {
    component.value = '1';
    component.maxValue = '1';
    fixture.detectChanges();
    expect(component.validate('')).toEqual(null);
  });

  it('#validate should return Invalid input value json if it is invalid', () => {
    const expectedValue = { valid: false, message: 'Invalid input value' };
    component.value = '2';
    component.maxValue = '1';
    fixture.detectChanges();
    component.validate('');
    expect(component.validate('')).toEqual(expectedValue);
  });
});
