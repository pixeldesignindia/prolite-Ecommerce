import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { server } from "../../redux/store";
import { CartItem } from "../../types/types";
import './cartItem.css'
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
  const { photo, productId, name, price, quantity } = cartItem;

  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name} className="cartImg" />
      <article >
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>

      <div className="i-d-btns">
        <button className="red-bg center" onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button className="center" onClick={() => incrementHandler(cartItem)}>+</button>
      </div>

      <button className="delete-btn" onClick={() => removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
