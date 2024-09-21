import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Order from './pages/order/Order'
import Cart from './pages/cart/Cart'
import MyState from './context/Data/myState'
import Login from './pages/registration/Login'
import Signup from './pages/registration/Signup'
import ProductInfo from './pages/productInfo/ProductInfo'
import AddProduct from './pages/admin/page/AddProduct'
import UpdateProduct from './pages/admin/page/UpdateProduct'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProducts from './pages/allProducts/AllProducts'
import UserInfo from './pages/userInfo/UserInfo'
import DashboardTab from './pages/admin/dashboard/DashboardTab'
import ErrorPage from './pages/error/ErrorPage'
import AboutUs from './components/footer/footerComponents/About/AboutUs'
import LocateUs from './components/footer/footerComponents/About/LocateUs'
import ContactUs from './components/footer/footerComponents/About/ContactUs'
import Payment from './components/footer/footerComponents/Help/Payments'
import Shipping from './components/footer/footerComponents/Help/Shipping'
import CancellationAndReturns from './components/footer/footerComponents/Help/CancellationAndReturns'
import FAQ from './components/footer/footerComponents/Help/FAQ'
import Wishlist from './pages/wishlist/Wishlist'
import ScrollToTop from './components/scrollToTop'





const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <MyState>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/allproducts' element={<AllProducts />} />
          <Route path='/userinfo' element={
            <ProtectedRouteForUser>
              <UserInfo />
            </ProtectedRouteForUser>
          } />
          <Route path='/order' element={
            <ProtectedRouteForUser>
              <Order />
            </ProtectedRouteForUser>
          } />
          <Route path='/cart' element={
            <ProtectedRouteForUser>
              <Cart />
            </ProtectedRouteForUser>} />
          <Route path='/wishlist' element={
            <ProtectedRouteForUser>
              <Wishlist />
            </ProtectedRouteForUser>} />
          <Route path='/dashboard' element={
            <ProtectedRouteForAdmin>
              <DashboardTab />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/login' element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path='/signup' element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
          <Route path='/productinfo/:id' element={<ProductInfo />} />
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <AddProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/updateproduct' element={
            <ProtectedRouteForAdmin>
              <UpdateProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/locate' element={<LocateUs />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/cancellationandreturns' element={<CancellationAndReturns />} />
          <Route path='/faqs' element={<FAQ />} />
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
        <ToastContainer />
      </MyState>
    </Router>

  )
}

export default App


// for public routes (login and signup)
export const PublicRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (user) {
    // If user is logged in, redirect to home page
    return <Navigate to={'/'} />;
  } else {
    // If user is not logged in, allow access to the page
    return children;
  }
};


//for user
export const ProtectedRouteForUser = ({ children }) => {
  const user = localStorage.getItem('user')
  if (user) {
    return children

  } else {
    toast.error("Please login to continue")
    return <Navigate to={'/login'} />
  }
}

// for admin   
export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  if (admin.user.email === "areebahmedwork@gmail.com") {
    return children
  } else {
    return <Navigate to={'/login'} />
  }
}