import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EmptyStateBoxComponent } from './empty-state-box.component';

describe('EmptyStateBoxComponent', () => {
  let component: EmptyStateBoxComponent;
  let fixture: ComponentFixture<EmptyStateBoxComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EmptyStateBoxComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyStateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
