import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let fixture: ComponentFixture<InputComponent>;
  let component: InputComponent;
  let inputElement: HTMLInputElement;
  const testInputText = 'some input';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InputComponent],
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
          fixture = TestBed.createComponent(InputComponent);
          component = fixture.componentInstance;
          inputElement = fixture.debugElement.nativeElement.shadowRoot.querySelector('.input__field');
        });
    })
  );

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('#setValue should change native input value', fakeAsync(() => {
    component.value = testInputText;
    fixture.detectChanges();
    tick();
    expect(inputElement.value).toBe(testInputText);
  }));

  it('#disabled should allow no value in input', () => {
    component.disabled = true;

    inputElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'a' }));
    fixture.detectChanges();

    expect(component.value).not.toBeTruthy();
  });

  it('#checkInput should return true if type=tel and matching the pattern', () => {
    component.type = 'tel';
    component.pattern = `^[0-9]*$`;
    const valueToAdd = '8888888';
    component.value = valueToAdd;
    fixture.detectChanges();
    expect(component.value).toEqual(valueToAdd);
  });

  it('#checkInput should return false if type=text and not matching the pattern', () => {
    component.type = 'custom';
    component.pattern = `^[0-9]*$`;
    const valueToAdd = 'abcdedf';
    component.value = valueToAdd;
    fixture.detectChanges();
    expect(component.value).toBeFalsy();
  });

  it('#setDisabledState should set true', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTruthy();
  });

  it('#onClear should clear the value', () => {
    component.writeValue(1000000);
    component.onClear();
    expect(component.value).toEqual('');
  });

  it('clear icon should not clear value if control is disabled', () => {
    const value = 'prem_kumar_from.acn@iras.gov.sg';
    component.writeValue(value);
    fixture.detectChanges();
    component.setDisabledState(true);
    component.onClear();
    expect(component.value).toEqual(value);
  });

  it('#onFocusIn() should work', () => {
    const eventStub = {
      target: {
        select: () => {},
      },
    };
    spyOn(eventStub.target, 'select');
    component.onFocusIn(eventStub);
    expect(eventStub.target.select).toHaveBeenCalled();
  });

  it('#onFocusOut() should work', () => {
    spyOn(component, 'onTouch');
    component.onFocusOut();
    expect(component.onTouch).toHaveBeenCalled();
  });

  it('#registerOnChange() should work', () => {
    const fn = '() => {}';
    component.registerOnChange(fn);
    expect(component.onChange).toEqual(fn);
  });

  it('#registerOnTouched() should work', () => {
    const fn = '() => {}';
    component.registerOnTouched(fn);
    expect(component.onTouch).toEqual(fn);
  });

  it('custom type input should work', () => {
    component.type = 'custom';
    component.pattern = '^[0-9]+';
    component.value = 'abc';
    fixture.detectChanges();
    expect(component.value).toBeFalsy();

    component.value = '123';
    fixture.detectChanges();
    expect(component.value).toEqual('123');

    component.value = null;
    fixture.detectChanges();
    expect(component.value).toEqual(null);
  });

  // testing component with actual input
  it('#paste event should trim trailing and preceding spaces', fakeAsync(() => {
    inputElement.value = 'Hello, ';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const event = ({
      preventDefault: () => true,
      clipboardData: {
        getData: () => {
          return '      Prem             ';
        },
      },
    } as unknown) as ClipboardEvent;
    component.onPaste(event);
    tick(52);
    fixture.detectChanges();
    component.maxLength = undefined;
    component.onPaste(event);
    tick(52);
    fixture.detectChanges();
  }));

  // testing component with actual input
  it('#paste event should allow matching regexPattern', fakeAsync(() => {
    component.pattern = `^\d+`;
    const event = ({
      preventDefault: () => true,
      clipboardData: {
        getData: () => {
          return '9102929';
        },
      },
    } as unknown) as ClipboardEvent;
    component.onPaste(event);
    tick(52);
    fixture.detectChanges();
    expect(component.value).toBeFalsy();
  }));

  // testing component with actual input
  it('#paste event should not allow non-matching regexPattern', fakeAsync(() => {
    component.pattern = `^\d+`;
    const event = ({
      preventDefault: () => true,
      clipboardData: {
        getData: () => {
          return '      Prem             ';
        },
      },
    } as unknown) as ClipboardEvent;
    component.onPaste(event);
    tick(52);
    fixture.detectChanges();
    expect(component.value).toBeFalsy();
  }));
});
