import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { loginReducer } from "./login";
import { registerReducer } from "./register";

export const mainStore = configureStore({
    reducer: combineReducers({
        auth: authReducer,
        login: loginReducer,
        register: registerReducer,
    }),
});