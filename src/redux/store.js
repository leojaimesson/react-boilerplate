import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import { connectRouter } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import * as allDucks from './ducks';
import * as allSagas from './sagas';
import history from '../routes/history';

const getReducers = (ducks) =>
  Object.keys(ducks).reduce((accumulator, m) => {
    const module = ducks[m];
    if (module.reducer) {
      accumulator[module.Constants.MODULE_NAME] = module.reducer;
    }
    return accumulator;
  }, {});

const persistConfig = {
  key: 'root',
  storage,
};

const sagaMiddleware = createSagaMiddleware();
const middlewares = [routerMiddleware(history), sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(
    createLogger({
      collapsed: () => true,
    }),
  );
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    ...getReducers(allDucks),
    router: connectRouter(history),
  }),
);

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middlewares)),
);

const persistor = persistStore(store);

store.sagas = Object.keys(allSagas).map((sagaName) =>
  sagaMiddleware.run(allSagas[sagaName]),
);
store.cancelSagas = () => store.sagas.forEach((saga) => saga.cancel());

export { store, persistor };
