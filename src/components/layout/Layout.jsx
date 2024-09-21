import React, { useContext } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import myContext from '../../context/data/myContext'

const Layout = ({ children }) => {

    const { mode } = useContext(myContext)
    return (
        <>
            <Navbar />
            <div className={`content ${mode === 'dark' ? 'bg-gradient-to-b from-gray-800 to-gray-900' : ''}`}>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout