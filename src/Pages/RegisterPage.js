import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TiTick } from "react-icons/ti";
import {v4 as uuidv4} from 'uuid'
import axios from 'axios';
const RegisterPage =() => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Naviagte = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const[recruitor,setRecruitor]= useState(false);
  const [name,setName]= useState('');
  const [company, setcompany]= useState('');
  const [companyLogo, setcompanyLogo]= useState('');
  const [confirmPassword,setConfirmPassword]= useState('');
  const [message,setMessage]= useState('');
  const [role,setRole]=useState('seeker');

  const handleSubmitRegister = async(e)=>{
    e.preventDefault();
    if(!email ||!password|| !name || !confirmPassword ){
      setErrors(true);
      setMessage("Provide the Empty Fields!")
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors(true);
      setMessage("Invalid Email Format");
      return;
    }
    if(password.length<6 || confirmPassword.length<6){
      setErrors(true);
      setMessage("Password must be Atleast 6 digit Long");
      return;
    }
    if(confirmPassword!==password){
      setErrors(true);
      setMessage("Type Correct Password");
      return;
    }

    if(recruitor){
      if(!company ||!companyLogo){
        setErrors(true);
        setMessage("Provide Company name and Logo")
        return;
      }
    }


    const role = recruitor ? 'recruitor' : 'seeker';
    const id =uuidv4();
    const formData =  {
      email:email,
      password:confirmPassword,
      name:name,
      role:role,
      company:company,
      companyLogo:companyLogo,
      id:id 
  }

  try {
    const response= await axios.get(`http://localhost:8000/users?email=${email}`);
    if(response.data.length >0){
      setErrors("Email Already Registered");
      setMessage("Email Already Registered, Please Login")
      return ;
    }else{
      const userData = formData;
        await axios.post('http://localhost:8000/users', userData);
        setLoading(true);
        setMessage('Registration successful!');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setcompany('');
        setcompanyLogo('');
        setErrors('');
        Naviagte('/login');
    }
    
  } catch (error) {
    setErrors('Error checking email or registering user');
    setMessage("Error checking email or registering user ")
    console.error('There was an error!', error);
  }
}

//   await axios.post(`http://localhost:8000/users`, formData)
//   .then((response)=>{
//     setLoading(true);
//     Naviagte('/login');
//   }).catch((error)=>{
//     setLoading(false);
//     console.log("Error in Creating Post", error);
//   })
// }

  return (
    <div className=' flex flex-col justify-center items-center w-full  pb-10'>
      <img className='' src='https://upload.wikimedia.org/wikipedia/commons/f/f4/Weekday_Logo.jpg' alt="wekday logo" />
      <form onSubmit ={handleSubmitRegister} className='md:w-[30%]  text-center space-y-5'>
        <h1 className='text-3xl font-semibold ' >Welcome to Weekday</h1>
        {/* <h2 className='text-md font-md'>Please Enter your Details</h2> */}
        <div className=' flex flex-col w-[100%] space-y-3 '>
          <div className='text-left flex items-center gap-3'>
          <input
            type="checkbox"
            id="recruitor"
            name="Recruitor"
            value="Recruitor"
            // checked={()=>setRecruitor(true)}
            onChange={()=>setRecruitor(!recruitor)}
          />
          <label className='font-semibold' htmlFor="option1"> Register As a Recruitor?</label>
        </div>
        {
          recruitor===true? (
            <>
            <input className='bg-gray-100 p-4 px-6 rounded-md' placeholder='Enter Company Name' value={company} onChange={(e) => setcompany(e.target.value)} />
            <input className='bg-gray-100 p-4 px-6 rounded-md' placeholder='Enter Company Logo Link' value={companyLogo} onChange={(e) => setcompanyLogo(e.target.value)} />
            </>
          ):("")
        }
          <input className='bg-gray-100 p-4 px-6 rounded-md' placeholder='Enter Full Name' value={name} onChange={(e) => setName(e.target.value)} />
          <input className='bg-gray-100 p-4 px-6 rounded-md' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className='bg-gray-100 p-4 px-6 rounded-md' type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className='flex justify-between items-center bg-gray-100 rounded-md'>
          <input type='password' className='bg-gray-100 p-4 px-6 w-[95%] rounded-md' placeholder='Re-enter password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {confirmPassword!==''&&password!==''&&confirmPassword===password&&password.length>=6&&confirmPassword>=6 ? (<TiTick  color='green' size={25}/>):("")}
          </div>


          <button className={`rounded-xl hover:bg-white hover:text-gray-900 bg-gray-900 font-semibold px-2 py-3 text-white ${loading ? "animate-pulse" : ""}`}>{loading ? "Registering" : "Register"}  </button>
        </div>
        <h1 className='text-[14px] font-md '>Already a Memeber? <a href='/login' className='text-blue-400 font-semibold' >Log in </a></h1>
        {errors && (
          <div className='alert alert-danger text-sm text-red-400 font-semibold border p-2 rounded-sm border-red-400 my-2 w-full' role='alert'>{message}
          </div>
        )}
      </form>

    </div>
  )
}

export default RegisterPage;
