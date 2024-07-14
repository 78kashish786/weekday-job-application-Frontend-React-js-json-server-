import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    jobs:[],
    filteredData:[],
    status:'idle',
    error:null,
    filters:{
        location:'',
        salary:'',
        jobRole:'',
        company:'',
    }
}
export const fetchJobs =createAsyncThunk('/jobs', async()=>{
    const response =await axios.get('http://localhost:8000/jobs');
    return response.data;
})

const JobSlice = createSlice({
    name:'jobs',
    initialState,
    reducers:{
        filterJobs:(state,action)=>{
            const {filterBy, filterValue}= action.payload;
            state.filters[filterBy] = filterValue;
            state.filteredData = state.jobs.filter(job=>{
                return Object.keys(state.filters).every(key=>{
                    return state.filters[key]==='' || job[key].toString().toLowerCase().includes(state.filters[key].toString().toLowerCase());
                })
            })
        },
        clearFilters:(state)=>{
            state.filters = {location:'' , salary:'', jobRole:'', company:' '};
            state.filteredData= state.jobs;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchJobs.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchJobs.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.jobs = action.payload;
            state.filteredJobs = action.payload;
          })
          .addCase(fetchJobs.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
    
        }

})

export const { setFilter, clearFilters } = JobSlice.actions;
export default JobSlice.reducer;