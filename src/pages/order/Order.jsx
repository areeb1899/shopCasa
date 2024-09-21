import React, { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/Data/myContext';
import Loader from '../../components/loader/loading';

const Order = () => {
  const context = useContext(myContext);
  const { mode, loading, order = [] } = context; // Ensure `order` is an array by default
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.user?.uid;

  // Function to aggregate items based on the same item ID
  const aggregateItems = (items) => {
    const aggregated = items.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);
    return aggregated;
  };

  // Filter orders by userId
  const userOrders = order.filter((obj) => obj.userid === userId);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : userOrders.length > 0 ? (
        <div className={`container mx-auto px-6 py-8 ${mode === 'dark' ? 'bg-gradient-to-b from-gray-800 to-gray-900' : ''}`}>
          {userOrders.map((order) => {
            const aggregatedItems = aggregateItems(order.cartItems); // Aggregate items here
            return (
              <div
                key={order.id}
                className="my-8 mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-6"
                style={{
                  backgroundColor: mode === 'dark' ? '#202122' : '#ffffff',
                  color: mode === 'dark' ? '#ffffff' : '#000000',
                }}
              >
                <h2 className="text-2xl font-bold mb-4" style={{ color: mode === 'dark' ? '#ffffff' : '#000000' }}>
                  Order ID: {order.id}
                </h2>
                <p className="text-sm mb-4" style={{ color: mode === 'dark' ? '#d3d3d3' : '#555555' }}>
                  Order placed: {order.date}
                </p>
                {aggregatedItems.map((item, index) => (
                  <div key={item.id || index} className="flex flex-col md:flex-row mb-6 border-b pb-4">
                    <img
                      src={item.imageURL}
                      alt="product-image"
                      className="w-full rounded-lg md:w-40 md:mr-6"
                      style={{ border: mode === 'dark' ? '1px solid #444' : '1px solid #ddd' }}
                    />
                    <div className="mt-4 md:mt-0 flex-grow">
                      <h2
                        className="text-lg font-semibold"
                        style={{ color: mode === 'dark' ? '#ffffff' : '#000000' }}
                      >
                        {item.title}
                      </h2>
                      <p
                        className="mt-2 text-sm"
                        style={{ color: mode === 'dark' ? '#d3d3d3' : '#555555' }}
                      >
                        {item.description}
                      </p>
                      <p
                        className="mt-2 text-sm font-medium"
                        style={{ color: mode === 'dark' ? '#d3d3d3' : '#555555' }}
                      >
                        ₹{item.price} x {item.quantity}
                      </p>
                      <p
                        className="mt-2 text-sm font-semibold"
                        style={{ color: mode === 'dark' ? '#d3d3d3' : '#555555' }}
                      >
                        Total: ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-100" style={{ backgroundColor: mode === 'dark' ? "#1D2734" : "#f5f5f5" }}>
          <div className="text-center bg-white p-6 rounded-lg shadow-lg border border-white" style={{ backgroundColor: mode === 'dark' ? "#1D2734" : "" }}>
            <h2 className="text-2xl font-bold text-gray-900" style={{ color: mode === 'dark' ? "white" : "" }}>No Orders</h2>
            <p className="text-gray-600 mt-2" style={{ color: mode === 'dark' ? "white" : "" }}>It looks like you haven't placed any orders yet.</p>
            <a href="" className='underline text-blue-700' onClick={(e) => { e.preventDefault(); window.location.reload(); }}>reload</a>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Order;
