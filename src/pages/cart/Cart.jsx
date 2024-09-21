import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import Modal from '../../components/modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, deleteFromCart } from '../../redux/cartSlice'
import { toast } from 'react-toastify'
import { addDoc, collection } from 'firebase/firestore'
import { fireDb } from '../../firebase/Firebase'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/data/myContext'




const Cart = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { mode } = context;
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);
  // console.log(cartItems);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Deleted from cart");
  };

  //clear all cart items
  const clearAllCart = () => {
    dispatch(clearCart());
    toast.success("All items removed from cart");
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let initialAmount = 0;
    cartItems.forEach((cartItem) => {
      initialAmount += parseInt(cartItem.price) * cartItem.quantity;
    });
    setTotalAmount(initialAmount);
  }, [cartItems]);


  //shipping
  const shipping = totalAmount > 1000 ? 0 : 100;
  const grandTotal = shipping + totalAmount;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");



  // Payment Integration 
  const buyNow = async () => {
    if (name === "" || address === "" || pincode === "" || phoneNumber === "") {
      toast.error("Please fill in all the details");
      return;
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
    };

    var options = {
      key: import.meta.env.VITE_REACT_APP_KEY,
      secret: import.meta.env.VITE_REACT_SECRET,
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "shopCasa",
      theme: {
        color: '#B3997F',
      },
      description: "for testing purpose",
      handler: async function (response) {
        // console.log(response); 
        toast.success('Payment Successful please reload the page');

        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId
        };

        try {
          const result = await addDoc(collection(fireDb, 'order'), orderInfo);
          // console.log("Order added with ID: ", result.id);
          dispatch({ type: 'cart/clearCart' });
          localStorage.removeItem('cart');
          navigate('/order');
        } catch (error) {
          console.log("Error adding order: ", error);
        }
      }
    };
    if (!window.Razorpay) {
      toast.error('Payment gateway not available');
      return;
    }

    var pay = new window.Razorpay(options);
    pay.open();
    // console.log(pay);
  };

  return (
    <Layout>
      <div className={`bg-gray-100 pt-5 transition-colors duration-300 ${mode === 'dark' ? 'bg-gradient-to-b from-gray-800 to-gray-900' : ''}`} style={{ color: mode === 'dark' ? 'white' : '', }}>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          {cartItems.length > 0 ? (
            <>
              <div className="rounded-lg md:w-2/3">
                {cartItems.map((item, index) => {
                  const { title, price, description, imageURL, quantity, id } = item;
                  return (
                    <div key={index} className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start"
                      style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                      <Link to={`/productinfo/${id}`}><img src={imageURL} alt={title} className="w-full rounded-lg sm:w-40" /> </Link>
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <Link to={`/productinfo/${id}`}><h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h2></Link>
                          <h2 className="text-sm text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{description.split(' ').slice(0, 8).join(' ')}
                            {description.split(' ').length > 8 && '...'}
                          </h2>
                          <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price} x {quantity}</p>
                          <p className="text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Total: ₹{price * quantity}</p>
                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 cursor-pointer">
                          <button onClick={() => deleteCart(item)} className="text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>


              {/* cart card  */}
              <div className="m-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
                style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
                  <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
                  <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{shipping}</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between mb-3">
                  <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Grand Total</p>
                  <div>
                    <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{grandTotal}</p>
                  </div>
                </div>

                <Modal
                  name={name}
                  address={address}
                  pincode={pincode}
                  phoneNumber={phoneNumber}
                  setName={setName}
                  setAddress={setAddress}
                  setPincode={setPincode}
                  setPhoneNumber={setPhoneNumber}
                  buyNow={buyNow}
                />
                <button onClick={clearAllCart} className="w-full mt-1 bg-red-500 text-white py-2 rounded-lg">
                  Clear All Items
                </button>
              </div>
            </>
          ) : (

            <h1 className="text-center text-2xl p-24 font-bold" style={{ color: mode === 'dark' ? 'white' : '', }}>Your cart is empty</h1>
          )}
        </div>
      </div>


    </Layout>
  )
}

export default Cart