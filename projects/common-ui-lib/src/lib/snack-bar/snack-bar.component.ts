import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'iras-snackbar-component',
  templateUrl: 'snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  trustedDescriptionHTML: SafeHtml;
  public actionClick$: Observable<any>;
  private actionClickSource: BehaviorSubject<any>;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBar: MatSnackBar,
    private domSanitizer: DomSanitizer
  ) {
    this.actionClickSource = new BehaviorSubject(null);
    this.actionClick$ = this.actionClickSource.asObservable();
  }
  ngOnInit() {
    this.trustedDescriptionHTML = this.domSanitizer.bypassSecurityTrustHtml(this.data.description);
  }

  closeSnackBar() {
    this.snackBar.dismiss();
  }

  actionClick(event: any) {
    this.actionClickSource.next(event);
  }
}
