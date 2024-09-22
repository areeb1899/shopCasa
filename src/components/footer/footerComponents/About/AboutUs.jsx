import React, { useContext } from 'react';
import Layout from '../../../layout/Layout';
import myContext from '../../../../context/Data/myContext';

const AboutUs = () => {
    const { mode } = useContext(myContext);

    return (
        <Layout>
            <div className={`p-4 md:p-8 lg:p-20 transition-colors duration-300 flex justify-center items-center ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                <div className={`p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-lg shadow-lg ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-[#B3997F] text-white'}`}>
                    <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                        About Us
                    </h1>
                    <p className="text-base sm:text-lg mb-3 sm:mb-4">
                        Welcome to our website! We are dedicated to providing the best products and services to our customers. Our team works tirelessly to ensure that every product meets the highest quality standards, and we are passionate about what we do.
                    </p>
                    <p className="text-base sm:text-lg mb-3 sm:mb-4">
                        Our mission is to bring innovation and excellence to everything we create, and we strive to offer an outstanding customer experience. We value your trust and work hard to exceed your expectations.
                    </p>
                    <p className="text-base sm:text-lg">
                        Thank you for choosing us. We look forward to serving you!
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default AboutUs;
