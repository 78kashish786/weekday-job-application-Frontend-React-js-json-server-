import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Slice/UserSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Naviagte = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');



  const handleLoginEvent = async (e) => {
    e.preventDefault();

    if (email === '' || email === null || password === '' || password === null) {
      setLoading(false);
      setErrors("Credentials cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/users?email=${email}&password=${password}`);
      const user = response.data[0];
      console.log("user", user);
      if (user) {
        user.password = null;
        localStorage.setItem('user', JSON.stringify(user));
        setLoading(true);
        Naviagte('/');
      } else {
        setLoading(false);
        setErrors("Invlaid Credentials");
      }

    } catch (er) {
      setLoading(false);
      console.log("Errors during login", er);
      setErrors("An Error Ocurrred suring login ");
      
    }


  }

  return (
    <div className=' flex flex-col justify-center items-center w-full '>
      <img className='mb-5  ' src='https://upload.wikimedia.org/wikipedia/commons/f/f4/Weekday_Logo.jpg' alt="wekday logo" />
      <form onSubmit={handleLoginEvent} className='md:w-[30%]  text-center space-y-5'>
        <h1 className='text-3xl font-semibold ' >Welcome Back!</h1>
        {/* <h2 className='text-md font-md'>Please Enter your Details</h2> */}
        <div className=' flex flex-col w-[100%] space-y-3 '>

          {/* <h1>Email Address</h1> */}
          <input className='bg-gray-100 p-4 px-6 rounded-md' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />


          <input className='bg-gray-100 p-4 px-6 rounded-md' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className={`rounded-xl hover:bg-white hover:text-gray-900 bg-gray-900 font-semibold px-2 py-3 text-white ${loading ? "animate-pulse" : ""}`}>{loading ? "Logging in" :loading===true&&errors?"Try Again":"Login"}  </button>
        </div>
        <h1 className='text-[14px] font-md my-2'>Not a Memeber? <a href='/register' className='text-blue-400 font-semibold' >Regiter Now</a></h1>
        {errors && (
          <div className='alert alert-danger text-sm text-red-400 font-semibold border p-2 rounded-sm border-red-400 my-2 w-full' role='alert'>{errors}
          </div>
        )}
      </form>

    </div>
  )
}

export default LoginPage
