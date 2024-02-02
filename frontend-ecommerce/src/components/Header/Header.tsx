import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./header.css";
import { User } from "../../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { RootState, server } from "../../redux/store";
import { useSelector } from "react-redux";

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
  return (
    <nav>
      <Link to={"/"}>Home</Link>
      <Link to={"/product"}>Product</Link>
      <Link to={"/orders"}>Orders</Link>
      <Link to={"/cart"}>
        <FaShoppingBag />
        {cartItems && cartItems.length>=1 && cartItems.length}
      </Link>
      {user?._id ? <><Link to={"/admin/product"}><FaUser /></Link><button onClick={logOutHandler}>Log Out</button></> : <Link to={"/logIn"}>SignIn</Link>}
    </nav>
  );
};

export default Header;
