import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "./product.css";
import toast from "react-hot-toast";
import { addToCart } from "../../redux/cart-reducer";
import { useDispatch } from "react-redux";
import { CartItem } from "../../types/types";
import { FaCartPlus } from "react-icons/fa";

const Product = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const { id } = useParams();

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
  ];

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={imageUrls[i]}
            style={{ height: "100px", width: "100px" }}
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

  return (
    <div>
      <div className="left-img-section-product">
        <div className="slider-container">
          <Slider {...settings}>
            {imageUrls.map((url, index) => (
              <div key={index}>
                <img
                  src={url}
                  alt={`Slide ${index}`}
                  style={{ height: "200px", width: "200px" }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="right">
        <div>
          <div className="card-body">
            <p className="card-title">{product.name}</p>
            <p>Stock: {product.stock}</p>
            <p className="card-text">&#x20b9;{product.price}</p>
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
  );
};

export default Product;
