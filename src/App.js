import './App.css'
import HomePage from './Pages/HomePage'
import Main from './components/Main'
import JobDetail from './Pages/JobDetail.js'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import LoginPage from './Pages/LoginPage.js'
import PrivateRoutes from './components/routes_cpmponents/PrivateRoutes.js'
import RegisterPage from './Pages/RegisterPage.js'
import SavedJobs from './Pages/SavedJobs.js'
import Profile from './Pages/Profile.js'
import AnonymousRoutes from './components/routes_cpmponents/AnonymousRoutes.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setLoading } from './Slice/LoadingSlice.js'
import Spinner from './components/Spinner.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NotFound from './Pages/NotFound.js'

function App () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loaction = useLocation()
  const isLoading = useSelector(state => state.loading)

  useEffect(() => {
    dispatch(setLoading(true))
    const timer = setTimeout(() => {
      dispatch(setLoading(false))
    }, 1000)
    return () => clearTimeout(timer)
  }, [loaction.pathname, dispatch])

  return (
    <div className='App'>
      <Main>
        {isLoading && <Spinner></Spinner>}
        <ToastContainer />
        <Routes>
          <Route path='/' element={<PrivateRoutes />}>
            <Route index element={<HomePage />} />
            <Route path='/saved_jobs' element={<SavedJobs />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/:jdUid' element={<JobDetail />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Routes>
          <Route element={<AnonymousRoutes />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>
        </Routes>
      </Main>
    </div>
  )
}

export default App
