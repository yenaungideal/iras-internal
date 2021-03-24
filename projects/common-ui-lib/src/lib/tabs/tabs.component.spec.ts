import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TabsComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    component.tabs = [
      {
        title: 'test',
        templateRef: null,
        selected: false,
      },
      {
        title: 'test2',
        templateRef: null,
        selected: false,
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onTabSelect should emit tabSelected', () => {
    const option = { title: 'test', templateRef: null, selected: true };
    const spy = spyOn(component.tabSelected, 'emit').and.callThrough();
    component.onTabSelect(option);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(option);
  });

  it('#ngOnChanges should work', () => {
    const option = [
      {
        title: 'hello',
        templateRef: null,
        selected: false,
      },
      {
        title: 'hey',
        templateRef: null,
        selected: true,
      },
    ];
    component.ngOnChanges({
      tabs: {
        isFirstChange: () => false,
        previousValue: component.tabs,
        currentValue: option,
        firstChange: false,
      },
    });
    expect(component.tabs).not.toEqual(option);
  });
});
