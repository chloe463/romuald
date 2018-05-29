import { Injectable, Inject } from '@angular/core';
import { pluck, distinctUntilChanged } from 'rxjs/operators';
import {
  STATE_META_KEY,
  ACTION_META_KEY,
  RomualdStateOptions
} from './symbols';
import { Arsenal } from './arsenal';

function ensureMetaData(target: any) {
  if (!target.hasOwnProperty(STATE_META_KEY)) {
    Object.defineProperty(target, STATE_META_KEY, {
      value: {
        key: '',
        actions: {},
        initial: {}
      }
    });
  }
  return target[STATE_META_KEY];
}

export function State<T>(options: RomualdStateOptions<T>) {
  return function (target: any) {
    const metadata = ensureMetaData(target);
    target[STATE_META_KEY]['initial'] = options.initial;
    target[STATE_META_KEY]['key']     = options.key;
    return target;
  };
}

export function Reduce(action: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (action.type === undefined) {
      throw Error('Action class to pass @Reduce must have static member \'type\'');
    }
    const meta = ensureMetaData(target.constructor);
    meta.actions[action.type] = target[propertyKey];
  };
}

@Injectable()
export class SelectFactory {
  static store;
  constructor(@Inject(Arsenal) store: Arsenal) {
    SelectFactory.store = store;
  }
}

export function Select(stateKey: string) {
  const keys = stateKey.split('.');

  return function(target: any, propertyKey: string) {
    if (delete(target[propertyKey])) {
      return Object.defineProperty(target, propertyKey, {
        get: function () {
          return SelectFactory.store.pipe(
            pluck(...keys),
            distinctUntilChanged()
          );
        },
        enumerable: true,
        configurable: true
      })
    }
  };
}
