import { camelCase, get, set } from 'lodash';
import { ApplicationState } from 'reducers/index';

// Selectors
export const isSomeLoading = (state: ApplicationState, types: string[]) =>
  types.some(key => get(state, ['loading'].concat(key), true));

// Reducer
export default (state = {}, { type, meta: { distinctLoading = false } = {} }: any) => {
  const matches = /(.*)_(PENDING|FULFILLED|REJECTED)/.exec(type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  const value = requestState === 'PENDING';

  return distinctLoading === false
    ? set(state, camelCase(requestName), value)
    : []
        .concat(distinctLoading)
        .reduce((_state, key) => set(_state, [camelCase(requestName), key], value), state);
};
