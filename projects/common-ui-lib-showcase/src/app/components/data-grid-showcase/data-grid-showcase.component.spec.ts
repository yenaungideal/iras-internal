import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataGridShowcaseComponent } from './data-grid-showcase.component';

describe('DataGridShowcaseComponent', () => {
  let component: DataGridShowcaseComponent;
  let fixture: ComponentFixture<DataGridShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DataGridShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
