import { FaUser } from "react-icons/fa";
import { useNavigate , Link} from "react-router-dom";
import "./header.css";
import { User } from "../../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { RootState} from "../../redux/store";
import { useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '/images/logo.svg';
import { FaShoppingCart } from "react-icons/fa";
interface propestype {
  user: User | null;
}
const Header = ({ user }: propestype) => {
  const { cartItems } =useSelector((state: RootState) => state.cartReducer);
  const logOutHandler = async () => {
    try {
      signOut(auth);
      toast.success("Log Out Successful");
    } catch (err) {
      toast.error("Log Out Failed");
    }
  };
  const navigate=useNavigate()
  return (
    // <nav>
    //   <Link to={"/"}>Home</Link>
    //   <Link to={"/product"}>Product</Link>
    //   <Link to={"/orders"}>Orders</Link>
    //   <Link to={"/cart"}>
    //     <FaShoppingBag />
    //     {cartItems && cartItems.length>=1 && cartItems.length}
    //   </Link>
    //   {user?._id ? <><Link to={"/admin/product"}><FaUser /></Link><button onClick={logOutHandler}>Log Out</button></> : <Link to={"/logIn"}>SignIn</Link>}
    // </nav>
  <div className="no-print">
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/"><img src={logo} alt="logo"  className='logo-img' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-Body">
            <div className="center"> 
            <div className="link-center res-link">
            <Link to={"/prolite"}>Prolite</Link>
            <Link to={"/autoglo"}>Autoglo</Link>
            {/* <Nav.Link href={"/orders"}>Orders</Nav.Link> */}
            </div>
            </div>
      
      <div className='admin-logo'>
      <Link to={"/cart"} style={{display:'flex',alignItems:'center'}}>
      <FaShoppingCart style={{color:'#1176D0'}} />
        {cartItems && cartItems.length>=1 && cartItems.length}
      </Link>
        {user?._id ? <><Link to={"/admin/product"}><FaUser /></Link> <Link to={"/profile"}> <img src={user.photo} alt="" className="profile-img" /> </Link>  <button className="logout center" onClick={logOutHandler}>Logout</button></> : <button className="log center" onClick={()=>{navigate('/login')}} >SignIn</button>}</div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
  );
};

export default Header;
