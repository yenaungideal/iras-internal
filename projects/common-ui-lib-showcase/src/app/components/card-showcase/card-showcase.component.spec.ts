import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardShowcaseComponent } from './card-showcase.component';

describe('CardShowcaseComponent', () => {
  let component: CardShowcaseComponent;
  let fixture: ComponentFixture<CardShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
