import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RecordHeaderComponent } from './record-header/record-header.component';
import { StickyRecordHeaderComponent } from './sticky-record-header/sticky-record-header.component';

@NgModule({
  declarations: [RecordHeaderComponent, StickyRecordHeaderComponent],
  imports: [CommonModule, PortalModule],
  exports: [RecordHeaderComponent, PortalModule, StickyRecordHeaderComponent],
})
export class IrasTitleModule {}
