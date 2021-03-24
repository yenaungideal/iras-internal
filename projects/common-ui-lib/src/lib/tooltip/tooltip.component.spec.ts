import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { IrasPopoverModule } from '../popover/popover.module';
import { PopoverService } from '../popover/popover.service';
import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;
  let popoverService: PopoverService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TooltipComponent],
        imports: [MatTooltipModule, IrasPopoverModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipComponent);
    popoverService = TestBed.inject(PopoverService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call popover service to open popover on icon click', () => {
    const componentSpy = spyOn(component, 'showTooltip').and.callThrough();
    const popoverSpy = spyOn(popoverService, 'open').and.stub();

    component.tooltipContentText = 'test content';
    fixture.detectChanges();

    const tooltipIcon = fixture.debugElement.query(By.css('.iras-tooltip-label'));
    tooltipIcon.triggerEventHandler('click', { target: { value: 'test' } });

    expect(componentSpy).toHaveBeenCalled();
    expect(popoverSpy).toHaveBeenCalled();
  });
});
