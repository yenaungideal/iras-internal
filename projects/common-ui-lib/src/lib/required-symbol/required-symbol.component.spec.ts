import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IrasRequiredSymbolComponent } from './required-symbol.component';

describe('RequiredSymbolComponent', () => {
  let component: IrasRequiredSymbolComponent;
  let fixture: ComponentFixture<IrasRequiredSymbolComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [IrasRequiredSymbolComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IrasRequiredSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
