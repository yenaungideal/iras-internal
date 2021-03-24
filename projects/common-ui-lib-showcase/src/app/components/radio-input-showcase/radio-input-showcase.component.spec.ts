import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RadioInputShowcaseComponent } from './radio-input-showcase.component';

describe('RadioInputShowcaseComponent', () => {
  let component: RadioInputShowcaseComponent;
  let fixture: ComponentFixture<RadioInputShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioInputShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioInputShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
