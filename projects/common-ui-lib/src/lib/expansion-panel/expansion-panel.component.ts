import { Component, OnInit, Input, ChangeDetectorRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'iras-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ExpansionPanelComponent implements OnInit {
  @Input() cssClass: string;
  @Input() multi = false;
  @Input() disabled = false;
  @Input() templatePortalList: { title: string; templatePortal: TemplatePortal<any> }[] = [];
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  getExpansionPanelClassList() {
    return `${this.cssClass || ''}`;
  }
}
