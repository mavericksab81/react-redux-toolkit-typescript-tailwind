import { configureStore, ThunkAction, Action, combineReducers, AnyAction } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer, { clearState } from '../features/login/loginSlice';
import reduxThunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const appReducer = combineReducers({
  counter: counterReducer,
  user: authReducer
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | any,
  action: AnyAction
) => {
  if (action.type === 'user/clearState') {
    return appReducer(undefined, { type: undefined });
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(reduxThunk)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<any>
>;
