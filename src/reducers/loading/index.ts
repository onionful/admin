import { camelCase, set } from 'lodash';

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
