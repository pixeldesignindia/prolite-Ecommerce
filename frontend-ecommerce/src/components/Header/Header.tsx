import cart from '/images/cart.svg'
import logo from '/images/logo.svg';
import userIcon from '/images/user.svg'
import { useNavigate , Link} from "react-router-dom";
import "./header.css";
import { User } from "../../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { RootState} from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import search from '/images/search.svg';
import { userNotExist } from '../../redux/userReducer';
import { RiUserSettingsLine } from "react-icons/ri";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cartReducer);
  const navigate = useNavigate();
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const logOutHandler = async () => {
    try {
      signOut(auth);
      localStorage.removeItem('userData')
      dispatch(userNotExist());
      toast.success("Log Out Successful");
    } catch (err) {
      toast.error("Log Out Failed");
    }
  };

  const handleOffCanvasClose = () => {
    setShowOffCanvas(false);
  };

  const getFirstName = (fullName: string): string => {
    // Split the full name by space
    const parts = fullName.split(' ');
    // Return the first part
    return parts[0];
  };
  const userName = user?.name ? getFirstName(user.name) : '';

  return (
    <div className="no-print">
      <Navbar expand="md" className="bg-body-tertiary">
        <Container>
          <Link to="/">
            <img src={logo} alt="logo" className="logo-img" />
          </Link>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-md"
            onClick={() => setShowOffCanvas(true)}
          />
          <Nav className="nav-Body none">
                <div className="center">
                  <div className="link-center res-link">
                    <Link to={"/prolite"} onClick={handleOffCanvasClose} className='pro-auto-link'>
                      Prolite
                    </Link>
                    <Link to={"/autoglo"} onClick={handleOffCanvasClose} className='pro-auto-link'>
                      Autoglo
                    </Link>
                  </div>
                </div>
                <div className="admin-logo" >
                  <Link
                    to={"#"}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={search}
                      alt="cart"
                      style={{ height: "1.2rem" }}
                    />
                  </Link>
                  {user?.role === "admin" && (
                    <Link to={"/admin/dashboard"} onClick={handleOffCanvasClose}>
                      {" "}
                      <RiUserSettingsLine style={{ fontSize: "1.4rem" }} />{" "}
                    </Link>
                  )}
                  <Link
                    to={"/cart"}
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={handleOffCanvasClose}
                  >
                    <img src={cart} alt="cart" style={{ width: "1.9rem" }} />
                    {cartItems && cartItems.length >= 1 && (
                      <div className="cartCount center">
                        <p>{cartItems.length}</p>
                      </div>
                    )}
                  </Link>

                  {user?._id ? (
                    <>
                      {user?.photo === "" ? (
                        <Link to={"/profile"}>
                          <div className="d-flex gap-2 align-items-center ac-data">
                            <img
                              src={userIcon}
                              alt=""
                              className="profile-img"
                            />
                            <div>
                              <p>Hello, {userName} </p>
                              <h6>Account Details</h6>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <Link to={"/profile"} onClick={handleOffCanvasClose}>
                          <div className="d-flex gap-2 align-items-center ac-data">
                            <img
                              src={user.photo}
                              alt=""
                              className="profile-img"
                            />
                            <div>
                              <p>Hello, {userName} </p>
                              <h6>Account Details</h6>
                            </div>
                          </div>
                        </Link>
                      )}
                      <button
                        className="logout center"
                        onClick={() => {
                          logOutHandler();
                          handleOffCanvasClose();
                        }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      className="log center"
                      onClick={() => {
                        navigate("/login");
                        handleOffCanvasClose();
                      }}
                    >
                      SignIn
                    </button>
                  )}
                </div>
              </Nav>
          <Offcanvas
            show={showOffCanvas}
            onHide={handleOffCanvasClose}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                <img src={logo} alt="" className="logoOff" onClick={handleOffCanvasClose}/>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="nav-Body">
                <div className="center">
                  <div className="link-center res-link">
                    <Link to={"/prolite"} onClick={handleOffCanvasClose}>
                      Prolite
                    </Link>
                    <Link to={"/autoglo"} onClick={handleOffCanvasClose}>
                      Autoglo
                    </Link>
                  </div>
                </div>
                <div className="admin-logo" >
                  <Link
                    to={"#"}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={search}
                      alt="cart"
                      style={{ height: "1.2rem" }}
                    />
                  </Link>
                  {user?.role === "admin" && (
                    <Link to={"/admin/dashboard"} onClick={handleOffCanvasClose}>
                      {" "}
                      <RiUserSettingsLine style={{ fontSize: "1.4rem" }} />{" "}
                    </Link>
                  )}
                  <Link
                    to={"/cart"}
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={handleOffCanvasClose}
                  >
                    <img src={cart} alt="cart" style={{ width: "1.9rem" }} />
                    {cartItems && cartItems.length >= 1 && (
                      <div className="cartCount center">
                        <p>{cartItems.length}</p>
                      </div>
                    )}
                  </Link>

                  {user?._id ? (
                    <>
                      {user?.photo === "" ? (
                        <Link to={"/profile"}>
                          <img src={userIcon} alt="" className="profile-img" />{" "}
                        </Link>
                      ) : (
                        <Link to={"/profile"} onClick={handleOffCanvasClose}>
                          <div className="d-flex gap-2 align-items-center ac-data">
                            <img
                              src={user.photo}
                              alt=""
                              className="profile-img"
                            />
                            <div>
                              <p>Hello, {userName} </p>
                              <h6>Account Details</h6>
                            </div>
                          </div>
                        </Link>
                      )}
                      <button
                        className="logout center"
                        onClick={() => {
                          logOutHandler();
                          handleOffCanvasClose();
                        }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      className="log center"
                      onClick={() => {
                        navigate("/login");
                        handleOffCanvasClose();
                      }}
                    >
                      SignIn
                    </button>
                  )}
                </div>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
