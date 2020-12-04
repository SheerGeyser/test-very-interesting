import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { loginReducer } from "./login";
import { registerReducer } from "./register";
import { booksReducer } from "./books"

export const MainStore = configureStore({
    reducer: combineReducers({
        auth: authReducer,
        login: loginReducer,
        register: registerReducer,
        books: booksReducer,
    }),
});