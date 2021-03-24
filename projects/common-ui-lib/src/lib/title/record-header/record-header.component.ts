import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'iras-record-header',
  templateUrl: './record-header.component.html',
  styleUrls: ['./record-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordHeaderComponent {
  @Input() public title: string;
}
