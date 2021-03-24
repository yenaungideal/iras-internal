import { Component, TemplateRef, ViewChild } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IrasNonModalModule } from './non-modal.module';
import { NonModalService } from './non-modal.service';

@Component({
  selector: 'non-modal-wrapper',
  template: `
    <div>
      <ng-template #modalContentRef> This is non modal window</ng-template>
    </div>
  `,
})
export class NonModalContentStubComponent {
  @ViewChild('modalContentRef', { static: true }) modalContentRef: TemplateRef<any>;
  constructor() {}
}

describe('Non Modal service', () => {
  let service: NonModalService;
  let modalContentRef: TemplateRef<any>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonModalContentStubComponent],
      imports: [BrowserAnimationsModule, IrasNonModalModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
      ],
    });
    modalContentRef = TestBed.createComponent(NonModalContentStubComponent).componentInstance.modalContentRef;
    service = TestBed.inject(NonModalService);
  }));

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
      position: { right: '40px', bottom: '0' },
      hasBackdrop: false,
    });

    expect(ref).toBeTruthy();
  });
});
