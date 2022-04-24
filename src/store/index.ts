import { configureStore } from "@reduxjs/toolkit";
import listsReducer from "./listsSlice";

const store = configureStore({
  reducer: {
    listsSlice: listsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
