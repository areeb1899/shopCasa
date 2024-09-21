import React, { useContext } from 'react';
import myContext from '../../../../context/data/myContext';
import Layout from '../../../layout/Layout';

const Shipping = () => {
    const { mode } = useContext(myContext);

    return (
        <Layout>
            <div className={`p-4 md:p-8 lg:p-12 xl:p-20 transition-colors duration-300 ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                <div className={`p-6 md:p-8 lg:p-12 xl:p-16 rounded-lg shadow-lg ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-[#B3997F] text-white'}`}>
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-center ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                        Shipping Information
                    </h1>

                    {/* Shipping Charges Section */}
                    <section className="mb-12">
                        <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                            Shipping Charges
                        </h2>
                        <p className="text-base md:text-lg mb-4">
                            Our shipping charges are calculated based on the weight of the items and the delivery location. Here’s a basic breakdown:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
                            <li>Standard Shipping: Free for orders over ₹1000. Below ₹1000, a flat charge of ₹100 applies.</li>
                            <li>Express Shipping: ₹100 for all orders. Delivery within 1-2 business days.</li>
                            <li>International Shipping: Charges vary based on destination. Please contact us for a quote.</li>
                        </ul>
                    </section>

                    {/* Shipping Q&A Section */}
                    <section>
                        <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4 text-base md:text-lg">
                            <div>
                                <h3 className="font-semibold mb-2">1. How long will it take for my order to arrive?</h3>
                                <p>
                                    Orders typically arrive within 5-7 business days for standard shipping. Express shipping takes 1-2 business days. International shipping times vary based on the destination.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">2. Can I track my order?</h3>
                                <p>
                                    Yes, once your order is dispatched, you will receive a tracking number via email to monitor the status of your shipment.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">3. What if I receive a damaged item?</h3>
                                <p>
                                    If you receive a damaged item, please contact our customer support within 48 hours of delivery with photos of the damage, and we will assist you with a replacement or refund.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">4. Can I change my delivery address after placing an order?</h3>
                                <p>
                                    Address changes can be made within 24 hours of placing the order. Contact our support team as soon as possible to request the change.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">5. Do you offer gift wrapping?</h3>
                                <p>
                                    Yes, we offer gift wrapping for an additional charge. Select the gift wrapping option at checkout and provide your message for the gift card.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
}

export default Shipping;
