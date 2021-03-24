import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DropdownItem } from '../dropdowns/iras-dropdown/dropdown-item.model';

@Component({
  selector: 'iras-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AuditTrailComponent {
  // Default required fields
  @Input() displayOnly = false;
  @Input() officerId = '';
  @Input() timestamp = '';

  // displayOnly true
  @Input() source = '';
  @Input() reason = '';

  // displayOnly false
  @Input() form: FormGroup;
  @Input() auditTrailSourceFormControlName = '';
  @Input() auditTrailReasonFormControlName = '';
  @Input() sourceDropdownData: DropdownItem[] = [];
  @Input() reasonDropdownData: DropdownItem[] = [];
  @Input() sourceHasError = false; // For developer to set the error and show error msg
  @Input() reasonHasError = false; // For developer to set the error and show error msg
  @Input() reasonErrorMsg = ''; // Developer to set their own error msg
  @Input() sourceErrorMsg = ''; // Developer to set their own error msg
  @Input() required = false; // Only to show the required symbol

  sourceError = false;
  reasonError = false;

  constructor() {}
}
