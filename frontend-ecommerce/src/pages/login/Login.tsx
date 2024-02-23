import { signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import {useState} from 'react'
import './login.css'
import toast from 'react-hot-toast'
import {FcGoogle} from 'react-icons/fc'
import { auth } from '../../firebase'
import { useLoginMutation } from '../../redux/api/userApi'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { MessageResponse } from '../../types/api-types'
const Login = () => {
const [login]=useLoginMutation()
const [gender,setGender]=useState('')
const [dob , setDob]=useState("")


const loginHandler = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    const res = await login({
      name:user.displayName!,
      email:user.email!,
      photo:user.photoURL!,
      _id:user.uid!,
      gender,
      dob
    })
    console.log(res)
    if('data' in res) {
toast.success(res.data.message);
    }else{
      const error = res.error as FetchBaseQueryError;
      const message = (error.data as MessageResponse).message;
      toast.error(message)
    }
    console.log(user);
  } catch (error) {
    toast.error(`Signin Failed`);
  }
};


  return (
    <div className='login'>
      <main>
        <h1>Login</h1>
        <div>
            <label>Gender</label>
            <select value={gender} onChange={(e)=>setGender(e.target.value)} className='login-select'>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
        <div>
            <label>Date of Birth</label>
            <input type="date" value={dob} onChange={(e)=>{setDob(e.target.value)}}/>
        </div>
        <div><button onClick={loginHandler}>Signin With Google <FcGoogle/> </button></div>
      </main>
    </div>
  )
}

export default Login
