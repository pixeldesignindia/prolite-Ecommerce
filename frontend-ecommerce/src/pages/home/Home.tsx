import React from "react"; // Added space between React and "from"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Slider from "react-slick";
import './home.css'
import Banner from "../../components/banner/Banner";
import ProductCard from "../../components/productCard/ProductCard";
import Brand from "../../components/brand/Brand";
import Footer from "../../components/footer/Footer";
import { useLatestProductsByBrandQuery } from "../../redux/api/productsApi";
import { addToCart } from "../../redux/cart-reducer";
import { CartItem, Product } from "../../types/types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isSuccess, isError } = useLatestProductsByBrandQuery("");

  if (isError) {
    toast.error("Can't Fetch Products");
  }

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
    // navigate("/cart");
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    centerPadding: "100px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-blue">
      <Banner />
      <div className="text-align-center">
        <h2 className="heading">Shop by brand</h2>
        <h4 className="para">AutoGlo</h4>
      </div>
      <div className="slider-container">
        {isSuccess && (
          <div className="slider-container blue">
            <Slider {...settings}>
              {data?.latestProductsByBrand?.Autoglo?.map((i: Product) => (
                <ProductCard
                  key={i._id}
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  displayPhoto={i.displayPhoto}
                  category={i.category}
                  handler={addToCartHandler}
                  photos={i.photos}
                  dimension={i.dimensions}
                  model={i.productModel}
                  brand={i.brand}
                />
              ))}
            </Slider>
          </div>
        )}
        <div className="btn-ex">
          <button className="Explore" id="explore-btn" type="button" onClick={() => navigate("/autoglo")}>
            Explore All
          </button>
        </div>
      </div>
      <h4 className="para" style={{ color: "#014FB3" }}>Prolite</h4>
      {isSuccess && (
        <div className="slider-container">
          <Slider {...settings} className="grn">
            {data?.latestProductsByBrand?.Prolite?.map((i: Product) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                displayPhoto={i.displayPhoto}
                category={i.category}
                handler={addToCartHandler}
                photos={i.photos}
                dimension={i.dimensions}
                model={i.productModel}
                brand={i.brand}
              />
            ))}
          </Slider>
        </div>
      )}
      <div className="btn-ex">
        <button className="Explore" id="explore-btn" type="button" onClick={() => navigate("/prolite")}>
          Explore All
        </button>
      </div>
      <Brand />
      <Footer />
    </div>
  );
};

export default Home;
