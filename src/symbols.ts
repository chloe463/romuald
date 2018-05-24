export const STATE_META_KEY  = '__ROMUALD_STATE_META_KEY__';
export const ACTION_META_KEY = '__ROMUALD_ACTION_META_KEY__';

export interface RomualdModuleOptions {
  states: any[];
};

export interface RomualdStateOptions<T> {
  key: string;
  initial: T;
};

export interface ReducerContext {
  payload: any;
  getState: () => any;
}