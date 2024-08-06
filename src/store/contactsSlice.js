import { createSlice } from "@reduxjs/toolkit";
import { contactsApi } from "./api";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      contactsApi.endpoints.getContacts.matchFulfilled,
      (state, { payload }) => payload
    );
  },
});

export default contactsSlice.reducer;
