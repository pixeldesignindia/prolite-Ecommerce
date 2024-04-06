import { Link } from "react-router-dom";
import { server } from "../../redux/store";
import { CartItem } from "../../types/types";
import './cartItem.css'
import { FiPlus } from "react-icons/fi";
import { HiOutlineMinus } from "react-icons/hi";
import del from '/images/cartDel.svg'
type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};

const CartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity,category,dimension,model} = cartItem;

  return (
    <div className="cart-item">
      <div className="cart-img-section center">
      <img src={`${server}/${photo}`} alt={name} className="cartImg" />
      </div>
      
      <article >
        <div className="cart-pro-data">
          <Link to={`/product/${productId}`} className="b">{name}</Link>
          <p>Category : {category}</p>
          <p>Dimension : {dimension}</p>
          <p>Model : {model}</p>
          <p className="cartDataPrice b">Price : <span>₹{price.toFixed(2)}</span></p>
        </div>
        <div className="i-d-btns">
        <button className="red-bg center" onClick={() => decrementHandler(cartItem)}><HiOutlineMinus/></button>
        <p>{quantity}</p>
        <button className="center" onClick={() => incrementHandler(cartItem)}><FiPlus/></button>
      </div>
      </article>
      <button className="del-btn" onClick={() => removeHandler(productId)}>
        <img src={del} alt="" />
      </button>
    </div>
  );
};

export default CartItem;
