import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'iras-form-input-error',
  templateUrl: './form-input-error.component.html',
  styleUrls: ['./form-input-error.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class FormInputErrorComponent implements OnInit, AfterViewInit {
  @Input() templateContentRef: TemplateRef<any>;
  @Input() cssClass: string[];
  @Input() isPostSubmitError: boolean;
  @Input() errorDescription: string | Array<string>;
  @Input() title: string;
  templatePortal: TemplatePortal<any>;
  constructor(private cdr: ChangeDetectorRef, private _viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.templateContentRef) {
      this.templatePortal = new TemplatePortal(this.templateContentRef, this._viewContainerRef);
    }
    this.cdr.detectChanges();
  }

  isArray(object: any) {
    return Array.isArray(object);
  }
}
