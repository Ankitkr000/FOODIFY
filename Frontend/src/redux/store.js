import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice"
import ownerReducer from "../redux/ownerSlice"

const store=configureStore({
    reducer:{
        user:userReducer,
        owner:ownerReducer

    }
})

export default store