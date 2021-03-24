import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { EntitySearchComponent } from './entity-search.component';
import { IrasEntitySearchModule } from './entity-search.module';

const initialTestDataFor = {
  entityIdFlex: '50',
  entityIdFormControlName: 'entityIdTest',
  entityIdLabel: 'Entity ID',
  entityIdPlaceholder: 'ID',
  entityTypeFlex: '50',
  entityTypeFormControlName: 'entityTypeTest',
  entityTypeLabel: 'Entity Type',
  entityTypeList: [
    {
      key: '1',
      text: 'NRIC',
    },
    {
      key: '2',
      text: 'FIN',
    },
    {
      key: '105',
      text: 'ASGD',
    },
    {
      key: '300',
      text: 'DRN',
    },
    {
      key: '1000',
      text: 'Random',
    },
  ],
  entityTypePlaceholder: 'Type',
  isRequired: false,
  showValidationError: true,
};
describe('EntitySearchComponent', () => {
  let testHostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: EntitySearchComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestHostComponent],
        imports: [IrasEntitySearchModule],
        providers: [
          {
            provide: ComponentFixtureAutoDetect,
            useValue: true,
          },
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(TestHostComponent);
          testHostComponent = fixture.componentInstance;
          component = testHostComponent.componentUnderTestComponent;
          fixture.detectChanges();
        });
    })
  );

  beforeEach(() => {
    component.form = fixture.debugElement.injector.get(FormBuilder).group({
      entityIdTest: [''],
      entityTypeTest: [''],
    });
    component.entityIdFlex = +initialTestDataFor.entityIdFlex;
    component.entityIdFormControlName = initialTestDataFor.entityIdFormControlName;
    component.entityIdLabel = initialTestDataFor.entityIdLabel;
    component.entityIdPlaceholder = initialTestDataFor.entityIdPlaceholder;
    component.entityTypeFlex = +initialTestDataFor.entityTypeFlex;
    component.entityTypeFormControlName = initialTestDataFor.entityTypeFormControlName;
    component.entityTypeLabel = initialTestDataFor.entityTypeLabel;
    component.entityTypeList = initialTestDataFor.entityTypeList;
    component.entityTypePlaceholder = initialTestDataFor.entityTypePlaceholder;
    component.isRequired = initialTestDataFor.isRequired;
    component.showValidationError = initialTestDataFor.showValidationError;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should not show validation errors', () => {
    (component as any).entityIdValidators = [];
    component.showValidationError = false;
    component.ngOnInit();
    fixture.detectChanges();
    expect((component as any).entityIdValidators.length).toEqual(0);
  });

  it('entityIdValidators length should be 2 when isRequired is set', () => {
    (component as any).entityIdValidators = [];
    component.showValidationError = true;
    component.isRequired = true;
    component.ngOnInit();
    fixture.detectChanges();
    expect((component as any).entityIdValidators.length).toEqual(2);
  });

  it('entityTypeValidators length should be 2 when isRequired is set', () => {
    (component as any).entityTypeValidators = [];
    component.showValidationError = true;
    component.isRequired = true;
    component.ngOnInit();
    fixture.detectChanges();
    expect((component as any).entityTypeValidators.length).toEqual(1);
  });

  it('entityType should be correctly set when entityID is entered', () => {
    (component as any).entityIdValidators = [];
    component.showValidationError = true;
    component.isRequired = true;
    component.ngOnInit();
    fixture.detectChanges();

    component.entityId.patchValue('G1659941K');
    fixture.detectChanges();
    component.entityId.patchValue('G3210256K');
    fixture.detectChanges();
    expect(component.entityType.value.toUpperCase()).toEqual('2');
  });

  it('entityId should be correctly set when entityType is entered', () => {
    (component as any).entityIdValidators = [];
    component.showValidationError = true;
    component.isRequired = true;
    component.ngOnInit();
    fixture.detectChanges();

    component.entityType.patchValue('1');
    fixture.detectChanges();
    component.entityType.patchValue('2');
    fixture.detectChanges();
    expect(component.entityType.value.toUpperCase()).toEqual('2');
  });

  it('IdType should not be selected when id pattern is not matched', () => {
    (component as any).entityIdValidators = [];
    component.showValidationError = true;
    component.isRequired = true;
    component.ngOnInit();
    fixture.detectChanges();

    component.entityId.patchValue('abcdefghijk');
    fixture.detectChanges();

    expect(component.entityType.value.toUpperCase()).toBeFalsy();
  });

  it('enittyId should show error when idType is selected but no matching pattern is found in id input', () => {
    (component as any).entityIdValidators = [];
    component.showValidationError = true;
    component.isRequired = true;
    component.ngOnInit();
    fixture.detectChanges();

    component.entityType.patchValue(2);
    fixture.detectChanges();
    component.entityId.patchValue('');
    fixture.detectChanges();
  });

  @Component({
    selector: `host-component`,
    template: `<iras-entity-search
      [form]="form"
      [entityIdFlex]="entityIdFlex"
      [entityIdFormControlName]="entityIdFormControlName"
      [entityIdLabel]="entityIdLabel"
      [entityIdPlaceholder]="entityIdPlaceholder"
      [entityTypeFlex]="entityTypeFlex"
      [entityTypeFormControlName]="entityTypeFormControlName"
      [entityTypeLabel]="entityTypeLabel"
      [entityTypeList]="entityTypeList"
      [entityTypePlaceholder]="entityTypePlaceholder"
      [isRequired]="isRequired"
      [showValidationError]="showValidationError"
    ></iras-entity-search>`,
  })
  class TestHostComponent {
    @ViewChild(EntitySearchComponent)
    public componentUnderTestComponent: EntitySearchComponent;
    form = this.formBuilder.group({
      entityIdTest: [''],
      entityTypeTest: [''],
    });
    entityIdFlex = +initialTestDataFor.entityIdFlex;
    entityIdFormControlName = initialTestDataFor.entityIdFormControlName;
    entityIdLabel = initialTestDataFor.entityIdLabel;
    entityIdPlaceholder = initialTestDataFor.entityIdPlaceholder;
    entityTypeFlex = +initialTestDataFor.entityTypeFlex;
    entityTypeFormControlName = initialTestDataFor.entityTypeFormControlName;
    entityTypeLabel = initialTestDataFor.entityTypeLabel;
    entityTypeList = initialTestDataFor.entityTypeList;
    entityTypePlaceholder = initialTestDataFor.entityTypePlaceholder;
    isRequired = initialTestDataFor.isRequired;
    showValidationError = initialTestDataFor.showValidationError;

    constructor(private formBuilder: FormBuilder) {}
  }
});
