import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks, waitForAsync } from '@angular/core/testing';
import { IrasMultiSelectDropdownComponent } from './iras-multi-select-dropdown.component';
import { IrasDropdownsModule } from '../dropdowns.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('IrasMultiSelectDropdownComponent', () => {
  let component: IrasMultiSelectDropdownComponent;
  let fixture: ComponentFixture<IrasMultiSelectDropdownComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IrasDropdownsModule, BrowserAnimationsModule],
        declarations: [IrasMultiSelectDropdownComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IrasMultiSelectDropdownComponent);
    component = fixture.componentInstance;
    component.data = [
      {
        key: 'selectAll',
        selected: false,
        text: 'Select All',
      },
      {
        selected: false,
        key: 'A',
        text: 'Test 1',
      },
      {
        selected: false,
        text: 'Test 2',
        key: 'B',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#writeValue should set value', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const option = ['A', 'B'];
    component.writeValue(option);
    expect(spy).toHaveBeenCalledWith(option);
  });

  it('#removeSelectedOption should call notifyChange and emit selected value', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    component.data = [
      {
        key: 'selectAll',
        selected: false,
        text: 'Select All',
      },
      {
        selected: true,
        key: 'A',
        text: 'Test 1',
      },
      {
        selected: false,
        text: 'Test 2',
        key: 'B',
      },
    ];
    fixture.detectChanges();
    const option = [
      {
        key: 'selectAll',
        selected: false,
        text: 'Select All',
      },
      {
        selected: false,
        key: 'A',
        text: 'Test 1',
      },
      {
        selected: false,
        text: 'Test 2',
        key: 'B',
      },
    ];
    component.removeSelectedOption('A');
    expect(component.data).toEqual(option);
    expect(spy).toHaveBeenCalledWith([]);
  });

  it('#onOptionChanged should emit the notify change with selected keys', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const onOptionChanged = {
      selected: true,
      text: 'ABC Pte Ltd, UEN-LOCAL CO 199012345A',
      key: 'B',
    };
    component.onOptionChanged(onOptionChanged);
    expect(spy).toHaveBeenCalledWith(['B']);
  });

  it('#onOptionChanged should emit the notify change with select all', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const onOptionChanged = {
      key: 'selectAll',
      text: 'Select All',
      selected: true,
    };
    component.onOptionChanged(onOptionChanged);
    expect(spy).toHaveBeenCalledWith(['A', 'B']);
  });

  it('#onOptionChanged should emit the notify change with unSelect all', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const onOptionChanged = {
      key: 'selectAll',
      text: 'Select All',
      selected: false,
    };
    component.onOptionChanged(onOptionChanged);
    expect(spy).toHaveBeenCalledWith([]);
  });

  it('#onOptionChanged should emit the notify change with parent level selected key', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const onOptionChanged = {
      selected: true,
      key: 'A',
      text: 'Test 1',
    };
    component.onOptionChanged(onOptionChanged);
    expect(spy).toHaveBeenCalledWith(['A']);
  });

  it('#onOptionChanged should emit the notify change with parent level unSelect key', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const onOptionChanged = {
      selected: false,
      key: 'A',
      text: 'Test 1',
    };

    component.onOptionChanged(onOptionChanged);
    expect(spy).toHaveBeenCalledWith([]);
  });

  it('#registerOnChange should call onChange', () => {
    component.registerOnChange(() => {});
    expect(component.onChange).toBeTruthy();
  });

  it('#registerOnTouched should call onTouch', () => {
    component.registerOnTouched(() => {});
    expect(component.onTouch).toBeTruthy();
  });

  it('#setDisabledState should change the disabled state', () => {
    component.disabled = false;
    fixture.detectChanges();
    component.setDisabledState(true);
    expect(component.disabled).toBeTrue();
  });

  it('#showDropdown should trigger the dropdown.show method', () => {
    const spy = spyOn(component.dropdown, 'show').and.callThrough();
    component.disabled = false;
    fixture.detectChanges();
    component.showDropdown({});
    expect(spy).toHaveBeenCalled();
  });

  it('#ngOnChanges should work', () => {
    component.ngOnChanges({
      data: {
        isFirstChange: () => false,
        previousValue: [
          {
            selected: false,
            key: 'A',
            text: '99A Newton Road S(307987) #10-01, #10-02',
          },
          {
            selected: false,
            text: 'ABC Pte Ltd, UEN-LOCAL CO 199012345A',
            key: 'B',
          },
        ],
        currentValue: [
          {
            selected: false,
            key: 'A',
            text: 'Test 1',
          },
          {
            selected: false,
            text: 'Test 2',
            key: 'B',
          },
        ],
        firstChange: false,
      },
    });
    expect(component.data.length).toEqual(3);
  });

  it('#hideDropdown should trigger When the caret icon click event triggered', () => {
    const spy = spyOn(component.dropdown, 'show').and.callThrough();
    component.disabled = false;
    fixture.detectChanges();
    component.showDropdown({});
    const element = fixture.debugElement.nativeElement;
    element.querySelector('.custom-multi-select__dropdown').click();
    expect(spy).toHaveBeenCalled();
  });
});
