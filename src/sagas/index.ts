import { AuthActionTypes, updateProfile } from 'reducers/auth';
import { CollectionsActionTypes, fetchCollections } from 'reducers/collections';
import { setSpace, SpacesActionTypes } from 'reducers/spaces';
import { all, fork, put, take, takeEvery } from 'redux-saga/effects';

const APP = 'APP';
const pending = (action: string) => `${action}_PENDING`;
const fulfilled = (action: string) => `${action}_FULFILLED`;
const rejected = (action: string) => `${action}_REJECTED`; // eslint-disable-line no-unused-vars

// @ts-ignore
function* handleSetSpace({ payload }) {
  yield put(fetchCollections());
  // @ts-ignore
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
        // @ts-ignore
        data: { user_metadata: { space } = {} },
      },
    },
  ] = yield all([
    take(fulfilled(SpacesActionTypes.SPACES_LIST)),
    take(fulfilled(AuthActionTypes.PROFILE_GET)),
  ]);

  yield put(setSpace(space));
  yield put({ type: fulfilled(APP) });
}

// eslint-disable-next-line no-unused-vars
function* rootSaga() {
  yield all([
    takeEvery(SpacesActionTypes.SET_SPACE, handleSetSpace),
    takeEvery(fulfilled(CollectionsActionTypes.COLLECTIONS_DELETE), refreshCollections),
    takeEvery(fulfilled(CollectionsActionTypes.COLLECTIONS_UPDATE), refreshCollections),
    takeEvery(pending(AuthActionTypes.PROFILE_GET), preInitializeApp),
  ]);

  yield fork(initializeApp);
}

export default rootSaga;
