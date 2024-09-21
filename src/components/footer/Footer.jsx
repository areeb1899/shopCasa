import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/Data/myContext';
import logo from '../../assets/logo.png';
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';


const Footer = () => {
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <div>
      <footer
        className={`text-gray-600 body-font ${mode === 'dark' ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-[#B3997F]'}`}>
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap md:text-left text-center order-first">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2
                className="title-font font-medium tracking-widest text-sm mb-3"
                style={{ color: mode === 'dark' ? 'white' : '#865D36' }}
              >
                Help
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link
                    to={"/payment"}
                    className="hover:text-gray-800"
                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                  >
                    Payments
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/shipping"}
                    className="hover:text-gray-800"
                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                  >
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/cancellationandreturns"}
                    className="hover:text-gray-800"
                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                  >
                    Cancellation & Returns
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/faqs"}
                    className="hover:text-gray-800"
                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                  >
                    FAQ
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2
                className="title-font font-medium tracking-widest text-sm mb-3 uppercase"
                style={{ color: mode === 'dark' ? 'white' : '#865D36' }}
              >
                About
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link
                    to={'/aboutus'}
                    className="hover:text-gray-800"
                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to={'/contactus'}
                    className="hover:text-gray-800"
                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/locate'}
                    className="hover:text-gray-800"
                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                  >
                    Locate Us
                  </Link>
                </li>
              </nav>
            </div>

            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2
                className="title-font font-medium tracking-widest text-sm mb-3"
                style={{ color: mode === 'dark' ? 'white' : '#865D36' }}
              >
                Connect with us
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link
                    to={'/privacypolicy'}
                    className="hover:text-gray-800"
                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/privacypolicy'}
                    className="hover:text-gray-800"
                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/privacypolicy'}
                    className="hover:text-gray-800"
                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                  >
                    Instagram
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <img src="https://ecommerce-sk.vercel.app/pay.png" alt="" />
            </div>
          </div>
        </div>

        <div
          className={`py-3 ${mode === 'dark' ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-[#aa9179]'}`} style={{ color: mode === 'dark' ? 'white' : 'black', }}
        >
          <div className="container px-5 mx-auto flex items-center sm:flex-row flex-col">
            <div className="flex">
              <Link to={"/"}>

                <img
                  className="w-36 px-2 py-1 rounded"
                  src={logo}
                  alt="logo"
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                />
              </Link>
            </div>
            <p
              className="text-sm sm:ml-6 sm:mt-0 mt-4"
              style={{ color: mode === 'dark' ? 'white' : 'black' }}
            >
              © {new Date().getFullYear()}{' '}
              <a
                // href="#"
                rel="noopener noreferrer"
                className="ml-1"
                style={{ color: mode === 'dark' ? 'white' : 'black' }}
              >
                www.shopCasa.com
              </a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
              <a className="text-xl">
                <FaInstagram />
              </a>
              <a className="ml-3 text-xl">
                <FaFacebookF />

              </a>
              <a className="ml-3 text-xl">
                <FaXTwitter />

              </a>
              <a className="ml-3 text-xl">
                <FaWhatsapp />

              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
