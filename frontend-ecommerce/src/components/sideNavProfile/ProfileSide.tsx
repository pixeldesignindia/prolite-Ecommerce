import React from 'react'
import './side.css'
import { Link } from 'react-router-dom'


const ProfileSide = ({name,pic}) => {
    const logOutHandler = async () => {
        try {
          signOut(auth);
          toast.success("Log Out Successful");
        } catch (err) {
          toast.error("Log Out Failed");
        }
      };
  return (
    <div className='sideBar'>
        <div className='w-box'><p>Hi, </p> <h4><img src={pic} alt="" style={{height:'25px',width:'25px',borderRadius:'50%'}} /> {name}</h4></div>
        <div className='w-box m-h-s' style={{marginTop:'2rem'}}>
      <Link to='/profile'>MyDetails</Link>
      <Link to='/profile/myOrders'>My Orders</Link>
      <Link to='/profile'>My Transactions</Link>
      <div className="center" style={{paddingTop:'3rem'}}><button className="logout center" 
      onClick={logOutHandler}>Logout</button></div>
      </div>
      
      
    </div>
  )
}

export default ProfileSide
