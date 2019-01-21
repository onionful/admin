import { updateProfile } from 'reducers/auth/actions';
import { PROFILE_GET } from 'reducers/auth/types';
import { fetchCollections } from 'reducers/collections/actions';
import { COLLECTIONS_DELETE, COLLECTIONS_UPDATE } from 'reducers/collections/types';
import { setSpace } from 'reducers/spaces/actions';
import { SET_SPACE, SPACES_LIST } from 'reducers/spaces/types';
import { all, fork, put, take, takeEvery } from 'redux-saga/effects';

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

function* initializeApp() {
  const [
    ,
    {
      payload: {
        data: { user_metadata: { space } = {} },
      },
    },
  ] = yield all([take(fulfilled(SPACES_LIST)), take(fulfilled(PROFILE_GET))]);

  yield put(setSpace(space));
  yield put({ type: fulfilled(APP) });
}

// eslint-disable-next-line no-unused-vars
function* rootSaga(getState) {
  yield all([
    takeEvery(SET_SPACE, handleSetSpace),
    takeEvery(fulfilled(COLLECTIONS_DELETE), refreshCollections),
    takeEvery(fulfilled(COLLECTIONS_UPDATE), refreshCollections),
    takeEvery(pending(PROFILE_GET), preInitializeApp),
  ]);

  yield fork(initializeApp);
}

export default rootSaga;
