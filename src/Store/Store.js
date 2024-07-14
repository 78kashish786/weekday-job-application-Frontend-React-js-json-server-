import { configureStore } from "@reduxjs/toolkit";
import LoadingSlice from "../Slice/LoadingSlice";
// import userReducer  from '../Slice/UserSlice.js';
import JobReducers from '../Slice/JobSlice';
const Store = configureStore({
    reducer:{
        // user:userReducer
        loading:LoadingSlice,
        jobs:JobReducers,
    }
})
export default Store