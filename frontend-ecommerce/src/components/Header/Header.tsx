import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import { useNavigate} from "react-router-dom";
import "./header.css";
import { User } from "../../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { RootState, server } from "../../redux/store";
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
  <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/"><img src={logo} alt="logo"  className='logo-img' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-Body">
            <div>
            <div className="link-center">
            <Nav.Link href={"/prolite"}>Prolite</Nav.Link>
            <Nav.Link href={"/autoglo"}>Autoglo</Nav.Link>
            <Nav.Link href={"/orders"}>Orders</Nav.Link></div>
            </div>
      <Nav.Link href={"/cart"}>
      <FaShoppingCart />
        {cartItems && cartItems.length>=1 && cartItems.length}
      </Nav.Link>
      <div className='admin-logo'>{user?._id ? <><Nav.Link href={"/admin/product"}><FaUser /></Nav.Link><button className="logout" onClick={logOutHandler}>Logout</button></> : <button className="log" onClick={()=>{navigate('/login')}}>SignIn</button>}</div>
      
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
  );
};

export default Header;
