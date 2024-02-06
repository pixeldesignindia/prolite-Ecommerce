import React, { useEffect } from "react";
import { useGetProductsQuery } from "../../redux/api/api";
import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/reducer";
import "./home.css";
import Banner from '../../components/banner/Banner'
import { useLatestProductsQuery } from "../../redux/api/productsApi";
import toast from "react-hot-toast";
import { server } from "../../redux/store";
import { Product } from "../../types/types";
import ProductCard from "../../components/productCard/ProductCard";
import { addToCart } from "../../redux/cart-reducer";
import { CartItem } from "../../types/types";
import Slider from "react-slick";
import Brand from "../../components/brand/Brand";
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
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
    <Banner/>
<div className="text-align-center">
  <h2 className="heading">Shop by brand</h2>
        <h4 className="para">AutoGlo</h4></div>
      <div className=" slider-container">
      {isSuccess && (
      // <MultipleItems>
        <div className=" slider-container">
          <Slider {...settings}>
            {data.products?.map((i: Product) => (
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
            ))}
          </Slider>
        </div>

      // </MultipleItems>
    )}
    <div className="btn-ex"><button className="Explore" id="explore-btn" type="button">Explore All</button></div>

      </div>
      <h4 className="para" style={{color:'#014FB3'}}>Prolite</h4>
      {isSuccess && (
      // <MultipleItems>
        <div className=" slider-container">
          <Slider {...settings}>
            {data.products?.map((i: Product) => (
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
            ))}
          </Slider>
        </div>

      // </MultipleItems>
    )}
    <div className="btn-ex"><button className="Explore" id="explore-btn" type="button">Explore All</button></div>
    <Brand/>
    </>
  );
};

export default Home;
