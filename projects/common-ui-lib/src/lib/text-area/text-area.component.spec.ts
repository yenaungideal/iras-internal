import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextAreaComponent } from './text-area.component';

describe('TextAreaComponent', () => {
  let fixture: ComponentFixture<TextAreaComponent>;
  let component: TextAreaComponent;
  let inputElement: HTMLInputElement;
  const testInputText = 'some input';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TextAreaComponent],
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
          fixture = TestBed.createComponent(TextAreaComponent);
          component = fixture.componentInstance;
          inputElement = fixture.debugElement.nativeElement.shadowRoot.querySelector('.input__field');
        });
    })
  );

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('#writeValue should set the value', () => {
    component.writeValue(testInputText);
    expect(component.value).toEqual(testInputText);
  });

  it('#setValue should change native input value', fakeAsync(() => {
    component.value = testInputText;
    fixture.detectChanges();
    tick();
    expect(inputElement.value).toBe(testInputText);
  }));

  it('#registerOnChange should call onChange', () => {
    component.registerOnChange(() => {});
    expect(component.onChange).toBeTruthy();
  });

  it('#registerOnTouched should call onTouch', () => {
    component.registerOnTouched(() => {});
    expect(component.onTouch).toBeTruthy();
  });

  it('#onFocusIn should select the input value', () => {
    const spy = spyOn(component, 'onFocusIn').and.callThrough();
    component.value = testInputText;
    fixture.detectChanges();
    inputElement.dispatchEvent(new Event('focus'));
    expect(spy).toHaveBeenCalled();
  });

  it('#disabled should allow no value in input', () => {
    component.disabled = true;

    inputElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'a' }));
    fixture.detectChanges();

    expect(component.value).not.toBeTruthy();
  });

  it('#setDisabledState should set true', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTruthy();
  });

  it('null value should work', () => {
    component.value = null;
    fixture.detectChanges();
    expect(component.value).toEqual(null);
  });

  it('component should have empty value', () => {
    component.value = '';
    fixture.detectChanges();
    expect(component.value).toEqual('');
  });

  it('#check input should allow valid regex input', () => {
    component.regexPattern = `^[0-9]*$`;
    const valueToAdd = '8888888';
    component.value = valueToAdd;
    fixture.detectChanges();
    expect(component.value).toEqual(valueToAdd);
  });

  it('#check input should clear invalid regex input', () => {
    component.regexPattern = `^[0-9]*$`;
    const valueToAdd = 'abcdedf';
    component.value = valueToAdd;
    fixture.detectChanges();
    expect(component.value).toBeFalsy();
  });

  // testing component with actual input
  it('#paste event should trim trailing and preceding spaces', fakeAsync(() => {
    inputElement.value = 'Hello, ';
    component.maxLength = 5;
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
    component.regexPattern = '@"^d$"';
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
    component.regexPattern = '@"^d$"';
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
