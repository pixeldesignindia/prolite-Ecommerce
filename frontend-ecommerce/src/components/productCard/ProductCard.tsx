import './product.css'
import { server } from "../../redux/store";
import { CartItem } from "../../types/types";
import { FaCartPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  price,
  name,
  category,
  photo,
  stock,
  handler,
}: ProductsProps) => {
  const navigate=useNavigate()
  return (
    <div className="cardC">
      {/* <p>ID: {productId}</p> */}
      <div className="img center" onClick={() => navigate(`/product/${productId}`)}>

      <img src={`${server}/${photo}`} alt={name} />
      </div>
      <div className="card-body">
      <p className="card-title">{name}</p>
      <p>Stock: {stock}</p>
      <p className="card-text">&#x20b9;{price}</p>
      {/* {category && <p>Category: {category}</p>} */}
      <button onClick={() =>handler({ productId, price, name, photo, stock, quantity: 1 })} className="add-cart"><FaCartPlus /> Add To Cart</button>
      </div>
      
    </div>
  );
};

export default ProductCard;


