import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CheckboxComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    component.options = [
      {
        label: 'option 1',
        selected: false,
      },
      {
        label: 'option 2',
        selected: false,
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#writeValue should set the value', () => {
    const selectedOption = {
      label: 'option 2',
      selected: true,
    };
    component.writeValue([selectedOption]);
    expect(component._value).toEqual([selectedOption]);
  });

  it('#registerOnChange should call onChange', () => {
    component.registerOnChange(() => {});
    expect(component.onChange).toBeTruthy();
  });

  it('#registerOnTouched should call onTouch', () => {
    component.registerOnTouched(() => {});
    expect(component.onTouch).toBeTruthy();
  });

  it('#selectionChange should emit stateChanged', () => {
    const spy = spyOn(component.stateChanged, 'emit').and.callThrough();
    component.selectionChange();
    expect(spy).toHaveBeenCalled();
  });
});
