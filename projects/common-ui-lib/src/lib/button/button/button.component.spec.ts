import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ButtonComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#stateDisabled, container element has disabled class', () => {
    component.disabled = true;
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    const classList = element.shadowRoot.querySelector('.iras-button__container').getAttribute('class');
    expect(classList.includes('iras-button__container--disabled')).toBeTrue();
  });
  it('#stateEnabled, container element does not have disabled class', () => {
    component.disabled = false;
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    const classList = element.shadowRoot.querySelector('.iras-button__container').getAttribute('class');
    expect(classList.includes('iras-button__container--disabled')).not.toBeTrue();
  });

  it('#onButtonClick should emit buttonClicked', () => {
    const spy = spyOn(component.buttonClicked, 'emit').and.callThrough();
    component.buttonType = 'button';
    component.onButtonClick('');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('#computeButtonClass, should emits style', () => {
    component.fill = 'solid';
    component.shape = 'round';
    component.size = 'default';
    component.color = 'primary';
    expect(component.computeButtonClass()).toEqual(
      JSON.parse(
        '{"iras-button__fill--solid": true, "iras-button__shape--round": true, "iras-button__size--default": true, "iras-color iras-color-primary iras-button__color--primary": true}'
      )
    );
  });

  it('#computeButtonClass, should emit default style', () => {
    expect(component.computeButtonClass()).toEqual(
      JSON.parse(
        '{"iras-button__fill--solid": true, "iras-button__shape--round": true, "iras-button__size--default": true, "iras-color iras-color-primary iras-button__color--primary": true}'
      )
    );
  });
});
