import React, { useEffect, useState, useRef } from "react";
import Loader from "../Loader/Loader";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const OrderCard = ({ order, onViewDetails }) => {
  const statusStages = {
    "Order Placed": 10,
    "Order Picked": 40,
    "Order Processing": 70,
    "Order Delivered": 90,
    "Order Completed": 100,
  };

  const progress = statusStages[order.status] || 0;

  return (
    <div className=" bg-gradient-to-r from-cadetblue to-cadetdark text-white p-6 rounded-xl shadow-lg w-full max-w-2xl mx-auto mb-6 relative">
      {/* FIX: Allow clicks to pass through */}
      <div className="absolute  inset-0 rounded-xl pointer-events-none"></div>

      <div className="relative flex justify-between items-center">
        <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
        <p className="text-sm">{new Date(order.orderDate).toDateString()}</p>
      </div>

      <div className="relative mt-4">
        <p className="font-medium uppercase">{order.status}</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300`}
            style={{
              width: `${progress}%`,
              backgroundColor:
                progress < 40
                  ? "#9f1239" // magenta
                  : progress < 70
                    ? "#1E40AF" // blue-800
                    : progress < 90 ? "#854D0E" : //yellow-800
                      progress < 100 ? "#86198F" : //fuchsia-800
                        "#4ade80", // green-800
            }}
          ></div>
        </div>
        <p className="text-xl mt-4 font-semibold text-black">{progress}%</p>
      </div>

      <div className="flex justify-end mt-4">
        <button
          className=" bg-creamDark px-4 py-2 text-black rounded-md font-semibold hover:bg-cream"
          onClick={() => onViewDetails(order)} // Ensure this works now
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const OrderModal = ({ order, onClose }) => {
  if (!order) return null;

  const handleDownloadInvoice = async () => {
    const element = invoiceRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${order._id}.pdf`);
  };

  const invoiceRef = useRef();
  return (

    <div className="fixed inset-0 flex items-center justify-center mt-24 bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">

        <div ref={invoiceRef}>

          {/* Logo & Heading */}
          <div className="text-center my-4">
            <h2 className="text-2xl font-bold text-cadetblue">
              Fresh Stitch - Perfect Place For Dhulai & Silai
            </h2>
            <p className="text-sm text-gray-500">
              Our Vision is for clean laundry and accurate tailoring in the shortest possible turnaround time. ♡
            </p>
          </div>

          {/* Order Details */}
          <div className="border p-4 rounded-lg bg-gray-50 mb-4">
            <h3 className="text-lg font-semibold text-gray-700 text-center">
              Order Number: <span className="text-cadetdark">#{order._id}</span>
            </h3>
            <table className="w-full border-collapse border border-gray-300 mt-2">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold bg-gray-100">Name</td>
                  <td className="border border-gray-300 px-4 py-2">{order.contactName}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold bg-gray-100">Email</td>
                  <td className="border border-gray-300 px-4 py-2">{order.email}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold bg-gray-100">Mobile Number</td>
                  <td className="border border-gray-300 px-4 py-2">{order.mobileNumber}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold bg-gray-100">Address</td>
                  <td className="border border-gray-300 px-4 py-2">{order.address}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold bg-gray-100">Payment Method</td>
                  <td className="border border-gray-300 px-4 py-2">{order.paymentMethod}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold bg-gray-100">Pickup Date</td>
                  <td className="border border-gray-300 px-4 py-2">{order.pickupDate}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold bg-gray-100">Pickup Time</td>
                  <td className="border border-gray-300 px-4 py-2">{order.pickupTime}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Order Items Table */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-cadetblue text-white">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Product</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Price Details */}
          <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <p className="text-right"><strong>Sub Total:</strong> ₹{order.subtotal}</p>
            <p className="text-right"><strong>Delivery Charge:</strong> ₹{order.DeliveryCharge}</p>
            <p className="text-right font-bold text-lg"><strong>Grand Total:</strong> ₹{order.grandtotal}</p>
          </div>
        </div>

        {/* Download Invoice Button */}
        <div className="flex justify-center">
          <button className="bg-creamDark mt-8 text-black shadow-lg hover:bg-creamLight px-6 py-2 rounded-lg" onClick={handleDownloadInvoice}>
            Download Invoice
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-cadetdark mt-6">
          <p>Thank you for shopping here ♡</p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem("token");

    if (!userEmail) {
      console.error("No signed-in user found.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/api/orders/place-order")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch orders");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Orders:", data);
        const filteredOrders = data.filter(
          (order) => order.email?.trim().toLowerCase() === userEmail.trim().toLowerCase()
        );
        setOrders(filteredOrders);
      })
      .catch((error) => console.error("Error fetching orders:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-center text-red-500 text-3xl font-bold mb-6">
        Your Order History
      </h1>

      {loading ? (
        <Loader />
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <OrderCard key={order._id} order={order} onViewDetails={setSelectedOrder} />
        ))
      ) : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}

      {/* Order Details Modal */}
      <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
};

export default MyOrders;
