
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postAPI } from "services/PostsService";

const rootReducer = combineReducers({
    [postAPI.reducerPath]: postAPI.reducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(postAPI.middleware)
})

export const setupStore = () => {
    return store
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type TypeRootState = ReturnType<typeof store.getState>