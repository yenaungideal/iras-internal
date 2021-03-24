import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks, waitForAsync } from '@angular/core/testing';
import { IrasMultiSelectNestedDropdownComponent } from './iras-multi-select-nested-dropdown.component';
import { IrasDropdownsModule } from '../dropdowns.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('IrasMultiSelectNestedDropdownComponent', () => {
  let component: IrasMultiSelectNestedDropdownComponent;
  let fixture: ComponentFixture<IrasMultiSelectNestedDropdownComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IrasDropdownsModule, BrowserAnimationsModule],
        declarations: [IrasMultiSelectNestedDropdownComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IrasMultiSelectNestedDropdownComponent);
    component = fixture.componentInstance;
    component.data = [
      {
        key: 'selectAll',
        options: [],
        selected: false,
        text: 'Select All',
      },
      {
        selected: false,
        key: 'A',
        text: 'Test 1',
        options: [
          {
            key: 'A1',
            text: 'Test 1-A',
            selected: true,
          },
          {
            key: 'A2',
            text: 'Test 1-B',
            selected: false,
          },
        ],
      },
      {
        selected: false,
        text: 'Test 2',
        key: 'B',
        options: [
          {
            text: 'Test 2-A',
            key: 'B1',
            selected: false,
          },
        ],
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#writeValue should set value', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const option = ['A1', 'B1'];
    component.writeValue(option);
    expect(spy).toHaveBeenCalledWith(option);
  });

  it('#removeSelectedOption should call notifyChange and emit selected value', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const option = [
      {
        key: 'selectAll',
        options: [],
        selected: false,
        text: 'Select All',
      },
      {
        selected: false,
        key: 'A',
        text: 'Test 1',
        options: [
          {
            key: 'A1',
            text: 'Test 1-A',
            selected: false,
          },
          {
            key: 'A2',
            text: 'Test 1-B',
            selected: false,
          },
        ],
      },
      {
        selected: false,
        text: 'Test 2',
        key: 'B',
        options: [
          {
            text: 'Test 2-A',
            key: 'B1',
            selected: false,
          },
        ],
      },
    ];
    component.removeSelectedOption('A1');
    expect(component.data).toEqual(option);
    expect(spy).toHaveBeenCalledWith([]);
  });

  it('#onOptionChanged should emit the notify change with selected keys', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const onOptionChanged = {
      selected: false,
      text: 'ABC Pte Ltd, UEN-LOCAL CO 199012345A',
      key: 'B',
      options: [
        {
          text: 'Step 1) Nikon Japan Pte Ltd to Nikon Asia Pte Ltd',
          key: 'B1',
          selected: true,
        },
      ],
    };
    const levelType = 'secondaryOption';
    component.onOptionChanged(onOptionChanged, levelType);
    expect(spy).toHaveBeenCalledWith(['A1']);
  });

  it('#onOptionChanged should emit the notify change with select all', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const onOptionChanged = {
      key: 'selectAll',
      text: 'Select All',
      selected: true,
      options: [],
    };
    const levelType = 'primaryOption';
    component.onOptionChanged(onOptionChanged, levelType);
    expect(spy).toHaveBeenCalledWith(['A1', 'A2', 'B1']);
  });

  it('#onOptionChanged should emit the notify change with unSelect all', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const onOptionChanged = {
      key: 'selectAll',
      text: 'Select All',
      selected: false,
      options: [],
    };
    const levelType = 'primaryOption';
    component.onOptionChanged(onOptionChanged, levelType);
    expect(spy).toHaveBeenCalledWith([]);
  });

  it('#onOptionChanged should emit the notify change with parent level selected key', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const onOptionChanged = {
      selected: true,
      key: 'A',
      text: 'Test 1',
      options: [
        {
          key: 'A1',
          text: 'Test 1-A',
          selected: false,
        },
        {
          key: 'A2',
          text: 'Test 1-B',
          selected: false,
        },
      ],
    };
    const levelType = 'primaryOption';
    component.onOptionChanged(onOptionChanged, levelType);
    expect(spy).toHaveBeenCalledWith(['A1', 'A2']);
  });

  it('#onOptionChanged should emit the notify change with parent level unSelect key', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const onOptionChanged = {
      selected: false,
      key: 'A',
      text: 'Test 1',
      options: [
        {
          key: 'A1',
          text: 'Test 1-A',
          selected: true,
        },
        {
          key: 'A2',
          text: 'Test 1-B',
          selected: true,
        },
      ],
    };
    const levelType = 'primaryOption';
    component.onOptionChanged(onOptionChanged, levelType);
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
            options: [
              {
                key: 'A1',
                text: 'Step 1) Nikon Pte Ltd to Nikon Asia Pte Ltd',
                selected: false,
              },
              {
                key: 'A2',
                text: 'Step 2) Nikon Asia Pte Ltd to Nikon Japan Pte Ltd',
                selected: false,
              },
              {
                key: 'A3',
                text: 'Step 3',
                selected: false,
              },
              {
                key: 'A4',
                text: 'Step 4) Nikon Pte Ltd to Nikon Asia Pte Ltd',
                selected: false,
              },
              {
                key: 'A5',
                text: 'Step 5) Nikon Asia Pte Ltd to Nikon Japan Pte Ltd',
                selected: false,
              },
              {
                key: 'A6',
                text: 'Step 6',
                selected: false,
              },
            ],
          },
          {
            selected: false,
            text: 'ABC Pte Ltd, UEN-LOCAL CO 199012345A',
            key: 'B',
            options: [
              {
                text: 'Step 1) Nikon Japan Pte Ltd to Nikon Asia Pte Ltd',
                key: 'B1',
                selected: false,
              },
            ],
          },
        ],
        currentValue: [
          {
            selected: false,
            key: 'A',
            text: 'Test 1',
            options: [
              {
                key: 'A1',
                text: 'Test 1-A',
                selected: false,
              },
              {
                key: 'A2',
                text: 'Test 1-B',
                selected: false,
              },
            ],
          },
          {
            selected: false,
            text: 'Test 2',
            key: 'B',
            options: [
              {
                text: 'Test 2-A',
                key: 'B1',
                selected: false,
              },
            ],
          },
        ],
        firstChange: false,
      },
    });
    expect(component.data.length).toEqual(3);
  });
});
