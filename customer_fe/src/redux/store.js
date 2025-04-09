import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

store.subscribe(() => {});
sagaMiddleware.run(rootSaga);

// Custom hooks without types
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

export default store;

