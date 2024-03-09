import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userApi } from "./api/userApi";
import { userReducer } from "./userReducer";
import { latestProductApi } from "./api/productsApi";
import { cartReducer } from "./cart-reducer";
import { orderApi } from "./api/orderApi";
import { dashboardApi } from "./api/dashboardApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const server = "https://cosmotradelive.in";
// export const server = "http://localhost:4000";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [latestProductApi.reducerPath]: latestProductApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [userReducer.name]: userReducer.reducer,
  [cartReducer.name]: cartReducer.reducer,
}));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      latestProductApi.middleware,
      dashboardApi.middleware,
      orderApi.middleware
    ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;