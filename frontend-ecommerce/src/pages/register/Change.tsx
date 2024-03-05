import { useState } from 'react';
import './register.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Change = () => {

    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const otpVerify = async () => {
        try {
            if (newPassword.length < 6) {
                toast.error('Password must be at least 6 characters long');
                return;
            }
            if (newPassword !== confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }
            const verifiedToken = sessionStorage.getItem('codeOne');
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}api/v1/users/forgetPassword`, { verifiedToken, newPassword }
            );
            console.log(res);
            if ('data' in res) {
                toast.success(`${res.data.message}`);
                navigate('/login');
                return res;
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred. Please try again later.');
        }
    };


    return (
        <div className='login'>
            <main>
                <h1 className='text-center b'>Change Password</h1>
                <div>
                    <label>New Password</label>
                    <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder='Otp'/>
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder='Confirm Password'/>
                </div>
                <div>
                    <button onClick={otpVerify}>Verify</button>
                </div>
            </main>
        </div>
    );
};

export default Change;
