import { fetchContentTypes } from 'reducers/contentType/actions';
import { SET_SPACE } from 'reducers/spaces/types';
import { all, put, takeLatest } from 'redux-saga/effects';

function* handleSetSpace() {
  yield put(fetchContentTypes());
}

function* rootSaga() {
  yield all([takeLatest(SET_SPACE, handleSetSpace)]);
}

export default rootSaga;
