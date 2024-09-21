import React from 'react'

function Loader() {
  return (
    <div>
      <div role="status" className='absolute top-0 right-0 bottom-0 left-0 m-auto w-[3em] h-10 md:h-32 z-50'>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="h-12 w-12"
      >
        <radialGradient
          id="a11"
          cx=".66"
          fx=".66"
          cy=".3125"
          fy=".3125"
          gradientTransform="scale(1.5)"
        >
          <stop offset="0" stopColor="#001097"></stop>
          <stop offset=".3" stopColor="#001097" stopOpacity=".9"></stop>
          <stop offset=".6" stopColor="#001097" stopOpacity=".6"></stop>
          <stop offset=".8" stopColor="#001097" stopOpacity=".3"></stop>
          <stop offset="1" stopColor="#001097" stopOpacity="0"></stop>
        </radialGradient>
        <circle
          transformOrigin="center"
          fill="none"
          stroke="url(#a11)"
          strokeWidth="30"
          strokeLinecap="round"
          strokeDasharray="200 1000"
          strokeDashoffset="0"
          cx="100"
          cy="100"
          r="70"
        >
          <animateTransform
            type="rotate"
            attributeName="transform"
            calcMode="spline"
            dur="0.7s"
            values="360;0"
            keyTimes="0;1"
            keySplines="0 0 1 1"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          transformOrigin="center"
          fill="none"
          opacity=".2"
          stroke="#001097"
          strokeWidth="30"
          strokeLinecap="round"
          cx="100"
          cy="100"
          r="70"
        />
      </svg>
      </div>
    </div>
  )
}

export default Loader