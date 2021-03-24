import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NonModalComponent } from './non-modal.component';
import { IrasNonModalModule } from './non-modal.module';

@Component({
  selector: 'modal-wrapper',
  template: `
    <div>
      <ng-template #modalContentRef> This is modal</ng-template>
    </div>
  `,
})
export class ModalContentStubComponent {
  @ViewChild('modalContentRef', { static: true }) modalContentRef: TemplateRef<any>;
  constructor() {}
}

describe('NonModalComponent', () => {
  let modalContentRef: TemplateRef<any>;
  let modalComponent: NonModalComponent;
  let modalComponentFixture: ComponentFixture<NonModalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalContentStubComponent],
        imports: [IrasNonModalModule, BrowserAnimationsModule],
        providers: [
          {
            provide: MatDialogRef,
            useValue: {
              close: () => {},
            },
          },
          { provide: MAT_DIALOG_DATA, useValue: {} },
        ],
      })
        .compileComponents()
        .then((_) => {
          const fx = TestBed.createComponent(ModalContentStubComponent);
          modalContentRef = fx.componentInstance.modalContentRef;

          modalComponentFixture = TestBed.createComponent(NonModalComponent);
          modalComponent = modalComponentFixture.componentInstance;
        });
    })
  );

  it('should create', () => {
    expect(modalComponent).toBeTruthy();
  });

  it('minimizeMaximizeDialog should change the iconMinimize status', () => {
    modalComponent.minimizeMaximizeDialog();
    expect(modalComponent.iconMinimize).toBeTrue;
  });

  it('dialogRef.close to have been called', () => {
    spyOn(modalComponent.dialogRef, 'close');
    modalComponent.closeDialog();
    expect(modalComponent.dialogRef.close).toHaveBeenCalled();
  });

  it('afterViewInit should be called to have been called', () => {
    modalComponent.ngAfterViewInit();
    expect(modalComponent).toBeDefined();
  });
});
