import { configureStore } from "@reduxjs/toolkit";
import { loginReducer, navbarReducer, productReducer } from "./features";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        navbar: navbarReducer,
        product: productReducer
    }
})