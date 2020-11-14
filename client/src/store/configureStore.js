import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import session from '../reducers/session'
import products from '../reducers/products'
import categories from '../reducers/categories'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  session, 
  products, 
  categories
});

const storeEnhancer = composeEnhancers(applyMiddleware(thunk));

const configureStore = (preloadedState) => {
  return createStore(
    reducer,
    preloadedState,
    storeEnhancer
  );
};

export default configureStore;