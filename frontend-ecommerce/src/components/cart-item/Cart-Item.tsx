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
          <div className="i-d-btns">
        <button className="red-bg center" onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button className="center" onClick={() => incrementHandler(cartItem)}>+</button>
      </div>
        </div>

        <p>Price : <span className=" b" style={{color:'#46923c'}}>₹{price}</span></p>
      </article>

      

      <button className="delete-btn" onClick={() => removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
