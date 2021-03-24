import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SGTDateFormatShowcaseComponent } from './sgtdate-format-showcase.component';

describe('SGTDateFormatShowcaseComponent', () => {
  let component: SGTDateFormatShowcaseComponent;
  let fixture: ComponentFixture<SGTDateFormatShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SGTDateFormatShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SGTDateFormatShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
