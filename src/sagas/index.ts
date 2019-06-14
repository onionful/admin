// import { actions as profileActions } from 'reducers/profile';
// import { actions as spacesActions, setSpace } from 'reducers/spaces';
import { all, put } from 'redux-saga/effects';

const APP = 'APP';
const pending = (action: string) => `${action}_PENDING`;
const fulfilled = (action: string) => `${action}_FULFILLED`;
// const rejected = (action: string) => `${action}_REJECTED`; // eslint-disable-line no-unused-vars

// @ts-ignore
// function* handleSetSpace({ payload }) {
// yield put(fetchCollectionsList());
// @ts-ignore
// yield put(updateProfile({ space: payload }));
// }

// function* refreshCollections() {
// yield put(fetchCollectionsList());
// }

// function* preInitializeApp() {
// }

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
    // take(spacesActions.fetchSpacesListAction.success),
    // take(profileActions.fetchProfileAction.success),
  ]);

  // yield put(setSpace(space));
  yield put({ type: fulfilled(APP) });
}

// eslint-disable-next-line no-unused-vars
function* rootSaga() {
  // yield put({ type: pending(APP) });

  yield all([
    // takeEvery(SpacesActionTypes.SET_SPACE, handleSetSpace),
    // takeEvery(fulfilled(CollectionsActionTypes.COLLECTIONS_DELETE), refreshCollections),
    // takeEvery(fulfilled(CollectionsActionTypes.COLLECTIONS_UPDATE), refreshCollections),
    // takeEvery(fetchProfileAction.request, preInitializeApp),
  ]);

  // yield fork(initializeApp);
}

export default rootSaga;
