import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MaskInputEnum } from '../../../../../common-ui-lib/src/lib/masked-input/mask.enum';
@Component({
  selector: 'app-masked-input-showcase',
  templateUrl: './masked-input-showcase.component.html',
  styleUrls: ['./masked-input-showcase.component.scss'],
})
export class MaskedInputShowcaseComponent implements OnInit {
  sharesMask: string;
  finMask: string;
  maskForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.maskForm = this.formBuilder.group({
      shares: ['', [Validators.required]],
      fin: ['', [Validators.required, Validators.minLength(9)]],
    });
    this.sharesMask = `${MaskInputEnum.number}/${MaskInputEnum.number}`;
    this.finMask = `${MaskInputEnum.letter}${MaskInputEnum.number}${MaskInputEnum.number}${MaskInputEnum.number}${MaskInputEnum.number}${MaskInputEnum.number}${MaskInputEnum.number}${MaskInputEnum.number}${MaskInputEnum.letter}`;
  }

  get fin(): any {
    return this.maskForm.controls.fin;
  }
}
