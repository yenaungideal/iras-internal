import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaskedInputShowcaseComponent } from './masked-input-showcase.component';

describe('MaskedInputShowcaseComponent', () => {
  let component: MaskedInputShowcaseComponent;
  let fixture: ComponentFixture<MaskedInputShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskedInputShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskedInputShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
