import { useState } from 'react';
import './login.css';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { useLoginMutation } from '../../redux/api/userApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { MessageResponse } from '../../types/api-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userExist } from '../../redux/userReducer';

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
                <h1 className='text-center b'>Login</h1>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email' />
                </div>
                <div>
                    <label>Password</label>
                    
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Password' />
                        
                        <p className="toggle-password-btn" onClick={togglePasswordVisibility}>
                            {showPassword ? "Hide" : "Show"}
                        </p>
                </div>
                <p>New User? <span onClick={() => navigate('/register')} style={{ color: '#1176d0', cursor: 'pointer' }}>Register Here</span></p>
                <p>Forgot Password? <span onClick={() => navigate('/reset-password')} style={{ color: '#1176d0', cursor: 'pointer' }}>Reset Password</span></p>
                <div>
                    <button onClick={manualLoginHandler} style={{ background: ' linear-gradient(102.08deg, #68CD3E 12.37%, #3AA20F 84.78%)', border: '0' }}>Login</button>
                    <button onClick={loginHandler}>Sign in With Google <FcGoogle /> </button>
                </div>
            </main>
        </div>
    );
}

export default Login;
