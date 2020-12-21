import { put, takeEvery, all } from 'redux-saga/effects';

import * as callNames from '../../api/callNames';

import { Types } from '../ducks/listPokemons';
import { requestApiCall } from '../ducks/apiCall';

function* afterAnnounceListPokemons() {
  yield put(
    requestApiCall({
      callName: callNames.LIST_POKEMONS,
      actions: Types.LIST_POKEMONS,
    }),
  );
}

function* watchAnnounceListPokemons() {
  yield takeEvery(Types.ANNOUNCE_LIST_POKEMONS, afterAnnounceListPokemons);
}

function* apiCallSaga() {
  yield all([watchAnnounceListPokemons()]);
}

export default apiCallSaga;
