import React from 'react';
import perfume from "../../assets/perfume.png";
import shoes from "../../assets/ImageSlider(shoes).jpg";
import watch from "../../assets/ImageSlider(watch).jpg";
import headphone from "../../assets/ImageSlider(headphone).jpg";
import mobile from "../../assets/ImageSlider(mobile).jpg";
import { Carousel } from '@material-tailwind/react';

const ImageSlider = () => {
    return (
        <div className="relative h-[400px]">
            <Carousel
                autoplay
                loop
                interval={2000}
                className="rounded-sm"
            >
                <img
                    src={shoes}
                    alt="image 1"
                    className="h-full w-full object-cover"
                />
                <img
                    src={watch}
                    alt="image 2"
                    className="h-full w-full object-cover"
                />
                <img
                    src={headphone}
                    alt="image 3"
                    className="h-full w-full object-cover"
                />
                <img
                    src={mobile}
                    alt="image 4"
                    className="h-full w-full object-cover"
                />
                <img
                    src={perfume}
                    alt="image 5"
                    className="h-full w-full object-cover"
                />
            </Carousel>
        </div>
    );
}

export default ImageSlider;
