import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaginationShowcaseComponent } from './pagination-showcase.component';

describe('PaginationShowcaseComponent', () => {
  let component: PaginationShowcaseComponent;
  let fixture: ComponentFixture<PaginationShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
