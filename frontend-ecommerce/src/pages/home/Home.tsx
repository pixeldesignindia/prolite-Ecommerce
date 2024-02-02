import React, { useEffect } from "react";
import { useGetProductsQuery } from "../../redux/api/api";
import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/reducer";
import "./home.css";
import { useLatestProductsQuery } from "../../redux/api/productsApi";
import toast from "react-hot-toast";
import { server } from "../../redux/store";
import { Product } from "../../types/types";
import ProductCard from "../../components/productCard/ProductCard";
import { addToCart } from "../../redux/cart-reducer";
import { CartItem } from "../../types/types";
const Home: React.FC = () => {
  const { isLoading, data, isError, error, isSuccess } =
    useLatestProductsQuery("");
  // const {isLoading,data,isSuccess,error,isError}=useGetProductsQuery('')
  console.log(isLoading, data, isSuccess, error);
  if (isError) {
    toast.error("Can't Fetch Products");
  }
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };
  return (
    <>
      <div className="product-container">
        {isLoading ? (
          <>loading</>
        ) : data ? (
          data.products?.map((i: Product) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photo={i.photo}
              category={i.category}
            />
          ))
        ) : null}
      </div>
    </>
  );
};

export default Home;
