import spacesActions from 'actions/spaces';
import {listCollections} from 'actions/collections';
import profileActions from 'actions/profile';
import { Store } from 'redux';
import { all, takeEvery , put} from 'redux-saga/effects';

// const APP = 'APP';
// const pending = (action: string) => `${action}_PENDING`;
// const fulfilled = (action: string) => `${action}_FULFILLED`;
// const rejected = (action: string) => `${action}_REJECTED`; // eslint-disable-line no-unused-vars

function handleSetSpace({ dispatch }: Store, { payload }: any) {
  console.log('payload', payload);
  listCollections({})(dispatch);


  // yield put(profileActions.update({ space: payload }));
}

// function* refreshCollections() {
// yield put(fetchCollectionsList());
// }

// function* preInitializeApp() {
// }

// function* initializeApp() {
//   const [
//     ,
//     {
//       payload: {
//         // @ts-ignore
//         data: { user_metadata: { space } = {} },
//       },
//     },
//   ] = yield all([
//     // take(spacesActions.fetchSpacesListAction.success),
//     // take(profileActions.fetchProfileAction.success),
//   ]);
//
//   // yield put(setSpace(space));
//   yield put({ type: fulfilled(APP) });
// }

// eslint-disable-next-line no-unused-vars
function* rootSaga(store: Store) {
  // yield put({ type: pending(APP) });

  yield all([
    takeEvery(spacesActions.set, handleSetSpace, store),
    // takeEvery(fulfilled(CollectionsActionTypes.COLLECTIONS_DELETE), refreshCollections),
    // takeEvery(fulfilled(CollectionsActionTypes.COLLECTIONS_UPDATE), refreshCollections),
    // takeEvery(fetchProfileAction.request, preInitializeApp),
  ]);

  // yield fork(initializeApp);
}

export default rootSaga;
