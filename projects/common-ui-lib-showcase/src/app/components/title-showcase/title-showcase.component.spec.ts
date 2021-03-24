import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TitleShowcaseComponent } from './title-showcase.component';

describe('TitleShowcaseComponent', () => {
  let component: TitleShowcaseComponent;
  let fixture: ComponentFixture<TitleShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
