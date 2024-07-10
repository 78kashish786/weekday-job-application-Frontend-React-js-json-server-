import './App.css';
import HomePage from './Pages/HomePage'
import Main from './components/Main';
import JobDetail from './Pages/JobDetail.js';
import {Routes,Route,redirect}from 'react-router-dom'
import LoginPage from './Pages/LoginPage.js';
import PrivateRoutes from './components/routes_cpmponents/PrivateRoutes.js';
import RegisterPage from './Pages/RegisterPage.js';
import SavedJobs from './Pages/SavedJobs.js';
import NotFound from './Pages/NotFound.js';
import Profile from './Pages/Profile.js';
import AnonymousRoutes from './components/routes_cpmponents/AnonymousRoutes.js';

function App() {
  
  
  return (
    <div className="App">
     <Main>
      <Routes>
      {/* <Route path='/'element={<HomePage/>}/> */}
      <Route path='/'  element={<PrivateRoutes/>}>
      <Route index element={<HomePage/>}/>
      <Route path='/saved_jobs' element={<SavedJobs/>}/>
      <Route path='/profile' element={<Profile/>}/>
      </Route>
        <Route path='/:jdUid' element={<JobDetail/>}/>
      </Routes>
      <Routes>
        <Route element={<AnonymousRoutes/>}>
        <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
        </Route>
      
      
      </Routes>
      
     </Main>
     
    </div>
  );
}

export default App;
