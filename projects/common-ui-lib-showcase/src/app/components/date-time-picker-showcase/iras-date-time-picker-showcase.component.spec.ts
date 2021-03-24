import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IrasDateTimePickerShowcaseComponent } from './iras-date-time-picker-showcase.component';

describe('IrasDateTimePickerShowcaseComponent', () => {
  let component: IrasDateTimePickerShowcaseComponent;
  let fixture: ComponentFixture<IrasDateTimePickerShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IrasDateTimePickerShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrasDateTimePickerShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
