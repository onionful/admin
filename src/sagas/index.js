import { updateProfile } from 'reducers/auth/actions';
import { PROFILE_GET } from 'reducers/auth/types';
import { fetchCollections } from 'reducers/collections/actions';
import { COLLECTION_DELETE, COLLECTION_UPDATE } from 'reducers/collections/types';
import { setSpace } from 'reducers/spaces/actions';
import { SET_SPACE } from 'reducers/spaces/types';
import { all, put, takeLatest } from 'redux-saga/effects';

function* handleSetSpace({ payload }) {
  yield put(fetchCollections());
  yield put(updateProfile({ space: payload }));
}

function* refreshCollections() {
  yield put(fetchCollections());
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
  yield all([takeLatest(`${COLLECTION_DELETE}_FULFILLED`, refreshCollections)]);
  yield all([takeLatest(`${COLLECTION_UPDATE}_FULFILLED`, refreshCollections)]);
  yield all([takeLatest(`${PROFILE_GET}_FULFILLED`, initializeSpace)]);
}

export default rootSaga;
