import { configureStore } from "@reduxjs/toolkit";
import sliceStore from "./list/list";

const store = configureStore({
  reducer: {
    slice: sliceStore,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
