import cart from '/images/cart.svg'
import { useNavigate , Link} from "react-router-dom";
import "./header.css";
import userIcon from '/images/user.svg'
import { User } from "../../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { RootState} from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '/images/logo.svg';
import search from '/images/search.svg';
import { userNotExist } from '../../redux/userReducer';
import { useEffect, useState } from 'react';
import { RiUserSettingsLine } from "react-icons/ri";
interface propestype {
  user: User | null;
}
const Header = ({ user }: propestype) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cartReducer);
  const navigate = useNavigate();
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  
  const logOutHandler = async () => {
    try {
      signOut(auth);
      dispatch(userNotExist())
      toast.success("Log Out Successful");
    } catch (err) {
      toast.error("Log Out Failed");
    }
  };

  const handleLinkClick = () => {
    setNavbarExpanded(false); // Close Navbar on link click
  };
useEffect(()=>{handleLinkClick()},[])
  return (
    <div className="no-print">
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        expanded={navbarExpanded}
        onToggle={() => setNavbarExpanded(!navbarExpanded)} 
      >
        <Container>
          <Link to="/"><img src={logo} alt="logo"  className='logo-img' /></Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-Body">
              <div className="center"> 
                <div className="link-center res-link">
                  <Link to={"/prolite"} onClick={handleLinkClick}>Prolite</Link>
                  <Link to={"/autoglo"} onClick={handleLinkClick}>Autoglo</Link>
                </div>
              </div>
              <div className='admin-logo'>
                <Link to={"#"} style={{display:'flex',alignItems:'center'}} onClick={handleLinkClick}>
                  <img src={search} alt='cart' style={{height:'1.2rem'}}/>
                </Link>

                {user?.role==='admin' && <Link to={"/admin/dashboard"} onClick={handleLinkClick}> <RiUserSettingsLine  style={{fontSize:'1.4rem'}} /> </Link>}
                
                <Link to={"/cart"} style={{display:'flex',alignItems:'center'}} onClick={handleLinkClick}>
                  <img src={cart} alt='cart' style={{height:'1.5rem'}}/>
                  <p className='cartCount'>{cartItems && cartItems.length>=1 && cartItems.length}</p>
                </Link>

                {user?._id ? <>
                  {user?.photo===''?<Link to={"/profile"} onClick={handleLinkClick}> <img src={userIcon} alt="" className="profile-img" /> </Link> :<Link to={"/profile"} onClick={handleLinkClick}> <img src={user.photo} alt="" className="profile-img" /> </Link> }
                  <button className="logout center" onClick={() => { logOutHandler(); handleLinkClick(); }}>Logout</button>

                </> : <button className="log center" onClick={() => { navigate('/login'); handleLinkClick(); }}>SignIn</button>
}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};


export default Header;
