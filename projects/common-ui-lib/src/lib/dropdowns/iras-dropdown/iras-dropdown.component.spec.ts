import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IrasDropdownsModule } from '../dropdowns.module';
import { IrasDropdownComponent } from './iras-dropdown.component';

describe('IrasDropdownComponent', () => {
  let component: IrasDropdownComponent;
  let fixture: ComponentFixture<IrasDropdownComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IrasDropdownsModule, BrowserAnimationsModule],
        declarations: [IrasDropdownComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IrasDropdownComponent);
    component = fixture.componentInstance;
    component.data = [{ key: 'test option', text: 'test option' }];
    component.irasSelectOverPanel = { style: { display: 'default', opacity: '1' } };
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
    component.onSelectionChange({});
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(option);
  });

  it('#onOpenedChange should focus matSelect when selectOpened is true', fakeAsync(() => {
    const spy = spyOn(component.matSelect, 'focus').and.callThrough();
    component.selectOpened = true;
    fixture.detectChanges();
    component.onOpenedChange(true);
    tick(100);
    expect(spy).toHaveBeenCalled();
  }));

  it('#closeDropDown should close matSelect', () => {
    const spy = spyOn(component.matSelect, 'close').and.callThrough();
    component.selectOpened = true;
    fixture.detectChanges();
    component.closeDropDown();
    expect(spy).toHaveBeenCalled();
  });

  it('#div click should open autoComplete panel', fakeAsync(() => {
    const spy = spyOn(component.matSelect, 'open').and.callThrough();
    component.data = [
      { key: '100', text: 'TEST 1' },
      { key: '199', text: 'TEST 2' },
      { key: '200', text: 'TEST 3' },
    ];
    component.selectOpened = false;
    fixture.detectChanges();

    fixture.debugElement.nativeElement.shadowRoot
      .querySelector('.iras-select__selector')
      .dispatchEvent(new Event('click'));

    tick(10);
    expect(spy).toHaveBeenCalled();
  }));

  it('#onSelectFocus should update selectFocused', () => {
    component.onSelectFocus();
    expect(component.selectFocused).toBeTrue();
  });

  it('#onSelectBlur should update selectFocused', () => {
    component.onSelectBlur();
    expect(component.selectFocused).toBeFalse();
  });
});
