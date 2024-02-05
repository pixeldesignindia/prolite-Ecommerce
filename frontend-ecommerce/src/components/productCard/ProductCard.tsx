import './product.css'
import { server } from "../../redux/store";
import { CartItem } from "../../types/types";
import { FaCartPlus } from "react-icons/fa6";

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
  return (
    <div className="cardC">
      {/* <p>ID: {productId}</p> */}
      <div className="img">
      <img src={`${server}/${photo}`} alt={name} style={{ width: "200px", height: "200px" }}/>
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

{
  /* <div class="card">
                    <div class="img"><img src="img/right-arrow.jpeg" class="card-img-top" alt="..."></div>
                    <div class="card-body">
                      <h5 class="card-title">PHOTOLUMINESCENT SIGNAGES</h5>
                      <p class="card-text">3,000.00</p>
                      <div class="add-cart">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <p class="add">Add to Cart</p>
                      </div>
                    </div>
                  </div> */
}
