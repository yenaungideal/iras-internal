import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmptyStateBoxShowcaseComponent } from './empty-state-box-showcase.component';

describe('EmptyStateBoxShowcaseComponent', () => {
  let component: EmptyStateBoxShowcaseComponent;
  let fixture: ComponentFixture<EmptyStateBoxShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyStateBoxShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyStateBoxShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
