import { Observable, Subscription } from 'rxjs';

export class SubscriptionObserver {
  private subPool: Subscription[] = [];

  observe<T>(obs: Observable<T>, callback: (val: T) => void): Subscription {
    const sub = obs.subscribe(callback);
    this.subPool.push(sub);
    return sub;
  }

  removeSubscriptions() {
    for (const sub of this.subPool) {
      sub.unsubscribe();
    }
    this.subPool = [];
  }
}
