import axios from "axios";
import './cart.css'
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import CartItemCard from "../../components/cart-item/Cart-Item";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../../redux/cart-reducer";
import { RootState, server } from "../../redux/store";
import { CartItem } from "../../types/types";
import Footer from "../../components/footer/Footer";
import { UserReducerInitialState } from "../../types/reducerTypes";
import toast from "react-hot-toast";


const Cart = () => {
  const {user}= useSelector((state:{userReducer:UserReducerInitialState})=>state.userReducer)
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();
const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };
  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payments/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);
const loginFirst=()=>{
  toast.error('Please login first')
  navigate('/login')
}
  return (
    <>
    <div className="cart res-col-center" >
      <main className="bg-dark-blue w100">
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItemCard
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              key={idx}
              cartItem={i}
            />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}
      </main>
      <aside className="center w100">
        
        <div className="priceCard col-center">
        <h3>Pricing</h3>
        <div className="cartPriceBox">
        <div className="cartBoxRow ">Subtotal: <span> ₹{subtotal}</span></div>
        {cartItems.length > 0 && <div className="cartBoxRow ">Shipping Charges: <span>₹{shippingCharges}</span> </div>}
        <div className="cartBoxRow ">Tax: <span>₹{tax}</span> </div>
        <p className="cartBoxRow ">
          Discount: <em className="red"> - ₹{discount}</em>
        </p>
        <p>
        {cartItems.length< 1 ? <div className="cartBoxRow b">Total: <span>₹0</span>  </div>:<div className="cartBoxRow b">Total: <span>₹{total}</span> </div>}
        </p>
<div className="center">
<input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="coupon-code b"
        />
</div>
<div className="center">
{couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}
</div>
        {user?<div>{cartItems.length > 0 && <button className="checkout center" onClick={()=>{navigate('/shipping')}}>Checkout</button> }</div>:<div> <button className="checkout center" onClick={loginFirst}>Checkout</button> </div>}

{/* <Link to="/shipping">Checkout</Link> */}
        </div>
        </div>
      </aside>
    </div>
    <Footer/></>
  );
};

export default Cart;
