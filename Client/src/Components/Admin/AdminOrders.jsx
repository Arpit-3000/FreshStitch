import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Loader from "../Loader/Loader";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading,setLoading]=useState(true)

  // Fetch orders from backend
  useEffect(() => {
    fetch("http://localhost:3000/api/orders/place-order")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((order) => ({
          ...order,
          totalItems: order.items && Array.isArray(order.items) ? order.items.length : 0
        }));
        setOrders(formattedData);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // Handle order status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/place-order/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id ? { ...order, orderStatus: updatedOrder.orderStatus } : order
          )
         
        );
        
      } else {
        console.error("Failed to update order status");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Handle order selection for modal
  const openModal = (order) => setSelectedOrder(order);
  const closeModal = () => setSelectedOrder(null);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="p-6">
        <h2 className="text-3xl font-semibold font-serif mb-4">All Orders</h2>
        <div className="overflow-x-auto max-h-[620px] border p-4 rounded-lg shadow-md">
       
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Total Items</th>
                <th className="p-3 text-center">View</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            {loading ? (
                        <Loader/>
                        ) : orders.length === 0 ? (
                          <p className="text-center text-lg text-gray-500">No Orders Found</p>
                        ) : (
            <tbody>
            
              {orders.map((order, index) => (
                <tr key={order._id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{order._id}</td>
                  <td className="p-3">{order.contactName}</td>
                  <td className="p-3">{order.email}</td>
                  <td className="p-3">{order.mobileNumber}</td>
                  <td className="p-3">{new Date(order.orderDate).toDateString()}</td>
                  <td className="p-3">{order.totalItems}</td>

                  {/* View Details Button */}
                  <td className="p-3 text-center">
                    <button
                      className="text-white px-3 py-1 bg-gradient-to-r from-cadetblue to-cadetdark rounded hover:bg-cadetdark"
                      onClick={() => openModal(order)}
                    >
                      View Details
                    </button>
                  </td>

                  {/* Order Status Dropdown */}
                  <td className="p-3">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`border border-black p-2 rounded text-white ${order.orderStatus === "Order Placed" ? "bg-rose-500" :
                        order.orderStatus === "Order Processing" ? "bg-yellow-700" :
                          order.orderStatus === "Order Picked" ? "bg-cadetblue" :
                            order.orderStatus === "Order Completed" ? "bg-green-500" :
                              order.orderStatus === "Order Delivered" ? "bg-fuchsia-500" :
                                "bg-gray-100"
                        }`}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Order Picked">Order Picked</option>
                      <option value="Order Processing">Order Processing</option>
                      <option value="Order Delivered">Order Delivered</option>
                      <option value="Order Completed">Order Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            
            </tbody>
          )}
         
          </table>
                        
        </div>
        {orders.length === 0 && <p className="text-center text-gray-500 mt-4">No orders available</p>}

        {/* Modal Popup */}
        {selectedOrder && (
          <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-3xl max-h-[80vh] overflow-y-auto">
              {/* Header Section */}
              <div className="border-b pb-2 flex justify-center relative">
                <h2 className="text-lg font-semibold font-serif text-cadetblue">Order Details</h2>
                <button
                  onClick={closeModal}
                  className="absolute right-0 text-gray-600 hover:text-red-500 text-xl"
                >
                  &times;
                </button>
              </div>


              <div className="mt-4">
                <table className="w-full border">
                  <tbody>
                  <tr>
                    <td className="p-2 border font-serif font-semibold text-gray-700 bg-gray-100">Order ID:</td>
                    <td className="p-2 border font-semibold text-gray-700">{selectedOrder._id}</td>
                  </tr>
                    <tr>
                      <td className="p-2 border font-serif font-semibold text-gray-700 bg-gray-100">Name:</td>
                      <td className="p-2 border">{selectedOrder.contactName}</td>
                    </tr>
                    <tr>
                      <td className="p-2 border font-serif font-semibold text-gray-700 bg-gray-100">Email:</td>
                      <td className="p-2 border">{selectedOrder.email}</td>
                    </tr>
                    <tr>
                      <td className="p-2 border font-serif font-semibold text-gray-700 bg-gray-100">Phone:</td>
                      <td className="p-2 border">{selectedOrder.mobileNumber}</td>
                    </tr>
                    <tr>
                      <td className="p-2 border font-serif font-semibold text-gray-700 bg-gray-100">Address</td>
                      <td className="p-2 border">{selectedOrder.address}</td>
                    </tr>
                    <tr>
                      <td className="p-2 border font-serif font-semibold text-gray-700 bg-gray-100">Pickup Date</td>
                      <td className="p-2 border">{selectedOrder.pickupDate}</td>
                    </tr>
                    <tr>
                      <td className="p-2 border font-serif font-semibold text-gray-700 bg-gray-100">Pickup Time</td>
                      <td className="p-2 border">{selectedOrder.pickupTime}</td>
                    </tr>
                    <tr>
                      <td className="p-2 border font-serif font-semibold text-gray-700 bg-gray-100">Payment Method</td>
                      <td className="p-2 border">{selectedOrder.paymentMethod}</td>
                    </tr>
                  </tbody>
                </table>

                <h3 className="text-lg font-semibold text-center font-serif  mt-4 text-cadetblue">Product Information</h3>
                <table className="w-full border mt-2">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">#</th>
                      <th className="p-2 border font-serif text-gray-700">Product</th>
                      <th className="p-2 border font-serif text-gray-700">Quantity</th>
                      <th className="p-2 border font-serif text-gray-700">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx} className="border">
                        <td className="p-2 font-serif text-center">{idx + 1}</td>
                        <td className="p-2 font-serif text-center">{item.name}</td>
                        <td className="p-2 text-center">{item.quantity}</td>
                        <td className="p-2 text-center">₹ {item.price}</td>
                      </tr>
                    ))}

                    {/* Subtotal Row */}
                    <tr className="border">
                      <td colSpan="3" className="p-2 font-serif  text-gray-800  font-semibold text-right">Sub Total:</td>
                      <td className="p-2 text-center">₹ {selectedOrder.subtotal}</td>
                    </tr>

                    {/* Delivery Charge Row */}
                    <tr className="border">
                      <td colSpan="3" className="p-2 font-serif   text-gray-800 font-semibold text-right">Delivery Charge:</td>
                      <td className="p-2 text-center">₹ {selectedOrder.DeliveryCharge}</td>
                    </tr>

                    {/* Grand Total Row */}
                    <tr className="border font-semibold">
                      <td colSpan="3" className="p-2 font-serif  text-right text-gray-800">Grand Total:</td>
                      <td className="p-2 text-center">₹ {selectedOrder.grandtotal}</td>
                    </tr>
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;
