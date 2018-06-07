import {
  ErrorHandler,
  Inject,
  NgZone,
} from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, pluck, tap } from 'rxjs/operators';

import {
  STATE_META_KEY,
  ACTION_META_KEY,
  ReducerContext,
  INITIAL_STATE_TOKEN,
  STATES_TOKEN
} from './symbols';
import { Dispatcher } from './dispatcher';
import { StateStream } from './state-stream';

export class Arsenal {

  constructor(
    private _stateStream: StateStream,
    private _dispatcher: Dispatcher,
    @Inject(INITIAL_STATE_TOKEN) public initialState,
    @Inject(STATES_TOKEN) public states
  ) {
    this._stateStream.next(initialState);
  }

  select(keys: string[]): Observable<any> {
    return this._stateStream.pipe(
      pluck(...keys),
      distinctUntilChanged()
    );
  }

  dispatch(action: any): Observable<any> {
    return this._dispatcher.dispatch(action);
  }

  dispatchAsync(observableAction: Observable<any>): Observable<any> {
    return this._dispatcher.dispatchAsync(observableAction);
  }

  subscribe(fn: any): Subscription {
    return this._stateStream.subscribe(fn);
  }

  snapshot(): any {
    return this._stateStream.getValue();
  }

}
