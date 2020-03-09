/** Generic dataloader, dispatches CUSTOM_ACTION_TYPE with payload when done
  * Reacts to DATA_REQUESTED action, takes a URL to fetch
  * @requires redux-saga
  * @requires DATA_REQUESTED
  * @requires API_ERROR
  * @param string uri the URI to fetch from
  * @param const ACTION_TYPE the action type to dispatch
 */
import { takeEvery, call, put } from 'redux-saga/effects';
import { DATA_REQUESTED, DATA_LOADED, API_ERROR } from '../constants/action-types';

export default function* watcherSaga() {
    yield takeEvery(DATA_REQUESTED, workerSaga);
}

function* workerSaga(action) {
    const type = action.payload.type || DATA_LOADED;
    try {
        const payload = yield call(getData, action.payload.url);
        yield put({ type, payload });
    } catch (e) {
        yield put({ type: API_ERROR, payload: e })
    }
}

function getData(url) {
    return fetch(url)
        .then(response => response.json());
}
