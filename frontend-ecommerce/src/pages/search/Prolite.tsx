import './search.css'
import{ useState } from "react";
import {
  useCategoryOfBrandQuery,
  useSearchProductsQuery,
} from "../../redux/api/productsApi";
import { CustomError } from "../../types/api-types";
import { toast } from "react-hot-toast";
import ProductCard from "../../components/productCard/ProductCard";
import { addToCart } from "../../redux/cart-reducer";
import { CartItem } from "../../types/types";
import { useDispatch } from "react-redux";
import Footer from '../../components/footer/Footer'
import { FiSearch } from "react-icons/fi";
// import { useNavigate } from 'react-router-dom';
import { GoChevronRight } from 'react-icons/go';
import SkeletonLoading from '../../components/skeleton/SkeletonLoading';

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  // const navigate=useNavigate()
  const {
    isLoading: productLoading,
    data: searchData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({ search, sort, category, page, price: maxPrice ,brand:"PROLITE" });
  console.log(searchData);


  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
    // navigate('/cart')
  };

  const {
    data: categoriesResponse,
    error,
    isError,
  } = useCategoryOfBrandQuery("");
  console.log(categoriesResponse)
  if (isError) {
    const err = error as CustomError;
    toast.error(err?.data?.message||"Can`t find Products");
  }
  const isPrevPage = page > 1;
  const isNextPage = page < 4;
  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err?.data?.message||"Can`t find Products");
  }

  return (
    <>
    <div className="top-nav ">
    <p>Home</p>
    <GoChevronRight />
    <p className="lastP">Prolite</p>
    </div>
    <div className="product-search-page bg-blue">
      <aside>
        <h3 style={{color:'#014FB3'}}>Filters</h3>
        <div>
          <h5 >Sort</h5>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className='s-m-t'>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h5 >Max Price: <span style={{color:'#014FB3'}}>{maxPrice || ""}</span> </h5>
          <input
            type="range"
            min={100}
            max={10000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className='range-input s-m-t'
          />
        </div>

        <div>
          <h5 >Category</h5>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)} className='s-m-t'
          >
            <option value="">ALL</option>
            {categoriesResponse &&
              categoriesResponse?.categoriesByBrand[1]?.categories.map((i:string) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main className='blue'>
        <div className="row products-page-head">
          <div className="col-4" style={{display:'flex',alignItems:'center'}}><h2 className='b'>Product Category</h2></div>
          <div className="col-4 " style={{display:'flex',alignItems:'center ',justifyContent:'center'}}><h4 className='blue-text text-center'>PROLITE</h4> </div>

          <div className="col-4 search-pro"><div className="input-box">
        <FiSearch/>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        </div></div>
        </div>
        
        
        <div className="container">
      
            {productLoading ? (
          <div className="search-product-list row">
          <div className="col-12 col-md-4 mb-3 mt-product-card"><SkeletonLoading/></div>
          <div className="col-12 col-md-4 mb-3 mt-product-card"><SkeletonLoading/></div>
          <div className="col-12 col-md-4 mb-3 mt-product-card"><SkeletonLoading/></div>
          <div className="col-12 col-md-4 mb-3 mt-product-card"><SkeletonLoading/></div>
          <div className="col-12 col-md-4 mb-3 mt-product-card"><SkeletonLoading/></div>
          <div className="col-12 col-md-4 mb-3 mt-product-card"><SkeletonLoading/></div>
        </div>
        ) : (
          <div className="search-product-list row">
            {searchData?.products.map((i) => (
              <div key={i._id} className="col-12 col-md-4 mb-3 mt-product-card">
                <ProductCard
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  category={i.category}
                  handler={addToCartHandler}
                  photos={i.photos}
                  displayPhoto={i.displayPhoto}
                  dimension={i.dimensions}
                  model={i.productModel}
                  brand={i.brand}
                />
              </div>
            ))}
          </div>
        )}
     
        </div>
        

        {searchData && searchData.totalPage > 1 && (
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {searchData.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default Search;
