import { useState } from 'react';
import './login.css';
import toast from 'react-hot-toast';
import google from '/images/google.svg'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { useLoginMutation } from '../../redux/api/userApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { MessageResponse } from '../../types/api-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userExist } from '../../redux/userReducer';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login] = useLoginMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const manualLoginHandler = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}api/v1/users/login`, { email, password }
            );
            console.log(res);
            dispatch(userExist(res.data.user));
            if ('data' in res) {
                toast.success(`Welcome, ${res.data.user.name}`);
            }
            return res;
        } catch (error) {
            toast.error(`Signin Failed`);
        }
    };

    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);
            const res = await login({
                name: user.displayName!,
                email: user.email!,
                photo: user.photoURL!,
                _id: user.uid!,
                password: 'rtegzsdgdfhbdfbrerferergervgefyukhuolfthhzedrgzsgerasegr25452gwefwefwefwefe'
            });
            console.log(res);
            if ('data' in res) {
                toast.success(res.data.message);
            } else {
                const error = res.error as FetchBaseQueryError;
                const message = (error.data as MessageResponse).message;
                toast.error(message);
            }
            console.log(user);
        } catch (error) {
            toast.error(`Signin Failed`);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='login'>
            <main>
                <h1 className='text-center b'>LOGIN</h1>
                <div>
                    <label className='b'>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email' />
                </div>
                <div>
                    <label className='b'>Password</label>
                    <div className="login-p d-flex align-items-center">
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Password' />
                        
                        <p className="toggle-password-btn" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaRegEyeSlash/> : <FaRegEye/>}
                        </p>
                        </div>
                </div>
                <p onClick={() => navigate('/generateOtp')} style={{ color: '#014FB3', cursor: 'pointer' }} className='text-right'>Forgot Password?</p>
                
                <div>
                    <button onClick={manualLoginHandler} style={{ background: '#014FB3', border: '0' }}>Login</button>
                    <button onClick={loginHandler} className='googlebtn'>Sign in With Google <img src={google}/> </button>
                    <p style={{ color: '#000' }} className='b text-center mt-2'>New Customer? <span onClick={() => navigate('/register')} style={{ color: '#1176d0', cursor: 'pointer', textDecoration:"underline" }}>Create new account.</span></p>
                </div>
            </main>
        </div>
    );
}

export default Login;
