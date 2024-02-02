import { FaPlus } from "react-icons/fa";
import { server } from "../../redux/store";
import { CartItem } from "../../types/types";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  category:string
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
    <div  className='product-card'>
    <p>ID: {productId}</p>
    <img src={`${server}/${photo}`} alt={name} style={{ width: '200px', height: '200px' }} />
    <p>Name: {name}</p>
    <p>Stock: {stock}</p>
    <p>Price: ${price}</p>
    {category && <p>Category: {category}</p>}
    <button onClick={() =>
            handler({ productId, price, name, photo, stock, quantity: 1 })
          }
        ><FaPlus /></button>
  </div>
  );
};

export default ProductCard;
