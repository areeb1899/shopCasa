import React, { useContext, useEffect } from 'react'
import {useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/Data/myContext';

const ProductCard = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { mode, product, searchKey } = context;
    const cartItem = useSelector((state) => state.cart);

    

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItem));

    }, [cartItem]);

    // console.log(cartItem);




    const productInfo = (id) => {
        navigate(`/productinfo/${id}`);
    }




    return (
        <section className={`text-gray-600 body-font transition-colors duration-300 ${mode === 'dark' ? 'bg-gradient-to-b from-gray-800 to-gray-900' : ''}`} style={{ backgroundColor: mode === "dark" ? "#1D2734" : "" }}>
            <div className="container px-5 py-8 md:py-16 mx-auto">

                <div className="flex flex-wrap -m-4">
                    {product
                        .filter((obj) => obj.title.toLowerCase().includes(searchKey)).slice(0, 8) // searching from title
                        .map((item, index) => {
                            const { title, price, description, imageURL, id } = item;
                            return (
                                <div key={index} className="p-4 md:w-1/2 lg:w-1/4">
                                    <div className={`h-full flex flex-col justify-between border rounded-lg shadow-md ${mode === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
                                        <div className="flex justify-center cursor-pointer">
                                            <img
                                                onClick={() => productInfo(id)}
                                                className="rounded-t-lg h-40 md:h-40 p-2 transition-transform duration-300 ease-in-out"
                                                src={imageURL}
                                                alt={title}
                                            />
                                        </div>

                                        <div className="flex flex-col justify-between h-full">
                                            <div className="p-5 flex-grow">
                                                <h2 className={`tracking-widest text-xs title-font font-medium mb-1 ${mode === 'dark' ? 'text-gray-200' : 'text-gray-400'}`}>
                                                    shopCasa
                                                </h2>
                                                <h1 className="title-font text-lg font-medium mb-3" title={title}>
                                                    {title.split(" ").length > 8 ? title.split(" ").slice(0, 8).join(" ") + "..." : title}

                                                </h1>
                                                <p className={`mb-2 text-sm ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    {description.split(' ').slice(0, 8).join(' ')}{description.split(' ').length > 8 && '...'}
                                                </p>
                                                <p className="leading-relaxed mb-3">
                                                    ₹ {price}
                                                </p>
                                            </div>

                                            <div className="p-3">
                                                <Link to={`/productinfo/${id}`}>
                                                    <button
                                                        type="button"
                                                        className={`w-full inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-center rounded-lg ${mode === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-700 hover:bg-blue-800 text-white'}`}>
                                                        View
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                </div>
                <div className='flex mt-3 items-center'>
                    <Link className='mx-auto' to={"/allproducts"}>
                        <button className="px-6 py-2 bg-[#7d6b59] text-white rounded-full hover:bg-[#8f7a66] transition duration-300 ease-in-out shadow-md">
                            See More
                        </button>
                    </Link>

                </div>

            </div>
        </section>

    );
}

export default ProductCard;
