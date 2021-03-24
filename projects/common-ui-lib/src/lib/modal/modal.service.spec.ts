import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IrasModalModule } from './modal.module';
import { ModalService } from './modal.service';

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

describe('Modal service', () => {
  let service: ModalService;
  let modalContentRef: TemplateRef<any>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ModalContentStubComponent],
        imports: [BrowserAnimationsModule, IrasModalModule],
        providers: [
          {
            provide: MatDialogRef,
            useValue: {
              close: () => {},
            },
          },
        ],
      });
      modalContentRef = TestBed.createComponent(ModalContentStubComponent).componentInstance.modalContentRef;
      service = TestBed.inject(ModalService);
    })
  );

  it('should use modal service', () => {
    expect(service).toBeTruthy();
  });

  it('show() should work', () => {
    const ref = service.show({
      data: {
        templateContentRef: modalContentRef,
      },
      panelClass: 'modal-showcase',
      backdropClass: 'modal-showcase-backdrop',
      disableClose: false,
    });

    expect(ref).toBeTruthy();
  });

  it('hide() should work', () => {
    service.show({
      data: {
        templateContentRef: modalContentRef,
      },
      panelClass: 'modal-showcase',
      backdropClass: 'modal-showcase-backdrop',
      disableClose: false,
    });

    spyOn(service.dialogRef, 'close');

    service.hide();
    expect(service.dialogRef.close).toHaveBeenCalled();
  });

  it('panel class should work', () => {
    const ref = service.show({
      data: {
        templateContentRef: modalContentRef,
      },
      panelClass: ['a', 'b'],
      backdropClass: 'modal-showcase-backdrop',
      disableClose: false,
    });

    expect(ref).toBeTruthy();
  });
});
