// src/redux/store.ts
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import { thunk } from "redux-thunk";
import { useDispatch } from "react-redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "token",
    "userDetails",
    "investorDetails",
    "investorsDetails",
    "investorAccsDetails",
    "projectsDetail",
    "projectImages",
    "academiesDetail"
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type AppDispatch = typeof store.dispatch // you can use this Dispatch type in your thunks
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that
export type RootState = ReturnType<typeof store.getState>;

const persistor = persistStore(store);

export { store, persistor };
