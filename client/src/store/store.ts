import {configureStore} from "@reduxjs/toolkit";
import postsSlice from "../redux/postsSlice";
;

const store = configureStore({ reducer: {
        wedApp: postsSlice,

    } })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
