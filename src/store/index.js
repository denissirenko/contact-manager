import { configureStore } from "@reduxjs/toolkit";
import { contactsApi } from "./api";
import contactsReducer from "./contactsSlice";

const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    contacts: contactsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

export default store;
