import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonModalShowcaseComponent } from './non-modal-showcase.component';

describe('NonModalShowcaseComponent', () => {
  let component: NonModalShowcaseComponent;
  let fixture: ComponentFixture<NonModalShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonModalShowcaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonModalShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
