import { useState } from 'react';
import './register.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate =useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const generateId = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 24; i++) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return id;
    };
    const validatePassword = () => {
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }
        return true;
    };

    const register = async () => {
        try {
            if (!validatePassword()) {
                return;
            }
            const userId = generateId();
            const  res  = await axios.post(
                `${import.meta.env.VITE_API_URL}api/v1/users/register`,
                { name, email, password,_id:userId,photo:'' }
            );
            if('data' in res) {
                toast.success(`${res.data.message} Please Login`);
                navigate('/login')
            return res;}
        } catch (error) {
            console.log(error);
            toast.error('This Email Id already exist');
        }
    };


    return (
        <div className='login'>
            <main>
                <h1 className='text-center b'>Register</h1>
                <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder='Name'/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email'/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Password'/>
                    {/* <p className="toggle-password-btn" onClick={togglePasswordVisibility}>
                            {showPassword ? "Hide" : "Show"}
                        </p> */}
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder='Confirm Password'/>
                </div>
                <div>
                    <button onClick={register}>Register</button>
                </div>
            </main>
        </div>
    );
};

export default Login;
