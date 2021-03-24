import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-level-unit-input-showcase',
  templateUrl: './level-unit-input-layout.component.html',
  styleUrls: ['./level-unit-input-layout.component.scss'],
})
export class LevelUnitInputLayoutComponent implements OnInit {
  singleInputForm: FormGroup;
  NAME_LENGTH = 8;
  disabled = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.singleInputForm = this.formBuilder.group({
      levelUnit: ['', [Validators.required]],
    });
  }
  get levelUnit(): any {
    return this.singleInputForm.controls.levelUnit;
    
  }

  submit() {
    console.log(this.singleInputForm.value);
  }

  patchValue() {
    const levelUnitValue = {
      level:'123',
      unit:'1234'
    }
   this.singleInputForm.controls['levelUnit'].patchValue(levelUnitValue);
  }

  toggle() {
    this.levelUnit.reset();
    this.levelUnit.markAsTouched();
  }

  disable(){
   this.disabled = !this.disabled;
  }

  resetForm(){
    this.levelUnit.reset();
  }
}
