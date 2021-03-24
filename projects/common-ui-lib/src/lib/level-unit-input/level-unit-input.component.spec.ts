import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LevelUnitInputComponent } from './level-unit-input.component';

describe('LevelUnitInputComponent', () => {
  let component: LevelUnitInputComponent;
  let fixture: ComponentFixture<LevelUnitInputComponent>;
  let levelInputEl: HTMLInputElement;
  let unitInputEl: HTMLInputElement;
  const testLevelInput = 'B1';
  const testUnitInput = '10';
  const testInputValue = { level: 'B1', unit: '10' };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LevelUnitInputComponent],
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
          fixture = TestBed.createComponent(LevelUnitInputComponent);
          component = fixture.componentInstance;
          component.fieldName = { errors: { required: true } };
          fixture.detectChanges();
          levelInputEl = component.levelInput.nativeElement;
          unitInputEl = component.unitInput.nativeElement;
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#setValue should change native input value', fakeAsync(() => {
    component.ngOnInit();
    component.value = testInputValue;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.level.value).toBe(testLevelInput);
      expect(component.unit.value).toBe(testUnitInput);
    });
  }));

  it('level input should enable unit input', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = 'B1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.disabled).toBeFalsy();
      expect(component.unit.invalid).toBeTruthy();
    });
  }));

  it('level input should only accept numeric or B, b, M, m as first char for input', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = 'B1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeTruthy();

      levelInputEl.value = 'b1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeTruthy();

      levelInputEl.value = 'M1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeTruthy();

      levelInputEl.value = 'm1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeTruthy();

      levelInputEl.value = '11';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeTruthy();

      levelInputEl.value = 'A1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeFalsy();
    });
  }));

  it('level input should only accept numeric as second char for input', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = 'b1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeTruthy();

      levelInputEl.value = 'bb';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeFalsy();
    });
  }));

  it('level input should not accept 00 as first 2 chars for input', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = '00';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeFalsy();
    });
  }));

  it('level input should only accept numeric as third char for input ', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = 'B12';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeTruthy();

      levelInputEl.value = 'B1A';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeFalsy();
    });
  }));

  it('level input should not accept 0 as first char if input is 3 chars', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = '011';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeFalsy();
    });
  }));

  it('level input should not accept all chars as letters for input', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = 'Bbb';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeFalsy();
    });
  }));

  it('unit input should only accept 2-5 chars input', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = 'B1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.enabled).toBeTruthy();

      unitInputEl.value = 'A';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeFalsy();

      unitInputEl.value = 'A1';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeTruthy();

      unitInputEl.value = 'A11';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeTruthy();

      unitInputEl.value = 'A11a';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeTruthy();

      unitInputEl.value = 'A1B1C';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeTruthy();

      unitInputEl.value = 'A1B1C1';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeFalsy();
    });
  }));

  it('unit input should not accept whitespace or dot for input', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = 'B1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.enabled).toBeTruthy();

      unitInputEl.value = '  ';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeFalsy();

      unitInputEl.value = 'A.';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeFalsy();
    });
  }));

  it('unit input should not accept 000 as first 3 chars for input', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = 'B1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.enabled).toBeTruthy();

      unitInputEl.value = '000';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeFalsy();
    });
  }));

  it('unit input should only accept inputs when first char is letter or 0, second char must be numeric', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = 'B1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.enabled).toBeTruthy();

      unitInputEl.value = '01';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeTruthy();

      unitInputEl.value = 'A1';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeTruthy();

      unitInputEl.value = '0A';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeFalsy();
    });
  }));

  it('unit input should only accept inputs when first char is from 1-9, second char must be alphanumeric', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = 'B1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.enabled).toBeTruthy();

      unitInputEl.value = '1A';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeTruthy();

      unitInputEl.value = '11';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeTruthy();

      unitInputEl.value = '1_';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeFalsy();
    });
  }));

  it('unit input should only accept 5 chars input only if either third or fourth char is numeric', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = 'B1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.enabled).toBeTruthy();

      unitInputEl.value = '1A1B1';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeTruthy();

      unitInputEl.value = '1ABC1';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeFalsy();

      unitInputEl.value = '1AB21';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeTruthy();
    });
  }));

  it('unit input should not accept an input with 5 numeric chars', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = 'B1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.enabled).toBeTruthy();

      unitInputEl.value = '11111';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeFalsy();
    });
  }));
  it('unit input should only accept inputs with alphanumeric first and last chars', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = 'B1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.enabled).toBeTruthy();

      unitInputEl.value = '-01';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeFalsy();

      unitInputEl.value = 'A0_';
      unitInputEl.dispatchEvent(new Event('input'));
      expect(component.unit.valid).toBeFalsy();
    });
  }));

  it('level input should not accept whitespace input', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = '  ';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeFalsy();
    });
  }));

  it('level input should only accept 2-3 chars input', fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      levelInputEl.value = 'B';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeFalsy();

      levelInputEl.value = 'B1';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeTruthy();

      levelInputEl.value = 'B11';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeTruthy();

      levelInputEl.value = 'B112';
      levelInputEl.dispatchEvent(new Event('input'));
      expect(component.level.valid).toBeFalsy();
    });
  }));

  it('#setDisabledState should set true', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTruthy();
  });

  it('#writeValue should change native input value', fakeAsync(() => {
    component.ngOnInit();
    component.value = testInputValue;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const newValue = { level: 'B2', unit: '10' };
      component.writeValue(newValue);
      expect(component.level.value).toBe(newValue.level);
      expect(component.unit.value).toBe(newValue.unit);
    });
  }));

  it('#registerOnTouched() should work', () => {
    const fn = '() => {}';
    component.registerOnTouched(fn);
    expect(component.onTouch).toEqual(fn);
  });

  it('#onClear should clear the value', fakeAsync(() => {
    component.ngOnInit();
    component.value = testInputValue;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.onClear('level');
      expect(component.level.value).toEqual('');
      component.onClear('unit');
      expect(component.unit.value).toEqual('');
    });
  }));

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

  it('#ngOnChanges disabled change should work to disable level and unit input if true', fakeAsync(() => {
    component.disabled = true;
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.ngOnChanges({
        disabled: {
          isFirstChange: () => false,
          previousValue: false,
          currentValue: true,
          firstChange: false,
        },
      });
      expect(component.level.disabled).toBeTruthy();
      expect(component.unit.disabled).toBeTruthy();
    });
  }));

  it('#ngOnChanges should set level enabled and unit disable if level empty and disabled is false', fakeAsync(() => {
    component.disabled = true;
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.ngOnChanges({
        disabled: {
          isFirstChange: () => false,
          previousValue: true,
          currentValue: false,
          firstChange: false,
        },
      });
      expect(component.level.enabled).toBeTruthy();
      expect(component.unit.disabled).toBeTruthy();
    });
  }));

  it('#ngOnChanges should set level enabled and unit enabled if level is not empty and disabled is false', fakeAsync(() => {
    component.value = { level: 'B2', unit: '' };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.ngOnChanges({
        disabled: {
          isFirstChange: () => false,
          previousValue: true,
          currentValue: false,
          firstChange: false,
        },
      });
      expect(component.level.enabled).toBeTruthy();
      expect(component.unit.enabled).toBeTruthy();
    });
  }));

  it('#validate should return required true', fakeAsync(() => {
    component.ngOnInit();
    component.value = null;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.validate(new FormControl(''))).toEqual({ required: true });
    });
  }));

  it('#validate should return invalidLevelUnit if value not empty', fakeAsync(() => {
    component.ngOnInit();
    component.value = null;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.value = { level: 'B2', unit: '' };
      fixture.detectChanges();
      expect(component.validate(new FormControl(''))).toEqual({
        invalidLevelUnit: { valid: false, message: 'Invalid input for level/unit.' },
      });
    });
  }));
});
