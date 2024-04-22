import './side.css';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '../../firebase';
import { userNotExist } from '../../redux/userReducer';
import userIcon from '/images/user.svg';
import { useDispatch } from 'react-redux';

type ProfileSideProps = {
  name: string;
  pic: string;
};

const ProfileSide = ({ name, pic }: ProfileSideProps) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const logOutHandler = async () => {
    try {
      await signOut(auth);
      dispatch(userNotExist());
      toast.success('Log Out Successful');
    } catch (err) {
      toast.error('Log Out Failed');
    }
  };

  const isActiveLink = (pathname: string) => {
    return location.pathname === pathname ? { color: 'rgb(1, 79, 179)' } : {};
  };

  return (
    <div className="sideBar">
      <div className="w-box row gap-1">
        <div className="col-2">
          {pic === '' ? (
            <img src={userIcon} alt="" style={{ height: '30px', borderRadius: '50%' }} />
          ) : (
            <img src={pic} alt="" style={{ height: '30px', borderRadius: '50%' }} />
          )}
        </div>
        <div className="col-9">
          <p>Hi,</p>
          <h4>{name}</h4>
        </div>
      </div>
      <div className="w-box m-h-s" style={{ marginTop: '2rem' }}>
        <Link to="/profile" style={isActiveLink('/profile')}>
          MyDetails
        </Link>
        <Link to="/profile/myOrders" style={isActiveLink('/profile/myOrders')}>
          My Orders
        </Link>
        {/* <Link to='/profile'>My Transactions</Link> */}
        <div className="center side-log-out">
          <button className="logout center profile-logout-btn" onClick={logOutHandler}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSide;
