import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import entrepriseReducer from "../features/entreprise/entrepriseSlice"

export const store=configureStore({
    reducer:{
        auth:authReducer,
        entreprise: entrepriseReducer,

    }
})