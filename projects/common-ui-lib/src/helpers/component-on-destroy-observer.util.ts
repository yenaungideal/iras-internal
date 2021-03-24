import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  template: '',
})
export class ComponentOnDestroyObserver implements OnDestroy {
  private subPool: Subscription[] = [];

  observe<T>(obs: Observable<T>, callback: (val: T) => void): Subscription {
    const sub = obs.subscribe(callback);
    this.subPool.push(sub);
    return sub;
  }

  ngOnDestroy() {
    for (const sub of this.subPool) {
      sub.unsubscribe();
    }
    this.subPool = [];
  }
}
