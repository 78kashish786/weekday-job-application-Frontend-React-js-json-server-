
import './App.css';
import HomePage from './Pages/HomePage';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import JobDetail from './Pages/JobDetail.js';
import {Routes,Route,redirect}from 'react-router-dom'
import LoginPage from './Pages/LoginPage.js';
import PrivateRoutes from './components/PrivateRoutes.js';
import { useEffect, useState } from 'react';
import RegisterPage from './Pages/RegisterPage.js';
import SavedJobs from './Pages/SavedJobs.js';
function App() {
  
  
  return (
    <div className="App">
     <Main>
      <Routes>
      {/* <Route path='/'element={<HomePage/>}/> */}
      <Route element={<PrivateRoutes/>}>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/saved_jobs' element={<SavedJobs/>}/>
      </Route>
        <Route path='/:jdUid' element={<JobDetail/>}/>
      </Routes>
      <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
      
     </Main>
     
    </div>
  );
}

export default App;
