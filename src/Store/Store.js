import { configureStore } from "@reduxjs/toolkit";
import LoadingSlice from "../Slice/LoadingSlice";
// import userReducer  from '../Slice/UserSlice.js';
const Store = configureStore({
    reducer:{
        // user:userReducer
        loading:LoadingSlice,
    }
})
export default Store