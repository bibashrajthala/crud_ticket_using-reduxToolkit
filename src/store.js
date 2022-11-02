import { configureStore, combineReducers } from "@reduxjs/toolkit";
import ticketReducer from "./features/ticket/ticketSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import thunk from 'redux-thunk';

// export const store = configureStore({
//   reducer: {
//     ticket: ticketReducer,
//   },
// });

const rootReducer = combineReducers({
  ticket: ticketReducer,
  // user: userReducer,
});
const rootPersistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["ticket"],
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// const rootPersistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['user']
// }
// OR
export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  // middleware: [thunk]
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
