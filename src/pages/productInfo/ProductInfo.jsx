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
    console.log(loggedInUser)
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

    // console.log(cartItems)


    const addCart = (products) => {
        dispatch(addToCart(products));
        toast.success("Product added to cart successfully");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);


    // Add to Wishlist functionality
    const addToWishlist = (product) => {
        // Check if the product is already in the wishlist
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
                                                onClick={() => addToWishlist(products)} // Add to wishlist button
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
                                    </div>
                                </div>
                            )}
                        </div>





                        {/*------------------------------------------ Reviews Section in a Card--------------------------------------------------- */}


                        <div className={`p-6 rounded-lg shadow-lg m-10 max-w-2xl mx-auto ${mode === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}>
                            <h3 className={`text-2xl font-semibold mb-6 ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                Reviews
                            </h3>

                            {/* Reviews List */}
                            {reviews.length === 0 ? (
                                <p className={`${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    No reviews yet. Be the first to review this product!
                                </p>
                            ) : (
                                reviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className={`border-b py-4 transition-all duration-200 ${mode === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                                    >
                                        <p className="font-bold">{review.name}</p>
                                        <p className="mt-2">{review.comment}</p>
                                        <small className="text-sm"> {new Date(review.timestamp?.toDate()).toLocaleDateString()}</small>
                                    </div>
                                ))
                            )}

                            {/* Review Form */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (loggedInUser) {
                                        addReview(params.id, {
                                            name: loggedInUser.name || "Anonymous", // Use logged-in user's name or default to "Anonymous"
                                            comment: reviewComment,
                                        });
                                        setReviewComment(''); // Clear the form
                                    } else {
                                        toast.error("You must be logged in to submit a review");
                                    }
                                }}
                                className="mt-8 space-y-4"
                            >
                                <textarea
                                    value={reviewComment}
                                    onChange={(e) => setReviewComment(e.target.value)}
                                    required
                                    placeholder="Write your review here"
                                    disabled={!loggedInUser} // Disable textarea if user is not logged in
                                    className={`w-full p-3 resize-none rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${mode === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-gray-500' : 'bg-gray-100 border-gray-300 text-gray-800 focus:ring-[#b3997f]'}`}
                                />

                                <button
                                    type="submit"
                                    disabled={!loggedInUser} // Disable button if user is not logged in
                                    className={`mt-4 px-6 py-3 rounded-lg text-sm font-semibold shadow-md transition-all duration-300 ${mode === 'dark' ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' : 'bg-[#ffddb9] hover:bg-[#ccaf91] text-gray-800'} ${!loggedInUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Submit Review
                                </button>

                                {/* Optional: Message to show if the user is not logged in */}
                                {!loggedInUser && (
                                    <p className={`mt-4 text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        You need to <Link to="/login" className="text-blue-500 underline">log in</Link> to submit a review.
                                    </p>
                                )}
                            </form>

                        </div>


                    </section>


                )}
            </Layout>
        </>
    );
};

export default ProductInfo;