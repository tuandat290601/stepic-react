import { configureStore } from "@reduxjs/toolkit";
import { loginReducer, navbarReducer } from "./features";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        navbar: navbarReducer
    }
})