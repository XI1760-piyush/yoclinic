import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import rootSaga from './reducers/rootSaga';
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,  applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;