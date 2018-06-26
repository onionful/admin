import axios from 'axios';
import config from 'config';

export { default as Auth } from './Auth';
export { default as create } from './create';
export { default as colors } from './colors';
export { default as permissions } from './permissions';

const apiHandler = space =>
  axios.create({
    baseURL: config.api.endpoint,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('id_token')}`,
    },
    transformRequest: [
      (data, headers) => {
        headers.Space = space;
      },
    ],
  });

export const spaceApi = callback => (dispatch, getState) =>
  dispatch(callback(apiHandler(getState().getIn(['spaces', 'current']))));

export const api = apiHandler();
