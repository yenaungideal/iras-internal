import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckboxInputShowcaseComponent } from './checkbox-input-showcase.component';

describe('CheckboxInputShowcaseComponent', () => {
  let component: CheckboxInputShowcaseComponent;
  let fixture: ComponentFixture<CheckboxInputShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxInputShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxInputShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
