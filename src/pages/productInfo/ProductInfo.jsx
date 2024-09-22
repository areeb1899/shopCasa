import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { doc, getDoc } from 'firebase/firestore';
import { fireDb } from '../../firebase/Firebase';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import Loader from '../../components/loader/loading';
import myContext from '../../context/data/myContext';

const ProductInfo = () => {
    const context = useContext(myContext);
    const { mode, loading, setLoading, addReview, getProductReviews, reviews, loggedInUser } = context;
    const [products, setProducts] = useState('');
    const [wishlist, setWishlist] = useState([]);
    const [reviewComment, setReviewComment] = useState('');
    const params = useParams();
    const dispatch = useDispatch();

    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDb, "products", params.id));
            setProducts(productTemp.data());
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductData();
        getProductReviews(params.id); // Fetch reviews for the product
    }, []);

    const cartItems = useSelector((state) => state.cart);

    const addCart = (products) => {
        dispatch(addToCart(products));
        toast.success("Product added to cart successfully");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add to Wishlist functionality
    const addToWishlist = (product) => {
        const isProductInWishlist = wishlist.some((item) => item.id === product.id);
        if (!isProductInWishlist) {
            const updatedWishlist = [...wishlist, product];
            setWishlist(updatedWishlist);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            toast.success("Product added to wishlist");
        } else {
            toast.info("Product is already in your wishlist");
        }
    };

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist);
    }, []);

    return (
        <>
            <Layout>
                {loading ? <Loader /> : (
                    <section className="text-gray-600 body-font overflow-hidden" style={{ backgroundColor: mode === "dark" ? "#1D2734" : "" }}>
                        <div className="container px-5 py-10 mx-auto">
                            {products && (
                                <div
                                    className={`lg:w-4/5 mx-auto m-8 flex flex-wrap shadow-lg rounded-lg ${mode === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-[#b3997f] text-gray-900'
                                        }`}
                                >
                                    <img
                                        alt={products.title}
                                        className="lg:w-1/3 w-full h-auto object-cover object-center rounded-lg"
                                        src={products.imageURL}
                                    />
                                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 p-4">
                                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                            {products.category}
                                        </h2>
                                        <h4 className=" title-font font-bold mb-1">
                                            {products.title}
                                        </h4>
                                        <span className="title-font font-medium text-2xl">
                                            ₹{products.price}
                                        </span>
                                        <p className="leading-relaxed mb-5 pb-5 border-b-2">
                                            {products.description}
                                        </p>

                                        <div className="flex items-center m-2">
                                            <button
                                                onClick={() => addCart(products)}
                                                className={`flex ml-auto border-0 py-2 px-6 focus:outline-none rounded me-3 ${mode === 'dark' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-[#ffddb9] hover:bg-[#ccaf91]'
                                                    }`}
                                            >
                                                Add to Cart
                                            </button>
                                            <Link to="/cart">
                                                <button
                                                    onClick={() => addCart(products)}
                                                    className={`flex ml-auto border-0 py-2 px-6 focus:outline-none rounded ${mode === 'dark' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-[#ffddb9] hover:bg-[#ccaf91]'
                                                        }`}
                                                >
                                                    Buy Now
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => addToWishlist(products)}
                                                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 transition-colors duration-300 ease-in-out hover:bg-gray-300 hover:text-gray-700"
                                            >
                                                <svg
                                                    fill="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    className="w-5 h-5"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* New Responsive Buttons for Return, Delivery, and Brand */}
                                        <div className="flex justify-between items-center space-x-4 m-8">
                                            <div className="flex flex-col items-center">
                                                <img src="https://img.icons8.com/ios/50/000000/trophy.png" alt="Pay on Delivery" className="w-12 h-12 bg-blue-gray-100 rounded-full p-1" />
                                                <p className="text-sm text-center">Top Brand</p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <img src="https://img.icons8.com/ios/50/000000/return-purchase.png" alt="10 days Returnable" className="w-12 h-12 bg-blue-gray-100 rounded-full p-1" />
                                                <p className="text-sm text-center">10 days Returnable</p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <img src="https://img.icons8.com/ios/50/000000/delivery.png" alt="Amazon Delivered" className="w-12 h-12 bg-blue-gray-100 rounded-full p-1" />
                                                <p className="text-sm text-center">shopCasa Delivered</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>

                        {/* ...Other parts of your component remain the same */}
                    </section>
                )}
            </Layout>
        </>
    );
};

export default ProductInfo;
