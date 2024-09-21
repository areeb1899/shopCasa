import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';

const AllProducts = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { mode, product, searchKey } = context;
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items per page

  // Filter products based on search key
  const filteredProducts = product.filter((obj) => obj.title.toLowerCase().includes(searchKey.toLowerCase()));

  // Pagination calculations on filtered products
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart successfully`);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItem));
  }, [cartItem]);

  const productInfo = (id) => {
    navigate(`/productinfo/${id}`);
  };

  // Pagination control
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <section className={`text-gray-600 body-font transition-colors duration-300`}>
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
              Our Latest Collection
            </h1>
            <div className="h-1 w-20 bg-pink-600 rounded"></div>
          </div>
          <div className="flex flex-wrap -m-4">
            {currentProducts.map((item, index) => {
              const { title, price, description, imageURL, id } = item;
              return (
                <div key={index} className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 flex">
                  <div className={`max-w-xs flex flex-col justify-between border rounded-lg shadow-md ${mode === 'dark' ? 'bg-[#202122] border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-900'}`}>
                    <a onClick={() => productInfo(id)} className="cursor-pointer">
                      <img className="rounded-t-lg w-full h-50 p-2 hover:scale-110 transition-scale duration-300 ease-in-out" src={imageURL} alt={title} />
                    </a>
                    <div className="p-3 flex-grow">
                      <a onClick={() => productInfo(id)} className="cursor-pointer">
                        <h5 className="mb-1 text-lg font-semibold tracking-tight" style={{ color: mode === 'dark' ? 'white' : 'black' }} title={title}>
                          {title.split(" ").length > 8 ? title.split(" ").slice(0, 8).join(" ") + "..." : title}
                        </h5>
                        <p className="text-base font-bold mb-3" style={{ color: mode === 'dark' ? '#d3d3d3' : 'black' }}>
                          ₹ {price}
                        </p>
                      </a>
                      <p className="mb-2 text-sm" style={{ color: mode === 'dark' ? '#d3d3d3' : 'gray' }}>
                        {description.split(' ').slice(0, 8).join(' ')}{description.split(' ').length > 8 && '...'}
                      </p>
                    </div>
                    <div className="p-3">
                      <button onClick={() => addCart(item)} type="button" className={`w-full inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-center rounded-lg ${mode === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-700 hover:bg-blue-800 text-white'}`}>
                        Add To Cart
                        <svg className="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`px-4 py-2 mr-2 rounded ${mode === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-700 text-white'}`}>
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index} onClick={() => handlePageChange(index + 1)} className={`px-4 py-2 mx-1 rounded ${mode === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-700 text-white'} ${currentPage === index + 1 ? 'bg-blue-800' : ''}`}>
                {index + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`px-4 py-2 ml-2 rounded ${mode === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-700 text-white'}`}>
              Next
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AllProducts;
