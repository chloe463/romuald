import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Action } from './action';

export type Reducer<T> = (state: T, action: Action) => T;

export class Armory<T> extends BehaviorSubject<T> {

  public state: T;

  constructor(public initialState: T, public reducer?: Reducer<T>) {
    super(initialState);
    this.state = initialState;
  }

  public dispatch(action: Action): void {
    this.state = this.reducer(this.state, action);
    this.next(this.state);
  }

  public emit(fn: (state: T) => T) {
    this.state = fn(this.state);
    this.next(this.state);
  }

}
