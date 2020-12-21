import { delay, call, put, takeEvery, all, race } from 'redux-saga/effects';

import * as calls from '../../api';

import { apiCall } from '../ducks';

function* startApiCall(action) {
  const {
    callName,
    args,
    actions,
    timeoutMS = apiCall.Constants.DEFAULT_REQUEST_TIMEOUT_MS,
  } = action.payload;
  try {
    const request = calls[callName];

    const [winner] = yield all([
      race({
        data: call(request, args),
        timeout: delay(timeoutMS),
      }),
      put(
        apiCall.announceApiCall({
          type: actions.REQUESTED,
          args,
        }),
      ),
    ]);

    if (winner.data) {
      yield put(
        apiCall.successApiCall({
          type: actions.SUCCEEDED,
          data: winner.data,
          args,
        }),
      );
    } else {
      yield put(
        apiCall.failApiCall({
          type: actions.CANCELLED,
          error: {},
          args,
        }),
      );
    }
  } catch (error) {
    yield put(
      apiCall.failApiCall({
        type: actions.FAILED,
        error,
        args,
      }),
    );
  }
}

function* watchCallRequests() {
  yield takeEvery(apiCall.Types.API_CALL_REQUESTED, startApiCall);
}

function* apiCallSaga() {
  yield all([watchCallRequests()]);
}
export default apiCallSaga;
