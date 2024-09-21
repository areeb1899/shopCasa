import React, { useContext, useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping } from 'react-icons/ai';
import { AiOutlineUserDelete } from "react-icons/ai";


import { Link } from 'react-router-dom';

function DashboardTab() {
  const context = useContext(myContext)
  const { mode, product, editHandle, deleteProduct, order, userDetails, deleteUser } = context


  return (
    <Layout>


      <div className={`container mx-auto bg-slate-700 ${mode === 'dark' ? 'bg-gradient-to-b from-gray-800 to-gray-900' : ''}`}>
        <div className="tab container mx-auto ">
          <Tabs defaultIndex={0} className=" " >
            <TabList className="md:flex md:space-x-8 bg-  grid grid-cols-2 text-center gap-4 p-4 md:justify-center">
              <Tab>
                <button type="button" className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-5 py-1.5 text-center bg-[#605d5d12] ">
                  <div className="flex gap-2 items-center">
                    <MdOutlineProductionQuantityLimits />Products</div> </button>
              </Tab>
              <Tab>
                <button type="button" className="font-medium border-b-2 border-pink-500 bg-[#605d5d12] text-pink-500  hover:shadow-pink-700  rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]    px-5 py-1.5 text-center ">
                  <div className="flex gap-2 items-center">
                    <AiFillShopping /> Order
                  </div>
                </button>
              </Tab>
              <Tab>
                <button type="button" className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]   px-5 py-1.5 text-center ">
                  <div className="flex gap-2 items-center">
                    <FaUser /> Users
                  </div>
                </button>
              </Tab>
            </TabList>



            {/* Product Details */}
            <TabPanel>
              <div className='  px-4 md:px-0'>
                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === "dark" ? 'white' : 'black' }}>Product Details</h1>
                <div className=" flex justify-end">
                  <Link to={'/addproduct'}>
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} > <div className="flex gap-2 items-center">
                        Add Product <FaCartPlus size={20} />
                      </div></button>
                  </Link>
                </div>
                <div className="relative overflow-x-auto ">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
                    <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          S.No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Product ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {product.map((item, index) => {
                      const { title, price, imageURL, category, date, id } = item;
                      return (
                        <tbody key={index} className=''>
                          <tr className="bg-gray-50 border-b dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                            {/* to show serial number in the dashboard  */}
                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                              {index + 1}.
                            </td>

                            <Link to={`/productinfo/${id}`}>

                              <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                <img className='w-16' src={imageURL} alt="img" />
                              </th>
                            </Link>
                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                              {title}
                            </td>
                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                              ₹{price}
                            </td>
                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                              {category}
                            </td>
                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                              {id}
                            </td>
                            <td className="px-6 py-4 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                              {date}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <div className="flex gap-2 cursor-pointer text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                  <div title='delete product'>
                                    <svg onClick={() => deleteProduct(item)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    {/* SVG icons here */}
                                  </div>
                                  <Link to={'/updateproduct'}>
                                    <div title={"update product"}>
                                      <svg onClick={() => editHandle(item)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                      </svg>
                                      {/* SVG icons here */}
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>

                </div>
              </div>
            </TabPanel>

            {/* Order Details  */}
            <TabPanel>
              {order.length === 0 ? (
                <div className="flex items-center justify-center h-screen">
                  <div
                    className={`text-center p-6 rounded-lg shadow-lg ${mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                      }`}
                  >
                    <h2
                      className={`text-2xl font-bold mb-4 ${mode === "dark" ? "text-white" : "text-gray-900"
                        }`}
                    >
                      No Orders Placed
                    </h2>
                    <p
                      className={`text-gray-600 ${mode === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                      It looks like you haven't placed any orders yet.
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className={`relative overflow-x-auto shadow-md sm:rounded-lg ${mode === "dark" ? "bg-gray-900" : "bg-white"
                    }`}
                >
                  <h1
                    className={`text-center mb-5 text-3xl font-semibold underline ${mode === "dark" ? "text-white" : "text-black"
                      }`}
                  >
                    Order Details
                  </h1>
                  <table
                    className={`w-full text-sm text-left ${mode === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                  >
                    <thead
                      className={`text-xs ${mode === "dark" ? "text-gray-300 bg-gray-800" : "text-gray-700 bg-gray-100"
                        }`}
                    >
                      <tr>
                        <th scope="col" className="px-8 py-3">Sr No.</th>
                        <th scope="col" className="px-8 py-3">Payment Id</th>
                        <th scope="col" className="px-8 py-3">Image</th>
                        <th scope="col" className="px-8 py-3">Title</th>
                        <th scope="col" className="px-8 py-3">Price</th>
                        <th scope="col" className="px-8 py-3">Category</th>
                        <th scope="col" className="px-8 py-3">Name</th>
                        <th scope="col" className="px-8 py-3">Address</th>
                        <th scope="col" className="px-8 py-3">Pincode</th>
                        <th scope="col" className="px-8 py-3">Phone Number</th>
                        <th scope="col" className="px-8 py-3">Email</th>
                        <th scope="col" className="px-8 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.map((allOrders, orderIndex) =>
                        allOrders.cartItems.map((item, itemIndex) => {
                          const { title, category, imageURL, price } = item;
                          return (
                            <tr
                              key={itemIndex}
                              className={`${mode === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                                } border-b`}
                            >
                              <td
                                className={`px-6 py-4 font-medium whitespace-nowrap ${mode === "dark" ? "text-white" : "text-gray-900"
                                  }`}
                              >
                                {orderIndex + 1}.
                              </td>
                              <td className={`px-6 py-4 ${mode === "dark" ? "text-gray-300" : "text-gray-900"}`}>
                                {allOrders.paymentId}
                              </td>
                              <td className="px-6 py-4">
                                <img
                                  className="w-16 h-16 object-cover rounded-lg"
                                  src={imageURL}
                                  alt="product"
                                />
                              </td>
                              <td
                                className={`px-6 py-4 ${mode === "dark" ? "text-gray-300" : "text-gray-900"
                                  }`} title={title}
                              >
                                {title.split(" ").length > 4 ? title.split(" ").slice(0, 4).join(" ") + "..." : title}
                              </td>
                              <td
                                className={`px-6 py-4 ${mode === "dark" ? "text-gray-300" : "text-gray-900"
                                  }`}
                              >
                                ₹{price}
                              </td>
                              <td
                                className={`px-6 py-4 uppercase ${mode === "dark" ? "text-gray-300" : "text-gray-900"
                                  }`}
                              >
                                {category}
                              </td>
                              <td
                                className={`px-6 py-4 ${mode === "dark" ? "text-gray-300" : "text-gray-900"
                                  }`}
                              >
                                {allOrders.addressInfo.name}
                              </td>
                              <td
                                className={`px-6 py-4 ${mode === "dark" ? "text-gray-300" : "text-gray-900"
                                  }`}
                              >
                                {allOrders.addressInfo.address}
                              </td>
                              <td
                                className={`px-6 py-4 ${mode === "dark" ? "text-gray-300" : "text-gray-900"
                                  }`}
                              >
                                {allOrders.addressInfo.pincode}
                              </td>
                              <td
                                className={`px-6 py-4 ${mode === "dark" ? "text-gray-300" : "text-gray-900"
                                  }`}
                              >
                                {allOrders.addressInfo.phoneNumber}
                              </td>
                              <td
                                className={`px-6 py-4 ${mode === "dark" ? "text-gray-300" : "text-gray-900"
                                  }`}
                              >
                                {allOrders.email}
                              </td>
                              <td
                                className={`px-6 py-4 ${mode === "dark" ? "text-gray-300" : "text-gray-900"
                                  }`}
                              >
                                {allOrders.date}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </TabPanel>




            {/* User Details  */}
            <TabPanel>
              <div className="relative overflow-x-auto">
                <h1 className=' text-center mb-5 text-3xl font-semibold underline' style={{ color: mode === "dark" ? 'white' : 'black' }}>
                  User Details
                </h1>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-black uppercase bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                    <tr>
                      <th scope="col" className="px-6 py-3">S.No</th>
                      <th scope="col" className="px-6 py-3">Name</th>
                      <th scope="col" className="px-6 py-3">Email</th>
                      <th scope="col" className="px-6 py-3">Date Joined</th>
                      <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDetails && userDetails.length > 0 ? (
                      userDetails.map((user, index) => (
                        <tr key={user.id} className="bg-gray-50 border-b dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : 'black' }}>
                          <td className="px-6 py-4" style={{ color: mode === 'dark' ? 'white' : '' }}>{index + 1}</td>
                          <td className="px-6 py-4" style={{ color: mode === 'dark' ? 'white' : '' }}>{user.name}</td>
                          <td className="px-6 py-4" style={{ color: mode === 'dark' ? 'white' : '' }}>{user.email}</td>
                          {/* Format and display the timestamp as a readable date */}
                          <td className="px-6 py-4" style={{ color: mode === 'dark' ? 'white' : '' }}>
                            {user.time?.toDate().toLocaleString("en-US", {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <AiOutlineUserDelete className='text-2xl cursor-pointer' onClick={() => deleteUser(user.email)} />


                          </td>
                        </tr>

                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-4" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                          No user data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabPanel>

          </Tabs>
        </div>
      </div>

    </Layout>
  )
}




export default DashboardTab