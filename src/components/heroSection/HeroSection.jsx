import React from 'react'
import intro from "../../assets/Intro.mp4"

const HeroSection = () => {
  return (
    <div className="mt-1 px-4">
      <div className="relative overflow-hidden w-full max-w-screen-xl mx-auto">
        <video
          className="w-full h-auto"
          autoPlay
          loop
          muted
        >
          <source src={intro} type="video/mp4" />
        </video>
      </div>
    </div>

  )
}

export default HeroSection