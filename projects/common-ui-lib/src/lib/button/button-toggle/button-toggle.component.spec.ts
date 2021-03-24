import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ButtonToggleComponent } from './button-toggle.component';

const dataToUseForAllTests = {
  data: ['With Duty', 'Exempt', 'Remit', 'No Duty', 'Relief'],
  name: 'ExampleButtonToggle',
  disabled: false,
  defaultValue: 'With Duty',
};

describe('ButtonToggleComponent', () => {
  let component: ButtonToggleComponent;
  let fixture: ComponentFixture<ButtonToggleComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ButtonToggleComponent],
        imports: [MatButtonToggleModule],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonToggleComponent);
    component = fixture.componentInstance;
    component.data = dataToUseForAllTests.data;
    component.name = dataToUseForAllTests.name;
    component.defaultValue = dataToUseForAllTests.defaultValue;
    component.disabled = dataToUseForAllTests.disabled;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#stateDisabled, container element has disabled class', () => {
    component.disabled = true;
    fixture.detectChanges();

    const element = fixture.debugElement.nativeElement;
    const classList = element.shadowRoot
      .querySelector('.mat-button-toggle-group > .mat-button-toggle')
      .getAttribute('class');
    expect(classList.includes('mat-button-toggle-disabled')).toBeTrue();
  });

  it('#stateEnabled, container element do not has disabled class', () => {
    component.disabled = false;
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    const classList = element.shadowRoot
      .querySelector('.mat-button-toggle-group > .mat-button-toggle')
      .getAttribute('class');
    expect(classList.includes('mat-button-toggle-disabled')).not.toBeTrue();
  });

  it('raise the selection changed', () => {
    const fakeData = { key: 'Test', value: 'TestValue' };
    component.selectionChange.subscribe((selectedValue) => {
      expect(selectedValue).toBe(fakeData.value);
    });
    component.buttonToggleSelect(fakeData);
    fixture.detectChanges();
  });

  it('#ngOnChanges should work', () => {
    const spy = spyOn(component.selectionChange, 'emit').and.callThrough();
    component.defaultValue = 'Relief';
    fixture.detectChanges();
    component.ngOnChanges({
      defaultValue: {
        isFirstChange: () => false,
        previousValue: 'With Duty',
        currentValue: 'Relief',
        firstChange: false,
      },
    });
    expect(component.value).toEqual('Relief');
    expect(spy).toHaveBeenCalledWith('Relief');
  });

  it('should not display With Duty as default selected value', () => {
    component.defaultValue = 'Exempt';
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    const classList = element.shadowRoot
      .querySelector('.mat-button-toggle-group > .mat-button-toggle')
      .getAttribute('class');
    expect(classList.includes('mat-button-toggle-checked')).not.toBeTrue();
  });
  it('should not display default selected value if value is empty or not included in data list', () => {
    component.defaultValue = '';
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    const classList = element.shadowRoot
      .querySelector('.mat-button-toggle-group > .mat-button-toggle')
      .getAttribute('class');
    expect(classList.includes('mat-button-toggle-checked')).not.toBeTrue();
  });
});
