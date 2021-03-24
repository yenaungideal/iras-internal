import { TemplateRef } from '@angular/core';

export interface TabItem {
  title: string;
  templateRef: TemplateRef<any>;
  selected: boolean;
}
