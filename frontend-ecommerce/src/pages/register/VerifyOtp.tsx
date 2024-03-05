import { useState } from 'react';
import './register.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Verify = () => {

    const navigate =useNavigate()
    const [otp, setOtp] = useState('');


    const otpVerify = async () => {
        try {
            const otpToken = sessionStorage.getItem('codeOne');
            const  res  = await axios.post(
                `${import.meta.env.VITE_API_URL}api/v1/users/verifyOtp`,{otp,otpToken}
            );
            console.log(res);
            
            if('data' in res) {
                sessionStorage.setItem('codeOne',res.data.data)
                toast.success(`${res.data.message} `);
                navigate('/changePassword')
            return res;}
        } catch (error) {
            console.log(error);
            toast.error('Wrong Otp');
        }
    };


    return (
        <div className='login'>
            <main>
                <h1 className='text-center b'>Generate Otp</h1>
                <div>
                    <label>Verify Your Otp</label>
                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required placeholder='Otp'/>
                </div>
                <div>
                    <button onClick={otpVerify}>Verify</button>
                </div>
            </main>
        </div>
    );
};

export default Verify;
