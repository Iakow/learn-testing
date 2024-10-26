import {configureStore} from "@reduxjs/toolkit";
import bookListReducer from "./BookList/bookListSlice";
import bookDetailsReducer from "./BookDetail/bookDetailsSlice";
import reviewSliceReducer from "./BookDetail/reviewSlice";

const store = configureStore({
  reducer: {
    list: bookListReducer,
    detail: bookDetailsReducer,
    review: reviewSliceReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
