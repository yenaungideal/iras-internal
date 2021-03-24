import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatetimepickersShowcaseComponent } from './datetimepickers-showcase.component';

describe('DatetimepickersShowcaseComponent', () => {
  let component: DatetimepickersShowcaseComponent;
  let fixture: ComponentFixture<DatetimepickersShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatetimepickersShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimepickersShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
