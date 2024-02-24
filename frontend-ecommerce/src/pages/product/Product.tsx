import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Slider from "react-slick";
import dot from "/images/blueDot.svg"; // Assuming the correct path to the image
import "./product.css";
import toast from "react-hot-toast";
import { addToCart } from "../../redux/cart-reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import "../../components/productCard/product.css";
import ProductCard from "../../components/productCard/ProductCard";
import "../home/home.css";
import {
  useLatestProductsByBrandQuery,
} from "../../redux/api/productsApi";
import { server } from "../../redux/store";
import { CartItem, Product } from "../../types/types";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null); 
  const { id } = useParams<{ id: string }>(); 
  const addToCartHandler = (cartItem: CartItem) => { 
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
    navigate("/cart");
  };

  const {isLoading, data: brandData } = useLatestProductsByBrandQuery(""); 
  console.log(brandData);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<{ product: Product }>(
          `${import.meta.env.VITE_API_URL}api/v1/product/${id}`
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
  interface SliderSettings {
    customPaging: (i: number) => JSX.Element;
    dots: boolean;
    dotsClass: string;
    infinite: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
    initialSlide?: number;
    arrows?: boolean;
    centerPadding?: string;
    responsive?: {
      breakpoint: number;
      settings: SliderSettings;
    }[];
  }
  
  var seettings: SliderSettings = { // Type annotation for settings
    customPaging: function (i: number) {
      return (
        <a>
        <img
          src={`${server}/${product?.photos[i]}`} // Assuming `product.photos` is an array of image URLs
          alt={`Slide`}
          className="product-active-img"
          style={{ height: "60px", width: "80px" }}
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

  var settings: SliderSettings = {
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
          customPaging: function (): JSX.Element {
            throw new Error("Function not implemented.");
          },
          dotsClass: "",
          speed: 0
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          customPaging: function (): JSX.Element {
            throw new Error("Function not implemented.");
          },
          dots: false,
          dotsClass: "",
          infinite: false,
          speed: 0
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          customPaging: function (): JSX.Element {
            throw new Error("Function not implemented.");
          },
          dots: false,
          dotsClass: "",
          infinite: false,
          speed: 0
        },
      },
    ],
    customPaging: function (): JSX.Element {
      throw new Error("Function not implemented.");
    },
    dotsClass: ""
  };

  return (
    <div className="bg-blue">
      <div className="product-top container">
        <div className="row rowBlock">
          <div className="left-img-section-product col-6 w100">
            
            {product?.photos?.length===1  ? <div className="center mx-h-img" style={{height:'100%'}}><img
                      src={`${server}/${product.photos[0]}`}
                      alt='product'
                      className="product-active-img"
                    /></div>:
                    <div className="slider-container-product">
                    <Slider {...seettings}>
                    {product?.photos?.map((url, index) => (
                      <div key={index}>
                        <img
                          src={`${server}/${url}`}
                          alt={`Slide ${index}`}
                          className="product-active-img"
                        />
                      </div>
                    ))}
                  </Slider>
                  </div>
            }
              
            
          </div>
          <div className="product-data-right col-6 w100">
            <div className="center" style={{ width: "100%" }}>
              <div className="card-body-product">
                <div className="product-top-text">
                  <p className="bluetxt b">{product.productModel}</p>
                  <h3 className="product-title b">{product.name}</h3>
                  <h5>{product.dimensions}</h5>
                  <p className="stock">Stock : {product.stock}</p>
                  <p className="card-text">&#x20b9;{product.price}</p>
                </div>
                <p className="des">
                  {product.description}
                  {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur, aut praesentium. Tempore illo dolores adipisci
                  omnis provident iure, placeat quasi.
                  <p style={{ paddingTop: "1rem" }}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus eaque amet, excepturi libero sapiente labore?
                  </p> */}
                </p>
                <button
                  onClick={() =>
                    addToCartHandler({
                      productId: product._id,
                      price: product.price,
                      name: product.name,
                      photo: product.displayPhoto[0],
                      stock: product.stock,
                      quantity: 1,
                      category: product.category,
                      dimension: product.dimensions,
                      model: product.productModel,
                      brand: product.brand,
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
        <div className="des-bot">
          <p>
            {/* {product.description} */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas fugit
            consequatur ipsum nam mollitia quam nulla quibusdam voluptate
            aspernatur vel.
          </p>
        </div>
        <h6 className="blue-text b">Tags</h6>

        <div className="tag">
          {product.tags.length > 0 && product.tags.map((e,i)=>(
            <div className="tagbox" key={i}>
            <img src={dot} alt="dot" />
            {e}
          </div>
          ))}
          {/* <div className="tagbox">
            <img src={dot} alt="dot" />
            Fire Equipment Signage
          </div>
          <div className="tagbox">
            <img src={dot} alt="dot" />
            Warning Signage
          </div>
          <div className="tagbox">
            <img src={dot} alt="dot" />
            Safety Signage
          </div>
          <div className="tagbox">
            <img src={dot} alt="dot" />
            IMO Fire Control Signage
          </div>
          <div className="tagbox">
            <img src={dot} alt="dot" />
            General Signage
          </div>
          <div className="tagbox">
            <img src={dot} alt="dot" />
            Row Alphabets And Seat Numbers
          </div>
          <div className="tagbox">
            <img src={dot} alt="dot" />
            Prohibition Signage
          </div>
          <div className="tagbox">
            <img src={dot} alt="dot" />
            Direction Signage
          </div>
          <div className="tagbox">
            <img src={dot} alt="dot" />
            Aqua Safety Signage
          </div> */}
        </div>
      </div>
      <h3 className="related">Related Poducts</h3>
      {!isLoading && (
        // <MultipleItems>
        <div className=" slider-container">
          {product.brand === "PROLITE" ? (
            <Slider {...settings}>
              {brandData?.latestProductsByBrand?.Prolite?.map((i: Product) => (
                <ProductCard
                  key={i._id}
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  category={i.category}
                  handler={addToCartHandler}
                  photos={i.photos}
                  dimension={i.dimensions}
                  model={i.productModel}
                  brand={i.brand}
                  displayPhoto={i.displayPhoto}                />
              ))}
            </Slider>
          ) : (
            <Slider {...settings}>
              {brandData?.latestProductsByBrand?.Autoglo?.map((i: Product) => (
                <ProductCard
                  key={i._id}
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  category={i.category}
                  handler={addToCartHandler}
                  photos={i.photos}
                  dimension={i.dimensions}
                  model={i.productModel}
                  brand={i.brand} displayPhoto={[]}                />
              ))}
            </Slider>
          )}

          <div className="btn-ex">
            <button className="Explore" id="explore-btn" type="button">
              Explore All
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Product;
// interface SliderSettings { // Interface for SliderSettings
//   customPaging: (i: number) => JSX.Element;
//   dots: boolean;
//   dotsClass: string;
//   infinite: boolean;
//   speed: number;
//   slidesToShow: number;
//   slidesToScroll: number;
//   initialSlide?: number;
//   arrows?: boolean;
//   centerPadding?: string;
//   responsive?: {
//     breakpoint: number;
//     settings: SliderSettings;
//   }[];
// }