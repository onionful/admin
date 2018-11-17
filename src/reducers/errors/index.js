import { Map } from 'immutable';
import { camelCase } from 'lodash';

export default (state = Map(), { type, payload }) => {
  const matches = /(.*)_(PENDING|FULFILLED|REJECTED)/.exec(type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  return state.set(camelCase(requestName), requestState === 'REJECTED' ? payload : null);
};
