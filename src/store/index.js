import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import peopleSliceReducer from "./slices/peopleSlice/peopleSlice";

const store = configureStore({
  reducer: {
    peopleSlice: peopleSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
