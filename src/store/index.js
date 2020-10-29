import { applyMiddleware, createStore, compose } from 'redux';
import notesApp from 'reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/* eslint-disable no-underscore-dangle */

const persistConfig = { // configuration object for redux-persist
  key: 'root',
  storage,
  whitelist: ['userID'],
};

const persistedReducer = persistReducer(persistConfig, notesApp);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk),
));

export const persistor = persistStore(store);

export default store;
