# Romuald

## Overview

Romuald is a simple flux framework (like redux) for Angular.

## Usage

```ts

// Your state store class
import { Armory } from 'romuald';

@Injectable()
export class YourStore extends Armory<AppState> {
  constructor() {
    const initialState = {};
    super(initialState, reducerFunction);
  }
}
```

```ts
// On some component
export class AppComponent {
  constructor(private _store) {
  }

  someAction() {
    this._store.dispatch({
      type: '/* string */',
      payload: { /* payload to pass to reducer function */ }
    });

    // Or use `next`
    // this._store.next({
    //   type: '/* string */',
    //   payload: { /* payload to pass to reducer function */ }
    // });
  }
}
```

