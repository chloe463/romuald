import {
  ErrorHandler,
  Injectable,
  Inject,
  NgZone
} from "@angular/core";
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StateStream } from './state-stream';
import {
  STATES_TOKEN,
  STATE_META_KEY,
  ReducerContext
} from './symbols';

@Injectable()
export class Dispatcher {
  constructor(
    private _ngZone: NgZone,
    private _errorHandler: ErrorHandler,
    private _stateStream: StateStream,
    @Inject(STATES_TOKEN) private _states: any[]
  ) {}

  dispatch(action: any | any[]) {
    const newState = Object.assign({}, this._stateStream.getValue());
    const result$: Observable<any> = this._ngZone.runOutsideAngular(() => {
      this._states.forEach(state => {
        const reducer  = state[STATE_META_KEY]['actions'][action.constructor.type]
        const key      = state[STATE_META_KEY]['key'];

        if (reducer !== undefined) {
          const context: ReducerContext = {
            payload: action.payload,
            getState: () => newState[key],
            setState: (state) => this._stateStream.next(state)
          }
          newState[key] = reducer(context);
        }

      });
      return of(newState);
    })
    result$.subscribe(
      val => this._ngZone.run(() => this._stateStream.next(val)),
      err => this._ngZone.run(() => this._errorHandler.handleError(err))
    );
    return result$;
  }

  dispatchAsync(observableAction: Observable<any>): Observable<any> {
    const result$ = observableAction.pipe(
      switchMap(action => this.dispatch(action))
    );
    result$.subscribe();
    return result$;
  }
}
