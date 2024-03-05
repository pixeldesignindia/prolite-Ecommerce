import { useState } from 'react';
import './register.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {

    const navigate =useNavigate()
    const [email, setEmail] = useState('');


    const otp = async () => {
        try {
            const  res  = await axios.post(
                `${import.meta.env.VITE_API_URL}api/v1/users/forgetPassword`,{email}
            );
            console.log(res);
            
            if('data' in res) {
                sessionStorage.setItem('codeOne',res.data.data)
                toast.success(`${res.data.message} `);
                navigate('/verifyOtp')
            return res;}
        } catch (error) {
            console.log(error);
            toast.error('Registration failed');
        }
    };


    return (
        <div className='login'>
            <main>
                <h1 className='text-center b'>Generate Otp</h1>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email'/>
                </div>
                <div>
                    <button onClick={otp}>Generate</button>
                </div>
            </main>
        </div>
    );
};

export default Forgot;
