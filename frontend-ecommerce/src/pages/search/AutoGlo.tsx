import './search.css';
import { useState } from 'react';
import { useCategoryOfBrandQuery, useSearchProductsQuery } from '../../redux/api/productsApi';
import { CustomError } from '../../types/api-types';
import { toast } from 'react-hot-toast';
import ProductCard from '../../components/productCard/ProductCard';
import { addToCart } from '../../redux/cart-reducer';
import { CartItem } from '../../types/types';
import { useDispatch } from 'react-redux';
import Footer from '../../components/footer/Footer';
import { FiSearch } from 'react-icons/fi';
import { GoChevronRight } from 'react-icons/go';
import SkeletonLoading from '../../components/skeleton/SkeletonLoading';
import { GoArrowRight } from 'react-icons/go';
import notFound from '/images/notfound.png'

const Search = () => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [maxPrice, setMaxPrice] = useState(10000);
    const [minPrice, setMinPrice] = useState(1);
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [checkedRadio, setCheckedRadio] = useState('');

    const handleCategoryClick = (category: string) => {
        setCategory(category);
        setSelectedCategory(category);
    };

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMinPrice(parseInt(e.target.value));
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMaxPrice(parseInt(e.target.value));
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCheckedRadio(value);
        const [min, max] = value.split('-').map(Number);
        setMinPrice(min);
        setMaxPrice(max);
    };

    const handleClearRadio = () => {
        setCheckedRadio('');
        setMinPrice(1);
        setMaxPrice(100000);
    };

    const { isLoading: productLoading, data: searchData, isError: productIsError, error: productError } =
        useSearchProductsQuery({
            search,
            sort,
            category,
            page,
            minPrice,
            maxPrice,
            brand: 'AUTOGLO',
        });

    const dispatch = useDispatch();
    const addToCartHandler = (cartItem: CartItem) => {
        if (cartItem.stock < 1) return toast.error('Out of Stock');
        dispatch(addToCart(cartItem));
        toast.success('Added to cart');
    };

    const { data: categoriesResponse, isLoading: loadingCategories, error, isError } = useCategoryOfBrandQuery('');

    if (isError) {
        const err = error as CustomError;
        toast.error(err?.data?.message || "Can't find Products");
    }

    const isPrevPage = page > 1;
    const isNextPage = page < 4;

    if (productIsError) {
        const err = productError as CustomError;
        toast.error(err?.data?.message || "Can't find Products");
    }

    return (
        <>
            <div className="top-nav">
                <p>Home</p>
                <GoChevronRight />
                <p className="lastP">Autoglo</p>
            </div>
            <div className="product-search-page">
                <aside>
                    <div>
                        <h5>Category</h5>
                        <div className="category-list">
                            {!loadingCategories &&
                                categoriesResponse?.categoriesByBrand[0]?.categories.map((category: string) => (
                                    <div
                                        key={category}
                                        className={`category-item ${
                                            category === selectedCategory ? 'activeCat' : ''
                                        }`}
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        <p>{category.toUpperCase()}</p>
                                        <GoArrowRight />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div>
                        <h5>Search By Price</h5>
                        <div className="mt-2">
                            <div className="radioTop">
                                <h6>Price Range</h6>
                                <button onClick={handleClearRadio}>Clear</button>
                            </div>
                            <div className="radioOptions">
                                <label className="radioContainer">
                                    Under 500
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value="1-500"
                                        onChange={handleRadioChange}
                                        checked={checkedRadio === '1-500'}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <label className="radioContainer">
                                    500-1000
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value="500-1000"
                                        onChange={handleRadioChange}
                                        checked={checkedRadio === '500-1000'}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <label className="radioContainer">
                                    1000-2000
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value="1000-2000"
                                        onChange={handleRadioChange}
                                        checked={checkedRadio === '1000-2000'}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <label className="radioContainer">
                                    2000-3000
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value="2000-3000"
                                        onChange={handleRadioChange}
                                        checked={checkedRadio === '2000-3000'}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <label className="radioContainer">
                                    Over 3000
                                    <input
                                        type="radio"
                                        name="priceRange"
                                        value="3000-100000"
                                        onChange={handleRadioChange}
                                        checked={checkedRadio === '3000-100000'}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            <div className="minMax d-flex align-items-center justify-content-between">
                                <select name="min" id="minSelect" onChange={handleMinPriceChange}>
                                    <option value="1">Min</option>
                                    <option value="500">500</option>
                                    <option value="1000">1000</option>
                                    <option value="1500">1500</option>
                                    <option value="2000">2000</option>
                                </select>
                                <p>To</p>
                                <select name="max" id="maxSelect" onChange={handleMaxPriceChange}>
                                    <option value="10000">Max</option>
                                    <option value="2500">2500</option>
                                    <option value="3000">3000</option>
                                    <option value="4000">4000</option>
                                    <option value="5000">5000</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h5>Sort Products</h5>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="mb-3 mt-2 sortSec"
                        >
                            <option value="">None</option>
                            <option value="asc">Price (Low to High)</option>
                            <option value="dsc">Price (High to Low)</option>
                        </select>
                    </div>
                </aside>
                <main className="grn">
                    <div className="row products-page-head">
                        <div className="col-8" style={{ display: 'flex' }}>
                            <h2 className="b">{selectedCategory.toUpperCase()}</h2>
                        </div>
                        <div className="col-4 search-pro">
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <FiSearch />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        {productLoading ? (
                            <div className="search-product-list row">
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="col-12 col-md-4 mb-3 mt-product-card">
                                        <SkeletonLoading />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="search-product-list row">
                                {(searchData?.products ?? []).length > 0 ? (
                                searchData?.products?.map((product: any) => (
                                    <div key={product._id} className="col-12 col-md-4 mb-3 mt-product-card">
                                        <ProductCard
                                            productId={product._id}
                                            name={product.name}
                                            price={product.price}
                                            stock={product.stock}
                                            category={product.category}
                                            handler={addToCartHandler}
                                            photos={product.photos}
                                            displayPhoto={product.displayPhoto}
                                            dimension={product.dimensions}
                                            model={product.productModel}
                                            brand={product.brand}
                                        />
                                    </div>
                                ))):(<div className='center mt-5'><img src={notFound} alt="" /></div>)}
                            </div>
                        )}
                    </div>
                    {searchData && searchData.totalPage > 1 && (
                        <article>
                            <button disabled={!isPrevPage} onClick={() => setPage((prev) => prev - 1)}>
                                Prev
                            </button>
                            <span>
                                {page} of {searchData.totalPage}
                            </span>
                            <button disabled={!isNextPage} onClick={() => setPage((prev) => prev + 1)}>
                                Next
                            </button>
                        </article>
                    )}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Search;
