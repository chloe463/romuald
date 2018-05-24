import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Action } from './action';
import {
  STATE_META_KEY,
  ACTION_META_KEY,
  ReducerContext
} from './symbols';

export class Arsenal extends BehaviorSubject<any> {

  public state: any;

  constructor(public initialState: any, private states: any[]) {
    super(initialState);
    this.state = initialState;
    this.next(initialState);
  }

  public dispatch(action: any): void {
    const newState = Object.assign({}, this.getValue());
    this.states.forEach(state => {
      const reducer  = state[STATE_META_KEY]['actions'][action.constructor.type]
      const key      = state[STATE_META_KEY]['key'];

      if (reducer !== undefined) {
        const context: ReducerContext = {
          payload: action.payload,
          getState: () => newState[key]
        }
        newState[key] = reducer(context);
      }

    });
    this.state = newState;
    this.next(newState);
  }

  public dispatchAsync(observableAction: Observable<any>): Observable<any> {
    observableAction = observableAction.pipe(
      tap(action => this.dispatch(action))
    )
    observableAction.subscribe();
    return observableAction;
  }

}
