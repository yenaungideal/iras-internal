import { ComponentFixture, TestBed, ComponentFixtureAutoDetect, waitForAsync } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { MenuModule } from './menu.module';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  const mockRouter = { navigateByUrl: jasmine.createSpy('navigateByUrl') };
  let menuItemDomElements: HTMLElement[] = [];
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MenuModule],
      providers: [
        {
          provide: ComponentFixtureAutoDetect,
          useValue: true,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        menuItemDomElements = Array.from(
          fixture.debugElement.nativeElement.queryAll(By.css('.single-view__menu-item'))
        );
      });
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate icons page', () => {
    menuItemDomElements[0].click();
    fixture.detectChanges();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/menu/icons');
  });
});
