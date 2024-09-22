import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { toast } from 'react-toastify';
import myContext from '../../context/Data/myContext';

const Wishlist = () => {
    const context = useContext(myContext);
    const { mode } = context;

    const [wishlistItems, setWishlistItems] = useState([]);

    // Retrieve wishlist items from localStorage
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlistItems(storedWishlist);
    }, []);

    // Remove item from wishlist
    const removeFromWishlist = (productId) => {
        const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
        setWishlistItems(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        toast.success("Product removed from wishlist");
    };

    return (
        <Layout>
            <section className={`text-gray-600 body-font py-10 min-h-screen}`}>
                <div className="container mx-auto px-5">

                    {wishlistItems.length > 0 ? (
                        <>

                            <div>
                                <h1 className={`text-4xl font-bold mb-10 text-center ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    Your Wishlist
                                </h1>
                            </div>
                            <div className="flex flex-wrap -m-4 justify-center">

                                {wishlistItems.map((item, index) => (



                                    <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">

                                        <div
                                            className={`shadow-lg rounded-lg overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl h-full flex flex-col ${mode === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'
                                                }`}
                                        >
                                            <Link to={`/productinfo/${item.id}`}>

                                                <img
                                                    alt={item.title}
                                                    className="w-full h-40 object-cover object-center"
                                                    src={item.imageURL}
                                                />
                                            </Link>
                                            <div className="p-6 flex flex-col justify-between flex-grow">
                                                <div>
                                                    <h2 className="text-lg font-semibold mb-2">  {item.title.split(" ").slice(0, 8).join(" ")}{item.title.split(" ").length > 8 ? "..." : ""}</h2>
                                                    <p className="text-lg font-medium text-indigo-600 mb-4">₹{item.price}</p>
                                                </div>
                                                <div className="flex justify-between items-center">

                                                    <button
                                                        onClick={() => removeFromWishlist(item.id)}
                                                        className="text-red-500 hover:text-red-700 text-sm transition"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <h2 className={`text-3xl font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                Your wishlist is empty
                            </h2>
                            <p className="text-gray-500 mt-4">You haven't added any products to your wishlist yet.</p>
                            <Link to="/allproducts">
                                <button
                                    className={`mt-6 py-2 px-8 rounded-md text-lg transition-all ${mode === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                                        }`}
                                >
                                    Browse Products
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default Wishlist;