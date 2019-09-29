import * as React from 'react';
import { BehaviorSubject } from 'rxjs';
import { Class } from 'utility-types';

const containersMap = new Map<Class<Container<any>>, Container<any>>();
const emittersMap = new Map<Container<any>, BehaviorSubject<any>>();

const getContainer = <C>(c: Class<Container<any>>): Container<C> => {
  if (!containersMap.has(c)) containersMap.set(c, new c());
  return containersMap.get(c)!;
};

const getEmitter = (container: Container<any>): BehaviorSubject<any> => {
  if (!emittersMap.has(container)) {
    const emitter = new BehaviorSubject(container);
    emittersMap.set(container, emitter);
  }
  return emittersMap.get(container)!;
};

export const clearListeners = () => {
  containersMap.clear();
  emittersMap.clear();
};

const subscribeListener = (container: Container<any>, listener: () => void) => {
  const emitter = getEmitter(container);
  emitter.subscribe(listener);
  return () => {
    emitter.subscribe(listener);
  };
};

export class Container<State = any> {
  public state!: State;
  public setState = (
    updater: Partial<State> | ((prevState: State) => Partial<State> | null),
    callback?: (nextState: State) => void
  ) => {
    const nextState = updater instanceof Function ? updater(this.state) : updater;
    if (nextState) {
      this.state =
        nextState instanceof Object ? Object.assign({}, this.state, nextState) : nextState;
      getEmitter(this).next(0);

      if (callback) {
        callback(this.state);
      }
    }
  };
}

export function useContainer<C extends Container>(container: C | Class<C>): C {
  const [, setCounter] = React.useState(0);
  const instance = container instanceof Container ? container : (getContainer(container) as C);

  React.useEffect(() => subscribeListener(instance, () => setCounter(counter => counter + 1)), [
    instance,
  ]);
  return instance;
}
