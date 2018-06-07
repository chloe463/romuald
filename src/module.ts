import {
  ErrorHandler,
  ModuleWithProviders,
  NgModule
} from '@angular/core';

import { Dispatcher } from './dispatcher';
import { StateStream } from './state-stream';
import {
  STATE_META_KEY,
  ACTION_META_KEY,
  RomualdModuleOptions,
  INITIAL_STATE_TOKEN,
  STATES_TOKEN,
} from './symbols';
import { Arsenal } from './arsenal';
import { SelectFactory } from './decorators';

@NgModule()
export class RomualdModule {
  constructor(
    arsenal: Arsenal,
    selectFactory: SelectFactory
  ) {}

  public static forRoot(options: RomualdModuleOptions): ModuleWithProviders {
    const initialState = {};
    options.states.forEach(state => {
      const key          = state[STATE_META_KEY]['key'];
      const initialValue = state[STATE_META_KEY]['initial'];
      initialState[key] = initialValue;
    });

    return {
      ngModule: RomualdModule,
      providers: [
        Arsenal,
        SelectFactory,
        Dispatcher,
        ...options.states,
        StateStream,
        { provide: INITIAL_STATE_TOKEN, useValue: initialState },
        { provide: STATES_TOKEN, useValue: options.states },
      ]
    };
  }
}

