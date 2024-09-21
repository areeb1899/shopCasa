import React, { Fragment, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillCloudSunFill } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/Firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import logo from '../../assets/logo.png';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import myContext from '../../context/Data/myContext';



const Navbar = () => {
  const context = useContext(myContext);
  const { mode, toggleMode, loggedInUser, searchKey, setSearchKey } = context;
  const [isOpen, setIsOpen] = useState(false);
  // console.log(loggedInUser)
  const [dropdownOpen, setDropdownOpen] = useState(false); // Added state for dropdown
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const firstName = loggedInUser?.name
    ? `${loggedInUser.name.split(' ')[0].charAt(0).toUpperCase() + loggedInUser.name.split(' ')[0].slice(1).toLowerCase()}`
    : 'Guest';


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('user');
        toast.success('Logout successful');
        navigate('/');
      })
      .catch((error) => {
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className={`w-full text-center ${mode === 'dark' ? 'bg-[#202122] text-yellow-300' : 'bg-purple-700 text-white'}`}>
        <div className="overflow-hidden">
          <div className="whitespace-nowrap animate-slideText">
            <span className="text-base sm:text-lg md:text-xl lg:text-base font-semibold">
              Get free shipping over Rs.1000
            </span>
          </div>
        </div>
      </div>


      <div className={`sticky top-0 z-50 ${mode === 'dark' ? 'bg-gray-800' : 'bg-[#b3997f]'} shadow-lg`}>

        {/* Mobile Menu Button */}
        <div className="fixed top-10 right-4 z-50 lg:hidden flex items-center space-x-4">
          {/* Cart Button */}
          {!isOpen && (
            <Link to="/cart" className="relative text-lg font-semibold hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                  {cartItems.length}
                </span>
              )}
            </Link>
          )}

          {/* Hamburger Menu */}
          <button
            type="button"
            onClick={toggleMenu}
            className={`${mode === 'dark' ? 'text-white' : 'text-black'}`}
          >
            {isOpen ? (
              <RxCross2 size={25} />
            ) : (
              <div className="flex flex-col space-y-1">
                <div className="w-8 h-0.5 bg-current"></div>
                <div className="w-8 h-0.5 bg-current"></div>
                <div className="w-8 h-0.5 bg-current"></div>
              </div>
            )}
          </button>
        </div>


        {/* Mobile Menu Panel */}
        {isOpen && (


          <div className={`fixed inset-0 ${mode === 'dark' ? 'bg-gray-800' : 'bg-[#f5efe7]'} text-white z-40 lg:hidden`}>
            <div className="flex flex-col items-center pt-16 ">
              <img src={logo} alt="Logo" className="w-40 mb-6" />

              <nav className="flex flex-col space-y-4">
                <Link
                  to="/allproducts"
                  className={`text-lg font-medium hover:text-blue-500 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}
                  onClick={toggleMenu}
                >
                  All Products
                </Link>
                {user && (
                  <div>

                    <Link
                      to="/order"
                      className={`text-lg font-medium hover:text-blue-500 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}
                      onClick={toggleMenu}
                    >
                      Orders
                    </Link>

                  </div>


                )}
                {user?.user?.email === 'areebahmedwork@gmail.com' && (
                  <Link
                    to="/dashboard"
                    className={`text-lg font-medium hover:text-blue-500 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}
                    onClick={toggleMenu}
                  >
                    Admin
                  </Link>
                )}
                {user ? (
                  <>
                    <div className={`text-lg font-medium cursor-pointer hover:text-blue-500 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>

                      <a
                        onClick={() => {
                          localStorage.removeItem('user');
                          toggleMenu();
                        }}

                      >
                        Logout
                      </a>
                    </div>

                    <div className={`text-lg font-medium cursor-pointer hover:text-blue-500 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>

                      <Link to={"/userinfo"}>
                        {loggedInUser && (
                          <h3>{`Hi, ${firstName}`}</h3>
                        )}

                      </Link>
                    </div>
                  </>


                ) : (
                  <Link
                    to="/login"
                    className={`text-lg font-medium hover:text-blue-500 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>

                )}

              </nav>
              <Link to={"/wishlist"} className={`mt-3 text-lg font-medium hover:text-blue-500 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Your wishlist
              </Link>
              <button
                type="button"
                onClick={toggleMode}
                className={`mt-10 p-2 rounded-full ${mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
              >
                {mode === 'light' ? <MdLightMode size={25} /> : <MdDarkMode size={25} />}
              </button>
            </div>
          </div>
        )}




        {/* Desktop View */}
        <header>

          <nav className={`px-4 sm:px-6 lg:px-8 shadow-lg ${mode === 'dark' ? 'bg-gradient-to-b from-gray-900 to-gray-800' : ''}`}>
            <div className="flex justify-between items-center h-16">
              {/* shopSphere Logo */}
              <div className="flex items-center">
                <Link to="/">
                  <img src={logo} alt="Logo" className="w-36 px-2 py-1 rounded-lg" />
                </Link>
              </div>


              {/* searching products  */}
              <div className="relative w-full lg:w-1/3 hidden lg:block">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-4 h-4 fill-current text-primary-gray-dark"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="searchkey"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  id="searchkey"
                  placeholder="Search here"
                  className="pl-10 pr-4 py-2 w-full rounded-md border bg-violet-0 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  style={{
                    backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '',
                    color: mode === 'dark' ? 'white' : '',
                  }}
                />
              </div>




              {/* Links */}
              <div className="hidden lg:flex lg:items-center lg:space-x-6">
                <Link
                  to="/allproducts"
                  className={`text-lg font-semibold hover:text-white ${mode === 'dark' ? 'text-white' : 'text-gray-700'}`}
                >
                  All Products
                </Link>


              </div>

              {/* Icons */}
              {/* wishlist Icon */}

              <div className={`hidden lg:flex items-center space-x-4 me-8 ${mode === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                <Link to={"/wishlist"}>
                  <FaRegHeart className='text-2xl hover:text-white' />
                </Link>

                <button onClick={toggleMode} className='hover:text-white'>
                  {mode === 'light' ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
                </button>

                {/* Cart Icon */}
                <div className="relative">
                  <Link to="/cart" className="text-lg font-semibold hover:text-white ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                </div>

                {/* Display the user's name in navbar and redirect to userinfo page */}
                {user ? (
                  <div className="relative" >
                    <button
                      onMouseEnter={handleDropdownToggle}
                      className={`text-lg font-semibold cursor-pointer hover:text-white ${mode === 'dark' ? 'text-white' : 'text-gray-700'}`}
                    >
                      Hi, {firstName}
                    </button>
                    {dropdownOpen && (
                      <div className={`absolute right-0 mt-2 bg-${mode === 'dark' ? 'gray-800' : 'white'} text-${mode === 'dark' ? 'white' : 'black'} shadow-lg rounded-lg`}>
                        <Link
                          to="/userinfo"
                          className={`block px-4 py-2 hover:bg-gray-200 ${mode === 'dark' ? 'hover:bg-gray-700' : ''}`}
                        >
                          Profile
                        </Link>
                        <Link
                          to="/order"
                          className={`block px-4 py-2 hover:bg-gray-200 ${mode === 'dark' ? 'hover:bg-gray-700' : ''}`}
                        >
                          Orders
                        </Link>
                        {user?.user?.email === 'areebahmedwork@gmail.com' && (
                          <Link
                            to="/dashboard"
                            className={`block px-4 py-2 hover:bg-gray-200 ${mode === 'dark' ? 'hover:bg-gray-700' : ''}`}
                          >
                            Admin
                          </Link>
                        )}
                        <button
                          onClick={logout}
                          className={`block px-4 py-2 w-full text-left hover:bg-gray-200 ${mode === 'dark' ? 'hover:bg-gray-700' : ''}`}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className={`flex items-center gap-1 text-lg font-semibold hover:text-white ${mode === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                      <FaRegUser />

                      <Link
                        to="/login"
                      >
                        Login/Sign up
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Navbar;