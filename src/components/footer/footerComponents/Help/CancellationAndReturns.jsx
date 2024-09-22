import React, { useContext } from 'react';
import Layout from '../../../layout/Layout';
import myContext from '../../../../context/Data/myContext';

const CancellationAndReturns = () => {
    const { mode } = useContext(myContext);

    return (
        <Layout>
            <div className={`p-4 md:p-8 lg:p-12 xl:p-20 transition-colors duration-300 ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                <div className={`p-6 md:p-8 lg:p-12 xl:p-16 rounded-lg shadow-lg ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-[#B3997F] text-white'}`}>
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-center ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                        Cancellation & Returns Policy
                    </h1>

                    {/* Cancellation Policy Section */}
                    <section className="mb-12">
                        <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                            Cancellation Policy
                        </h2>
                        <p className="text-base md:text-lg mb-4">
                            We strive to make our cancellation process as smooth as possible. Please read our policy below:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
                            <li>Orders can be canceled within 24 hours of placement. Please contact our support team to process the cancellation.</li>
                            <li>Once an order has been shipped, it cannot be canceled. You will need to follow our return process for any issues with the shipment.</li>
                            <li>Cancellation requests made after 24 hours of placing the order may incur a cancellation fee of ₹50.</li>
                        </ul>
                    </section>

                    {/* Returns Policy Section */}
                    <section className="mb-12">
                        <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                            Returns Policy
                        </h2>
                        <p className="text-base md:text-lg mb-4">
                            We want you to be completely satisfied with your purchase. If you need to return an item, please follow the guidelines below:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
                            <li>Returns are accepted within 14 days of delivery. Items must be unused and in their original packaging.</li>
                            <li>To initiate a return, please contact our customer support with your order number and reason for the return.</li>
                            <li>Return shipping costs are the responsibility of the customer unless the item is defective or incorrect.</li>
                            <li>Refunds will be processed to the original payment method once the returned item is received and inspected.</li>
                        </ul>
                    </section>

                    {/* Frequently Asked Questions Section */}
                    <section>
                        <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4 text-base md:text-lg">
                            <div>
                                <h3 className="font-semibold mb-2">1. How can I cancel my order?</h3>
                                <p>
                                    To cancel your order, please contact our customer support team within 24 hours of placing the order. Provide your order number and request for cancellation.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">2. Can I return a sale item?</h3>
                                <p>
                                    Sale items are eligible for returns, provided they meet our return criteria. Contact customer support to ensure your sale item is eligible.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">3. How long does the return process take?</h3>
                                <p>
                                    The return process usually takes 7-10 business days once we receive the returned item. Refunds are processed within 3-5 business days after inspection.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">4. What should I do if I received a damaged or incorrect item?</h3>
                                <p>
                                    If you receive a damaged or incorrect item, please contact customer support immediately with your order number and photos of the item. We will arrange for a replacement or refund.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">5. Can I exchange an item?</h3>
                                <p>
                                    We currently do not offer exchanges. If you need a different item, please return the original item and place a new order.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
}

export default CancellationAndReturns;
