import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpinnerShowcaseComponent } from './spinner-showcase.component';

describe('SpinnerShowcaseComponent', () => {
  let component: SpinnerShowcaseComponent;
  let fixture: ComponentFixture<SpinnerShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
