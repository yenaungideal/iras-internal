import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputShowcaseComponent } from './input-showcase.component';

describe('InputShowcaseComponent', () => {
  let component: InputShowcaseComponent;
  let fixture: ComponentFixture<InputShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
