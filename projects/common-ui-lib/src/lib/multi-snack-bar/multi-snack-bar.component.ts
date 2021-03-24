import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComponentOnDestroyObserver } from '../../helpers/component-on-destroy-observer.util';
import { IMultiSnackbarOptions } from './multi-snackbar.model';

@Component({
  selector: 'iras-multi-snackbar-component',
  templateUrl: 'multi-snack-bar.component.html',
  styleUrls: ['./multi-snack-bar.component.scss'],
})
export class MultiSnackbarComponent extends ComponentOnDestroyObserver implements OnInit {
  public actionClick$: Observable<any>;
  public snackBarList: Array<IMultiSnackbarOptions> = [];
  private actionClickSource: BehaviorSubject<any>;
  fadeSnackbarIndex: number;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) private list: BehaviorSubject<Array<IMultiSnackbarOptions>>,
    public snackBar: MatSnackBar,
    private domSanitizer: DomSanitizer
  ) {
    super();
    this.actionClickSource = new BehaviorSubject(null);
    this.actionClick$ = this.actionClickSource.asObservable();
  }

  ngOnInit() {
    this.observe(this.list, (list) => {
      this.snackBarList = list.map((l) => ({
        ...l,
        descriptionSanitizedHTML: this.getDescriptionHTML(l.description || ''),
      }));
    });
  }

  closeSnackBar(index: number) {
    const list = this.list.value;
    // trigger fadeout for item
    this.fadeSnackbarIndex = index;
    list.splice(index, 1);
    this.list.next(list);

    if (list.length === 0) {
      this.snackBar.dismiss();
    }
  }

  getDescriptionHTML(description: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(description);
  }

  actionClick(event: any) {
    this.actionClickSource.next(event);
  }
}
