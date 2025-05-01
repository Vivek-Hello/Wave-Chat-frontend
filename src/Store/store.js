import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authStore.js"


import messageReducer from "./messageStore.js"

const store =  configureStore({
    reducer:{
        auth:authReducer,
        message:messageReducer
    },
});

export default store