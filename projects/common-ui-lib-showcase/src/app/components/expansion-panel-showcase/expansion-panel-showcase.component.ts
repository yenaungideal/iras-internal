import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../../utils/forbidden-name.directive';

@Component({
  selector: 'app-expansion-panel-showcase',
  templateUrl: './expansion-panel-showcase.component.html',
  styleUrls: ['./expansion-panel-showcase.component.scss'],
})
export class ExpansionPanelShowcaseComponent implements OnInit {
  @ViewChild('templateContentRefOne', {static : true}) templateContentRefOne : TemplateRef<any>;
  @ViewChild('templateContentRefTwo', {static : true}) templateContentRefTwo : TemplateRef<any>;
  @ViewChild('templateContentRefThree', {static : true}) templateContentRefThree : TemplateRef<any>;
  templatePortalList: {'title':string,'templatePortal':TemplatePortal<any>}[] = [];
  templatePortal: TemplatePortal<any>;
  templatePortalTwo:TemplatePortal<any>;
  templatePortalThree:TemplatePortal<any>;

  singleInputForm: FormGroup;
  NAME_LENGTH = 8;

  constructor(private formBuilder: FormBuilder, private _viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.singleInputForm = this.formBuilder.group({
      descriptionRef: ['', [Validators.required, Validators.minLength(this.NAME_LENGTH), forbiddenNameValidator(/bob/i)]],
      fileRef: ['', [Validators.required, Validators.minLength(this.NAME_LENGTH), forbiddenNameValidator(/bob/i)]],
    });


    this.templatePortal = new TemplatePortal(this.templateContentRefOne, this._viewContainerRef);
    this.templatePortalTwo = new TemplatePortal(this.templateContentRefTwo, this._viewContainerRef);
    this.templatePortalThree = new TemplatePortal(this.templateContentRefThree, this._viewContainerRef);
    this.templatePortalList.push({'title':'Title 1','templatePortal':this.templatePortal});
    this.templatePortalList.push({'title':'Title 2','templatePortal':this.templatePortalTwo});
    this.templatePortalList.push({'title':'Form','templatePortal':this.templatePortalThree});
  }

  get fileRef(): any {
    return this.singleInputForm.controls.fileRef;
  }

  get descriptionRef(): any {
    return this.singleInputForm.controls.descriptionRef;
  }

  resetFileRefControl() {
    this.fileRef.reset();
  }

  resetDescriptionRefControl(){
    this.descriptionRef.reset();
  }
}
