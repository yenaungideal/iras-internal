import { ElementRef } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MaskedTextBoxComponent } from '@progress/kendo-angular-inputs';
import { MaskedInputComponent } from './masked-input.component';
import { IrasMaskedInputModule } from './masked-input.module';

describe('MaskedInputComponent', () => {
  let component: MaskedInputComponent;
  let fixture: ComponentFixture<MaskedInputComponent>;
  let inputElement: HTMLInputElement;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IrasMaskedInputModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskedInputComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.nativeElement.shadowRoot.querySelector('.masked-input__field');
    fixture.detectChanges();
  });

  it('onFocusIn() should work', () => {
    component.onFocusIn();
  });
});
