import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from '../../components/footer/Footer'
import Slider from "react-slick";
import dot from '/images/blueDot.svg'
import "./product.css";
import toast from "react-hot-toast";
import { addToCart } from "../../redux/cart-reducer";
import { useDispatch } from "react-redux";
import { CartItem } from "../../types/types";
import { FaCartPlus } from "react-icons/fa";
import './../../components/productCard/product.css'
import ProductCard from "../../components/productCard/ProductCard";
import "../home/home.css";
import { useLatestProductsQuery } from "../../redux/api/productsApi";
const Product = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { isLoading, data, isError, error, isSuccess } =
    useLatestProductsQuery("");
  const addToCartHandler = (cartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/product/${id}`
        );
        setProduct(response.data.product);
        console.log(response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const imageUrls = [
    "https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?cs=srgb&dl=clouds-cloudy-countryside-236047.jpg&fm=jpg",
    "https://preview.redd.it/mbrbcccup8g11.jpg?width=1080&crop=smart&auto=webp&s=e240fa06f569810a69f6510af6f5cdb0ea0abf83",
    "https://live.staticflickr.com/4289/34781285994_71774534bd.jpg",
    "https://live.staticflickr.com/4289/34781285994_71774534bd.jpg",
    "https://live.staticflickr.com/4289/34781285994_71774534bd.jpg",
  ];

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={imageUrls[i]}
            style={{ height: "60px", width: "80px" }}
            alt={`Slide ${i}`}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };
  var ssettings = {
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
      <div className="product-top container">
        <div className="row">
        <div className="left-img-section-product col-6">
        <div className="slider-container-product">
          <Slider {...settings}>
            {imageUrls.map((url, index) => (
              <div key={index}>
                <img
                  src={url}
                  alt={`Slide ${index}`}
                  className="product-active-img"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="product-data-right col-6">
        <div className="center" style={{width:'100%'}}>
          <div className="card-body-product">
            <div>
            <p className="card-title">{product.name}</p>
            <p className="stock">Stock : {product.stock}</p>
            <p className="card-text">&#x20b9;{product.price}</p>
            </div>
            <p className="des">
              {/* {product.description} */}
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, aut praesentium. Tempore illo dolores adipisci omnis provident iure, placeat quasi.
        
              <p style={{paddingTop:"1rem"}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus eaque amet, excepturi libero sapiente labore?</p>
              
              </p>
            <button
              onClick={() =>
                addToCartHandler({
                  productId: product.productId,
                  price: product.price, 
                  name: product.name, 
                  photo: product.photo, 
                  stock: product.stock, 
                  quantity: 1,
                })
              }
              className="add-cart"
            >
              <FaCartPlus /> Add To Cart
            </button>
          </div>
        </div>
      </div>
        </div>
      </div>
      <div className="tags container">
        <div className="row">
          <div className="col-2">DESCRIPTION</div>
          <div className="col-2">ATTACHMENT</div>
          <div className="col-2">VIDEO</div>
        </div>
        <div className="des-bot"><p>
          {/* {product.description} */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas fugit consequatur ipsum nam mollitia quam nulla quibusdam voluptate aspernatur vel.
          </p></div>
        <h6 className="blue-text b">Tags</h6>
        <div className="tag">
          <div className="tagbox"><img src={dot} alt="dot" />Fire Equipment Signage</div>
          <div className="tagbox"><img src={dot} alt="dot" />Warning Signage</div>
          <div className="tagbox"><img src={dot} alt="dot" />Safety Signage</div>
          <div className="tagbox"><img src={dot} alt="dot" />IMO Fire Control Signage</div>
          <div className="tagbox"><img src={dot} alt="dot" />General Signage</div>
          <div className="tagbox"><img src={dot} alt="dot" />Row Alphabets And Seat Numbers</div>
          <div className="tagbox"><img src={dot} alt="dot" />Prohibition Signage</div>
          <div className="tagbox"><img src={dot} alt="dot" />Direction Signage</div>
          <div className="tagbox"><img src={dot} alt="dot" />Aqua Safety Signage</div>
        </div>
      </div>
<h3 className="related">Related Poducts</h3>
      {isSuccess && (
      // <MultipleItems>
        <div className=" slider-container">
          <Slider {...ssettings}>
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
          <div className="btn-ex"><button className="Explore" id="explore-btn" type="button">Explore All</button></div>
        </div>
    )}
    <Footer/>
    </div>
  );
};

export default Product;
