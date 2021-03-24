import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FloatingButtonMenuComponent } from './button-menu.component';

describe('FloatingButtonMenuComponent', () => {
  let component: FloatingButtonMenuComponent;
  let fixture: ComponentFixture<FloatingButtonMenuComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FloatingButtonMenuComponent],
        imports: [NoopAnimationsModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingButtonMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#expandMenu should change the currentState to final', () => {
    component.expandMenu();
    expect(component.currentState).toEqual('final');
  });

  it('#collapseMenu should change the currentState to initial', () => {
    component.collapseMenu();
    expect(component.currentState).toEqual('initial');
  });

  it('#changeState should change the state to initial if current state is final', () => {
    component.currentState = 'final';
    fixture.detectChanges();
    component.changeState();
    expect(component.currentState).toEqual('initial');
  });

  it('#changeState should change the state to final if current state is initial', () => {
    component.currentState = 'initial';
    fixture.detectChanges();
    component.changeState();
    expect(component.currentState).toEqual('final');
  });

  it('#onMenuClick should emit the selectionChange wth value', () => {
    const option = 'test';
    const spy = spyOn(component.selectionChange, 'emit').and.callThrough();
    component.onMenuClick(option);
    expect(spy).toHaveBeenCalledWith(option);
  });
});
