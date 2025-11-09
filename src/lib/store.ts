import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './store/slices/tokenSlice';
import uiReducer from './store/slices/uiSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      tokens: tokenReducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['tokens/updatePrice'],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

