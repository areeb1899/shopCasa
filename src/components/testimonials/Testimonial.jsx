import React, { useContext } from "react";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import myContext from "../../context/Data/myContext";

const testimonials = [
    {
        image: "https://randomuser.me/api/portraits/women/19.jpg",
        name: "John Doe",
        comment: "Amazing products! The quality is top-notch and delivery was quick."
    },
    {
        image: "https://randomuser.me/api/portraits/women/82.jpg",
        name: "Jane Smith",
        comment: "I had a great shopping experience! Customer service was really helpful."
    },
    {
        image: "https://randomuser.me/api/portraits/men/37.jpg",
        name: "David Johnson",
        comment: "I love the variety of products available. I found exactly what I was looking for!"
    },
    {
        image: "https://randomuser.me/api/portraits/women/67.jpg",
        name: "Emily Brown",
        comment: "Great prices and fast shipping. I will definitely shop here again!"
    },
    {
        image: "https://randomuser.me/api/portraits/men/86.jpg",
        name: "Michael Lee",
        comment: "The website is easy to navigate, and I found some great deals!"
    },
    {
        image: "https://randomuser.me/api/portraits/women/93.jpg",
        name: "Sarah Wilson",
        comment: "Quick delivery and the products are exactly as described. Highly recommend!"
    },
    {
        image: "https://randomuser.me/api/portraits/men/23.jpg",
        name: "Daniel Kim",
        comment: "I love the customer loyalty program. I earned rewards on my first purchase!"
    },
    {
        image: "https://randomuser.me/api/portraits/women/85.jpg",
        name: "Jessica Martinez",
        comment: "The packaging was excellent, and the products were in perfect condition."
    },
    {
        image: "https://randomuser.me/api/portraits/men/88.jpg",
        name: "Chris Evans",
        comment: "Fantastic customer support! They resolved my issue very quickly."
    },
    {
        image: "https://randomuser.me/api/portraits/women/15.jpg",
        name: "Sophia Patel",
        comment: "Excellent value for money! I'll definitely recommend this store to my friends."
    }
];


const Testimonial = () => {
    const { mode } = useContext(myContext);

    var settings = {
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
            <Slider {...settings} className="m-14">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="flex justify-center items-center p-2">
                        <div className={`bg-${mode === 'dark' ? 'gray-800' : 'white'} shadow-lg rounded-lg p-6 max-w-sm w-full transition-transform transform hover:scale-105`}>
                            <div className="flex justify-center mb-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className={`text-xl font-semibold ${mode === 'dark' ? 'text-yellow-500' : 'text-gray-800'}`}>{testimonial.name}</h3>
                            </div>
                            <p className={`text-base italic text-center ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>"{testimonial.comment}"</p>
                        </div>
                    </div>
                ))}
            </Slider>
    );
};


export default Testimonial;
