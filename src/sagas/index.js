import { updateProfile } from 'reducers/auth/actions';
import { PROFILE_GET } from 'reducers/auth/types';
import { fetchCollections } from 'reducers/collections/actions';
import { setSpace } from 'reducers/spaces/actions';
import { SET_SPACE } from 'reducers/spaces/types';
import { all, put, takeLatest } from 'redux-saga/effects';

function* handleSetSpace({ payload }) {
  yield put(fetchCollections());
  yield put(updateProfile({ space: payload }));
}

function* initializeSpace({
  payload: {
    data: {
      user_metadata: { space },
    },
  },
}) {
  yield put(setSpace(space));
}

// eslint-disable-next-line no-unused-vars
function* rootSaga(getState) {
  yield all([takeLatest(SET_SPACE, handleSetSpace)]);
  yield all([takeLatest(`${PROFILE_GET}_FULFILLED`, initializeSpace)]);
}

export default rootSaga;
