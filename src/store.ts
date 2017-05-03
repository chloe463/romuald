import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Action } from './action';

export class Armory<T> {

  private _currentState: T;
  private _subject$: BehaviorSubject<T>;

  constructor (
    private _initialState: T,
    private _reducer: any
  ) {
    this._currentState = _initialState;
    this._subject$     = new BehaviorSubject<T>(_initialState);
  }

  public subscribe(fn: any): Subscription {
    if (typeof fn !== 'function') {
      throw 'Argument for subscribe must be function!';
    }
    return this._subject$.subscribe(fn);
  }

  public dispatch(action: Action): void {
    if (action.type === undefined || action.type === null) {
      throw new Error('action must have \'type\'');
    }
    this._currentState = this._reducer(this._currentState, action);
    this._subject$.next(this._currentState);
  }

  public delayDispatch(fn: Promise<any>, action: Action): void {
    fn.then((result) => {
      this.dispatch({
        type: action.type,
        payload: Object.assign({}, action.payload, result)
      });
    }).catch((err) => {
      console.error(err);
      throw 'delayDispatch failed...';
    });
  }

  public next(action: Action): void {
    this.dispatch(action);
  }
}
