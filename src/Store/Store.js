import { configureStore } from "@reduxjs/toolkit";
import userReducer  from '../Slice/UserSlice.js';
const Store = configureStore({
    reducer:{
        user:userReducer
    }
})
export default Store