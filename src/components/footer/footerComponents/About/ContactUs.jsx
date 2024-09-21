import React, { useContext } from 'react';
import myContext from '../../../../context/data/myContext';
import Layout from '../../../layout/Layout';

const ContactUs = () => {
    const { mode } = useContext(myContext);

    return (
        <Layout>
            <div className={`p-4 md:p-8 lg:p-20 transition-colors duration-300 ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                <div className={`p-6 md:p-8 lg:p-12 xl:p-16 rounded-lg shadow-lg ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-[#B3997F] text-white'}`}>
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-center ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                        Contact Us
                    </h1>
                    <p className="text-lg md:text-xl mb-6 text-center">
                        We’d love to hear from you! Please fill out the form below and we’ll get in touch with you shortly.
                    </p>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className={`p-4 rounded-lg border ${mode === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className={`p-4 rounded-lg border ${mode === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                required
                            />
                        </div>
                        <textarea
                            placeholder="Your Message"
                            className={`w-full p-4 resize-none rounded-lg border ${mode === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            rows="3"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className={`w-full py-3 rounded-lg ${mode === 'dark' ? 'bg-yellow-500 text-gray-900' : 'bg-[#7d6b59] text-white'} font-bold transition-transform transform hover:scale-105`}
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default ContactUs;
