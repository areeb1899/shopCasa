import React, { useContext } from 'react';
import Layout from '../../../layout/Layout';
import myContext from '../../../../context/Data/myContext';

const Payment = () => {
    const { mode } = useContext(myContext);

    return (
        <Layout>
            <div className={`p-4 md:p-8 lg:p-12 xl:p-20 transition-colors duration-300 ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                <div className={`p-6 md:p-8 lg:p-12 xl:p-16 rounded-lg shadow-lg ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-[#B3997F] text-white'}`}>
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-center ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                        Payment Information
                    </h1>

                    {/* Payment Methods Section */}
                    <section className="mb-12">
                        <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                            Payment Methods We Accept
                        </h2>
                        <p className="text-base md:text-lg mb-4">
                            We accept the following payment methods:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
                            <li>Credit Cards (Visa, MasterCard, American Express)</li>
                            <li>Debit Cards</li>
                            <li>Net Banking</li>
                            <li>UPI (Unified Payments Interface)</li>
                            <li>Wallets (Paytm, Google Pay, PhonePe)</li>
                        </ul>
                    </section>

                    {/* Terms and Conditions Section */}
                    <section className="mb-12">
                        <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                            Terms & Conditions
                        </h2>
                        <p className="text-base md:text-lg mb-4">
                            Please read the following terms and conditions before proceeding with your payment:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
                            <li>All transactions are secure and encrypted.</li>
                            <li>We do not store your payment information.</li>
                            <li>Refunds will be processed according to our refund policy.</li>
                            <li>By making a payment, you agree to our terms of service and privacy policy.</li>
                        </ul>
                    </section>

                    {/* EMI Options Section */}
                    <section className="mb-12">
                        <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                            EMI Options
                        </h2>
                        <p className="text-base md:text-lg mb-4">
                            We offer EMI options on select payments. Please contact our support team to check the availability and terms of EMI options for your purchase.
                        </p>
                    </section>

                    {/* Q&A Section */}
                    <section>
                        <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4 text-base md:text-lg">
                            <div>
                                <h3 className="font-semibold mb-2">1. What should I do if my payment fails?</h3>
                                <p>
                                    If your payment fails, please check your payment details and try again. If the issue persists, contact our customer support for assistance.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">2. How can I get a refund?</h3>
                                <p>
                                    Refunds are processed according to our refund policy. Please contact our support team with your order details to initiate a refund.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">3. Is it safe to enter my payment details on your site?</h3>
                                <p>
                                    Yes, we use secure encryption protocols to protect your payment information and ensure a safe transaction experience.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">4. Can I pay in installments?</h3>
                                <p>
                                    We offer EMI options on select purchases. Please reach out to our support team to check eligibility and terms for EMI.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
}

export default Payment;
