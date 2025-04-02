import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  useEffect(() => {
    fetch("http://localhost:3000/place-order")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((order) => ({
          ...order,
          totalItems: order.items && Array.isArray(order.items) ? order.items.length : 0
        }));
        setOrders(formattedData);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // Handle order status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      // Send the status update to the backend
      const response = await fetch(`http://localhost:3000/place-order/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }), // Send the new status
      });

      if (response.ok) {
        // Fetch the updated order from the response
        const updatedOrder = await response.json();

        // Update the state with the new order status
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id ? { ...order, orderStatus: updatedOrder.orderStatus } : order
          )
        );
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

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
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="border-b hover:bg-gray-100 ">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{order._id}</td>
                  <td className="p-3">{order.contactName}</td>
                  <td className="p-3">{order.email}</td>
                  <td className="p-3">{order.mobileNumber}</td>
                  <td className="p-3">{new Date(order.orderDate).toDateString()}</td>
                  <td className="p-3">{order.totalItems}</td>

                  {/* View Details Button */}
                  <td className="p-3 text-center">
                    <button className="text-white px-3 py-1 bg-gradient-to-r from-cadetblue to-cadetdark rounded  hover:bg-cadetdark">
                      View Details
                    </button>
                  </td>

                  {/* Order Status Dropdown */}
                  <td className="p-3  gap-2">
                  
                    <select
                      value={order.orderStatus} // Use `order.orderStatus` to match the backend
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`border border-black p-2  rounded ${order.orderStatus === "Order Placed" ? "bg-rose-500" :
                        order.orderStatus === "Order Processing" ? "bg-yellow-700" :
                        order.orderStatus === "Order Picked" ? "bg-cadetblue" :
                        order.orderStatus === "Order Completed" ? "bg-green-500" :
                        order.orderStatus === "Order Delivered" ? "bg-fuchsia-500" :
                        "bg-gray-100"} text-white`}
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
          </table>
        </div>
        {orders.length === 0 && <p className="text-center text-gray-500 mt-4">No orders available</p>}
      </div>
    </div>
  );
};

export default OrdersTable;
