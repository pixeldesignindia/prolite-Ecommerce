import './product.css';
import { server } from "../../redux/store";
import { CartItem } from "../../types/types";
import { FaCartPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
// import cart from '/images/add-cart.svg'

type ProductsProps = {
  productId: string;
  photos: string[];
  name: string;
  price: number;
  stock: number;
  displayPhoto: string[]; 
  category?: string;
  brand: string;
  dimension: string;
  model: string;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  price,
  name,
  displayPhoto,
  category,
  stock,
  handler,
  brand,
  dimension,
  model
}: ProductsProps) => {
  const navigate = useNavigate();

  return (
    <div className="cardC">
      <div className="img center" onClick={() => navigate(`/product/${productId}`)} style={{cursor:'pointer'}}>
        <img src={`${server}/${displayPhoto[0]}`} alt={name} />
      </div>
      <div className="card-body">
        <p className="card-title">{name}</p>
        {stock>0?<p >Stock: {stock}</p>:<p style={{color:"red"}}>Out Of Stock</p>}
        
        <p className="card-text">&#x20b9;{price.toFixed(2)}</p>
        {/* {category && <p>Category: {category}</p>} */}
        <button onClick={() => handler({
          productId,
          price,
          name,
          photo: displayPhoto[0],
          stock,
          quantity: 1,
          brand,
          dimension,
          model,
          category: category || '' // Default value if category is not provided
        })} className="add-cart"><FaCartPlus  /> Add To Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
