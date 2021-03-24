import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RecordHeaderComponent } from './record-header.component';

describe('RecordHeaderComponent', () => {
  let component: RecordHeaderComponent;
  let fixture: ComponentFixture<RecordHeaderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RecordHeaderComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
