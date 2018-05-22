import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  STATE_META_KEY,
  ACTION_META_KEY,
  RomualdModuleOptions
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
        { provide: Arsenal, useValue: new Arsenal(initialState, options.states) },
        SelectFactory
      ]
    };
  }
}
