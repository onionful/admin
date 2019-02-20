import { camelCase, set } from 'lodash';

export default (state = {}, { type, payload }: any) => {
  const matches = /(.*)_(PENDING|FULFILLED|REJECTED)/.exec(type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  return set(state, camelCase(requestName), requestState === 'REJECTED' ? payload : null);
};
