import React, { useContext } from 'react';
import Layout from '../../../components/layout/Layout';
import myContext from '../../../context/Data/myContext';

const UpdateProduct = () => {
    const context = useContext(myContext);
    const { products, setProducts, updateProduct, mode } = context;

    const updateHandler = (e) => {
        const { name, value } = e.target;
        setProducts({ ...products, [name]: value });
    };

    return (
        <>
            <Layout>
                <section>
                    <div className={`flex justify-center items-center h-screen ${mode === 'dark' ? 'bg-gray-900' : 'bg-[#F5F5F5]'}`}>
                        <div className={`bg-gray-800 px-10 py-10 rounded-xl ${mode === 'dark' ? 'bg-gray-800' : 'bg-[#b0967c]'} shadow-lg w-full max-w-lg`}>
                            <h1 className={`text-center text-xl mb-4 font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                Update Product: {products.title}
                            </h1>
                            <div className='mx-auto'>
                                <div className='mb-4'>
                                    <input
                                        type="text"
                                        value={products.title}
                                        onChange={updateHandler}
                                        name='title'
                                        className={`w-full px-4 py-2 rounded-lg ${mode === 'dark' ? 'bg-gray-600 text-white placeholder:text-gray-200' : 'bg-[#8F7A66] text-white placeholder:text-gray-800'} outline-none`}
                                        placeholder='Product title'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <input
                                        type="text"
                                        value={products.price}
                                        onChange={updateHandler}
                                        name='price'
                                        className={`w-full px-4 py-2 rounded-lg ${mode === 'dark' ? 'bg-gray-600 text-white placeholder:text-gray-200' : 'bg-[#8F7A66] text-white placeholder:text-gray-800'} outline-none`}
                                        placeholder='Product price'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <input
                                        type="text"
                                        value={products.imageURL}
                                        onChange={updateHandler}
                                        name='imageURL'
                                        className={`w-full px-4 py-2 rounded-lg ${mode === 'dark' ? 'bg-gray-600 text-white placeholder:text-gray-200' : 'bg-[#8F7A66] text-white placeholder:text-gray-800'} outline-none`}
                                        placeholder='Product image URL'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <input
                                        type="text"
                                        value={products.category}
                                        onChange={updateHandler}
                                        name='category'
                                        className={`w-full px-4 py-2 rounded-lg ${mode === 'dark' ? 'bg-gray-600 text-white placeholder:text-gray-200' : 'bg-[#8F7A66] text-white placeholder:text-gray-800'} outline-none`}
                                        placeholder='Product category'
                                    />
                                </div>
                                <div className='mb-4'>
                                    <textarea
                                        cols="30"
                                        rows="5"
                                        name='description'
                                        value={products.description}
                                        onChange={updateHandler}
                                        className={`w-full px-4 py-2 resize-none rounded-lg ${mode === 'dark' ? 'bg-gray-600 text-white placeholder:text-gray-200' : 'bg-[#8F7A66] text-white placeholder:text-gray-800'} outline-none`}
                                        placeholder='Product description'
                                    />
                                </div>
                                <div className='flex justify-center mb-3'>
                                    <button
                                        onClick={updateProduct}
                                        className={`w-full font-bold px-4 py-2 rounded-lg ${mode === 'dark' ? 'bg-yellow-500 text-black shadow-md hover:bg-yellow-600' : 'bg-[#bba38c] text-white shadow-md hover:bg-[#9d8a68]'} transition-transform transform hover:scale-105`}
                                    >
                                        Update Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </Layout>
        </>
    );
};

export default UpdateProduct;
