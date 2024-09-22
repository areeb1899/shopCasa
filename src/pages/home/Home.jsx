import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import ProductCard from '../../components/productCard/ProductCard'
import Testimonial from '../../components/testimonials/Testimonial'
import ImageSlider from '../../components/imageSlider/ImageSlider'
import IntroVideo from "../../assets/logoIntro.webm"
import logo from "../../assets/logo.png"
import myContext from '../../context/Data/myContext'


const Home = () => {
  const { mode } = useContext(myContext)

  return (
    <Layout>
      <HeroSection />
      <ProductCard />
      <ImageSlider />
      <Testimonial />
      <section className={`py-12 px-6 md:px-12 ${mode === 'dark' ? 'bg-gradient-to-b from-gray-900 to-gray-800' : ''}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
            {/* Video element */}
            <div className="w-full md:w-[90%] lg:w-[80%] xl:w-[70%]">
              <video
                className="w-full rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                autoPlay
                muted
                loop
              >
                <source src={IntroVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className={`md:w-1/2 p-10 h-full ${mode === 'dark' ? 'bg-[#202122] text-gray-300' : 'bg-white text-gray-600'}`}>
            <img src={logo} className='w-48 mb-5 mx-auto' alt="logo" />
            <p className={`text-sm md:text-base lg:text-lg leading-relaxed ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              We are dedicated to providing the best products and services to our customers. Our team works tirelessly to ensure that every product meets the highest quality standards, and we are passionate about what we do. Our mission is to bring innovation and excellence to everything we create, and we strive to offer an outstanding customer experience. We value your trust and work hard to exceed your expectations.
            </p>
          </div>
        </div>
      </section>

    </Layout>
  )
}

export default Home 