import './side.css';
import { Link } from 'react-router-dom';
import { signOut} from 'firebase/auth'; 
import toast from 'react-hot-toast';
import { auth } from '../../firebase';
import { userNotExist } from '../../redux/userReducer';
import userIcon from '/images/user.svg'
import { useDispatch } from 'react-redux';
type ProfileSideProps = {
  name: string;
  pic: string;
};

const ProfileSide = ({ name, pic }: ProfileSideProps) => {
  const dispatch=useDispatch()
  const logOutHandler = async () => {
    try {
      await signOut(auth);
      dispatch(userNotExist())
      toast.success("Log Out Successful");
    } catch (err) {
      toast.error("Log Out Failed");
    }
  };

  return (
    <div className='sideBar'>
      <div className='w-box row'>
        <div className='col-2'>
          {pic===''?<img src={userIcon} alt="" style={{ height: '25px', width: '25px', borderRadius: '50%' }} />:<img src={pic} alt="" style={{ height: '25px', width: '25px', borderRadius: '50%' }} />}
          
        </div>
        <div className='col-10'>
          <p>Hi,</p>
          <h4>{name}</h4>
        </div>
      </div>
      <div className='w-box m-h-s' style={{ marginTop: '2rem' }}>
        <Link to='/profile'>MyDetails</Link>
        <Link to='/profile/myOrders'>My Orders</Link>
        {/* <Link to='/profile'>My Transactions</Link> */}
        <div className="center side-log-out">
          <button className="logout center" onClick={logOutHandler}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSide;
