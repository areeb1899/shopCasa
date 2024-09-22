import React, { useContext } from 'react'
import Layout from '../../../components/layout/Layout';
import myContext from '../../../context/Data/myContext';

const AddProduct = () => {
    const context = useContext(myContext);
    const { products, setProducts, addProduct, mode } = context;

    const handler = (e) => {
        const { name, value } = e.target;
        setProducts({
            ...products,
            [name]: name === 'category' ? value.toLowerCase() : value // Only convert 'category' to lowercase
        })
    }

    return (
        <Layout>

            <div className={`flex justify-center items-center h-screen ${mode === 'dark' ? 'bg-gray-900' : 'bg-[#F5F5F5]'}`}>
                <div className={`px-10 py-10 rounded-xl ${mode === 'dark' ? 'bg-gray-800' : 'bg-[#B3997F]'}`}>
                    <h1 className={`text-center mb-4 font-bold text-xl ${mode === 'dark' ? 'text-white' : 'text-[#7d6b59]'}`}>
                        Add Product
                    </h1>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={products.title}
                            onChange={handler}
                            name='title'
                            className={`w-full lg:w-[20em] px-4 py-2 rounded-lg outline-none ${mode === 'dark' ? 'bg-gray-700 text-white placeholder:text-gray-400' : 'bg-[#8f7a66] text-white placeholder:text-gray-800'}`}
                            placeholder='Product title'
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={products.price}
                            onChange={handler}
                            name='price'
                            className={`w-full lg:w-[20em] px-4 py-2 rounded-lg outline-none ${mode === 'dark' ? 'bg-gray-700 text-white placeholder:text-gray-400' : 'bg-[#8f7a66] text-white placeholder:text-gray-800'}`}
                            placeholder='Product price'
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={products.imageURL}
                            onChange={handler}
                            name='imageURL'
                            className={`w-full lg:w-[20em] px-4 py-2 rounded-lg outline-none ${mode === 'dark' ? 'bg-gray-700 text-white placeholder:text-gray-400' : 'bg-[#8f7a66] text-white placeholder:text-gray-800'}`}
                            placeholder='Product imageUrl'
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={products.category}
                            onChange={handler}
                            name='category'
                            className={`w-full lg:w-[20em] px-4 py-2 rounded-lg outline-none ${mode === 'dark' ? 'bg-gray-700 text-white placeholder:text-gray-400' : 'bg-[#8f7a66] text-white placeholder:text-gray-800'}`}
                            placeholder='Product category'
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            cols="20"
                            rows="5"
                            name='description'
                            value={products.description}
                            onChange={handler}
                            className={`w-full lg:w-[20em] px-4 resize-none py-2 rounded-lg  outline-none ${mode === 'dark' ? 'bg-gray-700 text-white placeholder:text-gray-400' : 'bg-[#8f7a66] text-white placeholder:text-gray-800'}`}
                            placeholder='Product description'
                        ></textarea>
                    </div>
                    <div className='flex justify-center'>
                        <button
                            onClick={addProduct}
                            className={`w-full font-bold px-4 py-2 rounded-lg ${mode === 'dark' ? 'bg-yellow-500 text-white shadow-md hover:bg-yellow-600' : 'bg-[#bba38c] text-white shadow-md hover:bg-[#9d8a68]'} transition-transform transform hover:scale-105`}
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct
