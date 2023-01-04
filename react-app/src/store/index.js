import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import accountReducer from './account';
import walletReducer from './wallet';
import transactionReducer from './transaction';
import requestReducer from './request';
import jointAccountReducer from './jointAccount';

const rootReducer = combineReducers({
  session,
  Accounts:accountReducer,
  jointAccount: jointAccountReducer,
  wallet:walletReducer,
  transaction:transactionReducer,
  request:requestReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
