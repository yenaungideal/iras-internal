import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorShowcaseComponent } from './error-showcase.component';

describe('ErrorShowcaseComponent', () => {
  let component: ErrorShowcaseComponent;
  let fixture: ComponentFixture<ErrorShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
