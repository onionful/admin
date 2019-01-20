import { Map } from 'immutable';
import { camelCase } from 'lodash';

export default (state = Map(), { type, meta: { distinctLoading = false } = {} }) => {
  const matches = /(.*)_(PENDING|FULFILLED|REJECTED)/.exec(type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  const value = requestState === 'PENDING';

  return distinctLoading === false
    ? state.set(camelCase(requestName), value)
    : []
        .concat(distinctLoading)
        .reduce((_state, key) => _state.setIn([camelCase(requestName), key], value), state);
};
