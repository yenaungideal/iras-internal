import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StickyButtonComponent } from './sticky-button.component';

describe('StickyButtonComponent', () => {
  let component: StickyButtonComponent;
  let fixture: ComponentFixture<StickyButtonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StickyButtonComponent],
        imports: [BrowserAnimationsModule],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyButtonComponent);
    component = fixture.componentInstance;
    component.data = { header: 'TestHeader', links: { title: 'test', items: [] } };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onToggleFab should change fabTogglerState inactive to active if current state is inactive', () => {
    component.fabTogglerState = 'inactive';
    fixture.detectChanges();
    component.onToggleFab();
    expect(component.fabTogglerState).toEqual('active');
  });

  it('#onLinkClicked should emit the linkClicked with json', () => {
    const spy = spyOn(component.linkClicked, 'emit').and.callThrough();
    component.onLinkClicked('linkName', 'linkTitle');
    expect(spy).toHaveBeenCalledWith({ linkName: 'linkName', title: 'linkTitle' });
  });
});
