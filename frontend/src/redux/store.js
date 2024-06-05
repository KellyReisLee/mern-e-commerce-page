import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cartSlice from './cartSlice.js';
import uiSlice from './uiSlice.js';
import wishSlice from './wishSlice.js';
import userSlice from './userSlice.js';

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  ui: uiSlice.reducer,
  wishList: wishSlice.reducer,
  user: userSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'wishList', 'user'], // definir quais reducers devem ser persistidos
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
