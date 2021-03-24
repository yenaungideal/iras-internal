import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StepperViewComponent } from './stepper-view.component';

describe('StepperViewComponent', () => {
  let component: StepperViewComponent;
  let fixture: ComponentFixture<StepperViewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StepperViewComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
