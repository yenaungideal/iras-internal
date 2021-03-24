import { of } from 'rxjs';
import { SubscriptionObserver } from './subscription-observer.util';

describe('SubscriptionObserver', () => {
  let subscriptionObserver: SubscriptionObserver;

  beforeEach(() => {
    subscriptionObserver = new SubscriptionObserver();
  });

  it('#observe should add subscriptions to the subPool', () => {
    const spy = spyOn<any>(subscriptionObserver['subPool'], 'push').and.callThrough();
    const obs1 = of(1);
    const callback = () => {};
    subscriptionObserver.observe(obs1, callback);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
