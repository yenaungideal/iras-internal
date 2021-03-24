import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'iras-button-toggle',
  templateUrl: 'button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ButtonToggleComponent implements OnInit, OnChanges {
  @Input() data: string[] = [];
  @Input() name = 'buttonToggle';
  @Input() disabled = false;
  @Input() defaultValue: string;
  @Output() selectionChange = new EventEmitter<any>();
  value: string;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.defaultValue && changes.defaultValue.previousValue !== changes.defaultValue.currentValue) {
      this.loadDefaultValue();
      this.buttonToggleSelect({ value: this.defaultValue });
    }
  }

  buttonToggleSelect(data: any) {
    this.selectionChange.emit(data?.value);
  }

  private loadDefaultValue(): void {
    if (this.defaultValue && this.data && this.data.length > 0 && this.data.includes(this.defaultValue)) {
      this.value = this.defaultValue;
    }
  }
}
