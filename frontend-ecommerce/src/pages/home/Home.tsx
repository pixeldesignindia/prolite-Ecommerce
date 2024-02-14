import React, { useEffect } from "react";
import { useGetProductsQuery } from "../../redux/api/api";
import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/reducer";
import "./home.css";
import Banner from '../../components/banner/Banner'
import { useLatestProductsByBrandQuery } from "../../redux/api/productsApi";
import toast from "react-hot-toast";
import { server } from "../../redux/store";
import { Product } from "../../types/types";
import ProductCard from "../../components/productCard/ProductCard";
import { addToCart } from "../../redux/cart-reducer";
import { CartItem } from "../../types/types";
import Slider from "react-slick";
import Brand from "../../components/brand/Brand";
import Footer from '../../components/footer/Footer';
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
const navigate=useNavigate()
  const { isLoading, data, isError, error, isSuccess } =
  useLatestProductsByBrandQuery("");
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
    centerPadding:'100px',
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
    <div className="bg-blue">
    <Banner/>
<div className="text-align-center">
  <h2 className="heading">Shop by brand</h2>
        <h4 className="para">AutoGlo</h4></div>
      <div className=" slider-container">
      {isSuccess && (
      // <MultipleItems>
        <div className=" slider-container">
          <Slider {...settings}>
            {data?.latestProductsByBrand?.AUTOGLO?.map((i: Product) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photos={i.photos}
                category={i.category}
              />
            ))}
          </Slider>
        </div>

    )}
    <div className="btn-ex"><button className="Explore" id="explore-btn" type="button" onClick={()=>{navigate('/autoglo')}}>Explore All</button></div>

      </div>
      <h4 className="para" style={{color:'#014FB3'}}>Prolite</h4>
      {isSuccess && (
      // <MultipleItems>
        <div className=" slider-container">
          <Slider {...settings}>
            {data?.latestProductsByBrand?.PROLITE?.map((i: Product) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photos={i.photos}
                category={i.category}
              />
            ))}
          </Slider>
        </div>

      // </MultipleItems>
    )}
    <div className="btn-ex"><button className="Explore" id="explore-btn" type="button" onClick={()=>{navigate('/prolite')}}>Explore All</button></div>
    <Brand/>
    <Footer/>
    </div>
  );
};

export default Home;
