import { Action } from './action';

export interface ReducerFunctions {
  [key: string]: (state: any, action: Action) => any;
}

export function combineReducers(reducers: ReducerFunctions) {
  const keys: Array<string> = Object.keys(reducers);
  const finalReducers: ReducerFunctions = {};

  for (let i = 0; i < keys.length; i++) {
    const key: string = keys[i];
    if (typeof reducers[key] !== 'function') {
      throw 'Reducers must be array of functions';
    }
    finalReducers[key] = reducers[key];
  }

  const finalReducerKeys: Array<string> = Object.keys(finalReducers);

  return function execute(currentState: any = {}, action: Action): any {
    const nextState: any = Object.assign({}, currentState);

    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key                = finalReducerKeys[i];
      const reducer            = finalReducers[key];
      const currentStateForKey = currentState[key];
      const nextStateForKey    = reducer(currentStateForKey, action);

      nextState[key] = nextStateForKey;
    }

    return nextState;
  };
}
