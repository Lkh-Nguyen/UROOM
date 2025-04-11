import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // sử dụng localStorage

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

// Khởi tạo middleware saga
const sagaMiddleware = createSagaMiddleware();

// Cấu hình persist
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['booking'], // ⚠️ Chỉ persist những reducer bạn muốn giữ sau reload (ví dụ: booking)
};

// Gộp persist vào reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

// Chạy saga
sagaMiddleware.run(rootSaga);

// Tạo persistor để dùng trong <PersistGate>
export const persistor = persistStore(store);

// Custom hooks không type
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

export default store;
