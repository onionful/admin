import { updateProfile } from 'reducers/auth/actions';
import { PROFILE_GET } from 'reducers/auth/types';
import { fetchCollections } from 'reducers/collections/actions';
import { COLLECTIONS_DELETE, COLLECTIONS_UPDATE } from 'reducers/collections/types';
import { setSpace } from 'reducers/spaces/actions';
import { SET_SPACE } from 'reducers/spaces/types';
import { all, put, takeLatest } from 'redux-saga/effects';

const APP = 'APP';
const pending = action => `${action}_PENDING`;
const fulfilled = action => `${action}_FULFILLED`;
const rejected = action => `${action}_REJECTED`; // eslint-disable-line no-unused-vars

function* handleSetSpace({ payload }) {
  yield put(fetchCollections());
  yield put(updateProfile({ space: payload }));
}

function* refreshCollections() {
  yield put(fetchCollections());
}

function* preInitializeApp() {
  yield put({ type: pending(APP) });
}

function* initializeApp({
  payload: {
    data: { user_metadata: { space } = {} },
  },
}) {
  yield put(setSpace(space));
  yield put({ type: fulfilled(APP) });
}

// eslint-disable-next-line no-unused-vars
function* rootSaga(getState) {
  yield all([takeLatest(SET_SPACE, handleSetSpace)]);
  yield all([takeLatest(fulfilled(COLLECTIONS_DELETE), refreshCollections)]);
  yield all([takeLatest(fulfilled(COLLECTIONS_UPDATE), refreshCollections)]);
  yield all([takeLatest(pending(PROFILE_GET), preInitializeApp)]);
  yield all([takeLatest(fulfilled(PROFILE_GET), initializeApp)]);
}

export default rootSaga;
