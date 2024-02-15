import './product.css'
import { server } from "../../redux/store";
import { CartItem } from "../../types/types";
import { FaCartPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
type ProductsProps = {
  productId: string;
  photos: string[];
  name: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
    dimension:string;
    model: string;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  price,
  name,
  category,
  photos,
  stock,
  handler,
  brand,
  dimension,
  model
}: ProductsProps) => {
  const navigate=useNavigate()
  return (
    <div className="cardC">
      {/* <p>ID: {productId}</p> */}
      <div className="img center" onClick={() => navigate(`/product/${productId}`)}>

      <img src={`${server}/${photos[0]}`} alt={name} />
      </div>
      <div className="card-body">
      <p className="card-title">{name}</p>
      <p>Stock: {stock}</p>
      <p className="card-text">&#x20b9;{price}</p>
      {/* {category && <p>Category: {category}</p>} */}
      <button onClick={() =>handler({ productId, price, name, photo:photos[0], stock, quantity: 1,brand,
  dimension,
  model,category })} className="add-cart"><FaCartPlus /> Add To Cart</button>
      </div>
      
    </div>
  );
};

export default ProductCard;


