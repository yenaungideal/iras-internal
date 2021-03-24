import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { IrasErrorModule } from './error.module';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  const errorDescription = {
    headerTitle: 'Sorry',
    description: ['System has encountered some technical problems', 'Please try again later.'],
    action: 'BACK TO MYTAX PORTAL',
    others: ['If the problem persists, please contact us'],
    timestamp: '13 Jan 2021 06:30 PM 13/1/21-O8P',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      imports: [IrasErrorModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    component.errorDescription = errorDescription;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
