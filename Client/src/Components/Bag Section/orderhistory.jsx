import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
 
  

  
  const {
    pickupDate,
    pickupTime,
    contactName,
    email,
    mobileNumber,
    address,
    paymentMethod,
    currentDate,
    bag = [], 
    subtotal = 0, 
    DeliveryCharge = 5, 
  } = state || {};

  const grandTotal = subtotal + DeliveryCharge;

 
  const handlePlaceOrder = async () => {
    try {
      const orderDetails = {
        pickupDate,
        pickupTime,
        contactName,
        email,
        mobileNumber,
        address,
        paymentMethod,
        currentDate,
        bag,
        subtotal,
        DeliveryCharge,
        grandTotal,
      };

      
      const response = await fetch('http://localhost:3000/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Order Placed Successfully!');
        navigate('/order-confirmation');
      } else {
        alert(data.message || 'Error placing the order');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while placing the order');
    }
  };

 
  const handleEditDetails = () => {
    navigate('/cart', { state }); 
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 p-8 ">
      {/* Order Details Section */}
      <div className="bg-gradient-to-br from-cadetblue to-cadetdark text-black rounded-xl shadow-2xl mr-4 p-8 w-full lg:w-3/5">
        <h2 className="text-center text-3xl font-extrabold mb-6 text-white">Your Order History</h2>
        <div className="bg-cream rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Order Details</h3>
            <p className="text-sm italic">{currentDate || 'No Date Available'}</p>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-medium">Pickup Date:</h4>
              <p>{pickupDate || 'N/A'}</p>
            </div>
            <div>
              <h4 className="font-medium">Pickup Time:</h4>
              <p>{pickupTime || 'N/A'}</p>
            </div>
            <div>
              <h4 className="font-medium">Contact Name:</h4>
              <p>{contactName || 'N/A'}</p>
            </div>
            <div>
              <h4 className="font-medium">Mobile Number:</h4>
              <p>{mobileNumber || 'N/A'}</p>
            </div>
            <div>
              <h4 className="font-medium">Email:</h4>
              <p>{email || 'N/A'}</p>
            </div>
            <div>
              <h4 className="font-medium">Payment Method:</h4>
              <p>{paymentMethod || 'N/A'}</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium">Address:</h4>
            <p>{address || 'N/A'}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handlePlaceOrder}
              className="bg-cadetblue text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-cadetdark transition duration-300 w-full"
            >
              Place Order
            </button>
            <button
              onClick={handleEditDetails}
              className="bg-gray-500 text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-gray-600 transition duration-300 w-full"
            >
              Edit Details
            </button>
          </div>
        </div>
      </div>

      {/* Bag Section */}
      <div className="bg-gradient-to-br from-cadetdark to-cadetblue text-black rounded-xl shadow-2xl p-8 w-full lg:w-3/5">
      
        <h3 className="text-center text-3xl font-extrabold mb-6 text-white">Your Bag</h3>
        <div className="bg-cream rounded-lg p-6">
          {bag.length > 0 ? (
            <>
              <ul className="mb-12">
                {bag.map((item, index) => (
                  <li key={index} className="flex justify-between py-2 border-b-2   ">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>{item.price * item.quantity}/-</span>
                  </li>
                ))}
              </ul>
              <div className="mb-4">
                <p className="flex justify-between ">
                  <span>Sub Total</span>
                  <span>{subtotal}/-</span>
                </p>
                <p className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span>{DeliveryCharge}/-</span>
                </p>
                <hr className="my-4" />
                <p className="flex justify-between font-bold ">
                  <span>Grand Total</span>
                  <span>{grandTotal}/-</span>
                </p>
              </div>
            </>
          ) : (
            <p>Your bag is empty.</p>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default OrderHistory;