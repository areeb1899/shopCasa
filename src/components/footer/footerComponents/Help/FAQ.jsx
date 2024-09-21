import React, { useState, useContext, useEffect } from 'react';
import myContext from '../../../../context/data/myContext';
import Layout from '../../../layout/Layout';

const FAQ = () => {
    const { mode } = useContext(myContext);
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    const faqs = [
        {
            question: "What is your return policy?",
            answer: "Our return policy allows you to return items within 14 days of delivery. Items must be unused and in their original packaging."
        },
        {
            question: "How can I track my order?",
            answer: "You can track your order using the tracking number provided in your shipping confirmation email. Visit our website and enter the tracking number in the order tracking section."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we offer international shipping. Shipping costs and delivery times vary based on the destination. Please contact us for a shipping quote."
        },
        {
            question: "How can I contact customer support?",
            answer: "You can contact our customer support team via email at support@example.com or through the contact form on our website."
        },
        {
            question: "Can I change my order after placing it?",
            answer: "Changes to orders can be made within 24 hours of placing the order. Contact our support team as soon as possible to request changes."
        },
    ];

    return (
        <Layout>
            <div className={`p-4 md:p-8 lg:p-12 xl:p-20 transition-colors duration-300 ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                <div className={`p-6 md:p-8 lg:p-12 xl:p-16 rounded-lg shadow-lg ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-[#B3997F] text-white'}`}>
                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-center ${mode === 'dark' ? 'text-yellow-500' : 'text-[#7d6b59]'}`}>
                        Frequently Asked Questions
                    </h1>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="rounded-lg mb-2">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className={`w-full text-left px-6 py-4 font-semibold text-base md:text-lg ${mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-[#B3997F] text-gray-900'} focus:outline-none`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>{faq.question}</span>
                                        <svg
                                            className={`w-6 h-6 transition-transform duration-300 ${openIndex === index ? 'transform rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                                {openIndex === index && (
                                    <div className={`px-6 py-4 ${mode === 'dark' ? 'bg-gray-800 text-white' : ' text-gray-900'}`}>
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default FAQ;
