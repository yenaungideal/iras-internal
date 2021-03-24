import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NumericStepperShowcaseComponent } from './numeric-stepper-showcase.component';

describe('InputShowcaseComponent', () => {
  let component: NumericStepperShowcaseComponent;
  let fixture: ComponentFixture<NumericStepperShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NumericStepperShowcaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericStepperShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
