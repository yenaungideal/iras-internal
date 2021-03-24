import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal.component';
import { IrasModalModule } from './modal.module';

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

describe('ModalComponent', () => {
  let modalContentRef: TemplateRef<any>;
  let modalComponent: ModalComponent;
  let modalComponentFixture: ComponentFixture<ModalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalContentStubComponent],
        imports: [IrasModalModule, BrowserAnimationsModule],
        providers: [
          {
            provide: MatDialogRef,
            useValue: {
              close: () => {},
            },
          },
          {
            provide: MAT_DIALOG_DATA,
            useValue: {
              templateContentRef: modalContentRef,
            },
          },
        ],
      })
        .compileComponents()
        .then((_) => {
          const fx = TestBed.createComponent(ModalContentStubComponent);
          modalContentRef = fx.componentInstance.modalContentRef;

          modalComponentFixture = TestBed.createComponent(ModalComponent);
          modalComponent = modalComponentFixture.componentInstance;
        });
    })
  );

  it('should create', () => {
    expect(modalComponent).toBeTruthy();
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
