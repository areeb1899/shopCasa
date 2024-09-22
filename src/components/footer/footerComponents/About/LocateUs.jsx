import React, { useContext } from 'react';
import Layout from '../../../layout/Layout';
import myContext from '../../../../context/Data/myContext';

const LocateUs = () => {
    const { mode } = useContext(myContext);

    return (
        <Layout>
            <div className={`p-4 md:p-8 lg:p-20 transition-colors duration-300 ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                <div className={`p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-lg shadow-lg ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-[#B3997F] text-white'}`}>
                    <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                        Locate Us
                    </h1>
                    <p className="text-base sm:text-lg mb-3 sm:mb-4 text-center">
                        Find our location on the map below. We look forward to your visit!
                    </p>
                    <div className="w-full h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.11478964298!2d77.21528694999999!3d28.628901999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1726163351844!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default LocateUs;
