import { fetchContentTypes } from 'reducers/contentType/actions';
import { SET_SPACE } from 'reducers/spaces/types';
import { all, put, takeLatest } from 'redux-saga/effects';

const handleSetSpace = function*() {
  yield put(fetchContentTypes());
};

export default function* rootSaga() {
  yield all([takeLatest(SET_SPACE, handleSetSpace)]);
}
