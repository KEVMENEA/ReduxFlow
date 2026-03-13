import { configureStore } from "@reduxjs/toolkit"
<<<<<<< HEAD
import  counterSlice  from "./features/counter/counterSlice"

export const makeStore = () => {
    return configureStore({
        reducer : {
            counter: counterSlice,
        },
=======
import counterSlice from "./features/counter/counterSlice"
import { productApi } from "./features/api/ProductApi"
import { fakeStoreApi } from "./features/api/api"

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterSlice,
            [productApi.reducerPath]: productApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(productApi.middleware),
>>>>>>> 909d5cd (RTK Query Practice)
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']