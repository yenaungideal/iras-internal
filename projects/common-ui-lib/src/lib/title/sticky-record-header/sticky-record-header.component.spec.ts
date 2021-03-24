import { PortalModule } from '@angular/cdk/portal';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StickyRecordHeaderComponent } from './sticky-record-header.component';

@Component({
  template: `
    <ng-template #test>Test</ng-template>
    <iras-sticky-record-header [templateContentRef]="test"> </iras-sticky-record-header>
  `,
})
class StickyRecordHeaderWrapperTestComponent {
  @ViewChild(StickyRecordHeaderComponent, { static: true }) appComponentRef: StickyRecordHeaderComponent;
}

describe('StickyRecordHeaderComponent', () => {
  let component: StickyRecordHeaderComponent;
  let fixture: ComponentFixture<StickyRecordHeaderWrapperTestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PortalModule],
        declarations: [StickyRecordHeaderWrapperTestComponent, StickyRecordHeaderComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyRecordHeaderWrapperTestComponent);
    const wrapperComponent = fixture.debugElement.componentInstance;
    component = wrapperComponent.appComponentRef;
    fixture.detectChanges();
  });

  it(
    'should create',
    waitForAsync(() => {
      expect(component).toBeDefined();
    })
  );
});
