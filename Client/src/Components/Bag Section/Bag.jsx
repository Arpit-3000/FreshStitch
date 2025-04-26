import React, { useState } from 'react';
import backgroundImage from './back.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SolanaPaymentModal from "../SolanaPaymentModal";


const BagSection = () => {
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setContactEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  


  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  const location = useLocation();
  const {
    bag = [],
    subtotal = 0,
    deliveryCharge = 0,
    total = 0,
    selectedService = "No Service Selected"
  } = location.state || {};
  console.log(bag);

  

  const [showSolanaModal, setShowSolanaModal] = useState(false);

  const [solAmount, setSolAmount] = useState(0);

useEffect(() => {
  const fetchConversionRate = async () => {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=inr');
      const data = await res.json();
      const inrToSolRate = 1 / data.solana.inr;
      const calculatedSol = total * inrToSolRate;
      setSolAmount(Number(calculatedSol.toFixed(6))); // round to 6 decimals
    } catch (err) {
      console.error("Failed to fetch SOL price", err);
    }
  };

  fetchConversionRate();
}, [total]);



  useEffect(() => {
    if (paymentMethod === "phantomwallet") {
      setShowSolanaModal(true);
    } else {
      setShowSolanaModal(false);
    }
  }, [paymentMethod]);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSave = () => {
    const orderDetails = {
      pickupDate,
      pickupTime,
      contactName,
      email,
      mobileNumber,
      address,
      paymentMethod,
      currentDate: new Date().toLocaleDateString(),
      bag,
      subtotal,
      deliveryCharge,
    };

    console.log(orderDetails);


    navigate('/orderhistory', {
      state: orderDetails, 
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="bg-white bg-opacity-70 min-h-screen p-8">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Left Section */}
          <div className="w-full lg:w-2/4 space-y-6">
            <h2 className="text-red-600 text-2xl font-bold mb-6">
              Edit Pickup & Delivery Details
            </h2>

            {/* Schedule Section */}
            <div className="space-y-4">
              <h3 className="text-red-500 text-xl font-semibold">&#x1F4C5; Schedule</h3>
              <p className="text-gray-600">Expert will arrive at your given address within 30 minutes</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Pickup Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Pickup Time</label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Person Section */}
            <div className="space-y-4">
              <h3 className="text-red-500 text-xl font-semibold">&#x260E; Contact Person</h3>
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input
                  type='textt'
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="emaill"
                  value={email}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Mobile Number</label>
                <input
                  type="number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-red-500 text-xl font-semibold">&#x1F4CD; Address</h3>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="3"
                required
              ></textarea>
            </div>

            {/* Payment Method Section */}
            <div className="space-y-4">
              <h3 className="text-red-500 text-xl font-semibold">&#x1F4B3; Payment Method</h3>
              <p className="text-gray-600">Select your preferred payment method below:</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    className="mr-3"
                    checked={paymentMethod === 'cod'}
                    onChange={handlePaymentChange}
                  />
                  <label className="text-sm">Cash on Delivery</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="netbanking"
                    className="mr-3"
                    checked={paymentMethod === 'netbanking'}
                    onChange={handlePaymentChange}
                  />
                  <label className="text-sm">Net Banking</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" name="paymentMethod" value="phantomwallet" className="mr-3" checked={paymentMethod === 'phantomwallet'} onChange={handlePaymentChange} />
                  <label className="text-sm">Connect to Wallet (Phantom)</label>
                </div>
              </div>
            </div>

            <button
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300"
              onClick={handleSave}
            >
              Save & Continue
            </button>
          </div>

          {/* Bag Section */}

          <div className="bg-white shadow-lg rounded-xl h-4/5 w-2/5 p-6  border border-gray-200">
            <h2 className="text-xl font-bold text-cadetdark">Your Bag</h2>

            {bag.selectedService && (
              <div className="mt-2 text-lg font-medium text-cadetdark">
                Service: <span className="text-cadetblue">{selectedService}</span>
              </div>
            )}


            {bag.length > 0 ? (
              <>
                <ul>

                  {bag.map((item, index) => (
                    <li key={index} className="flex justify-between items-center py-2">
                      <span>{item.name}(x{item.quantity})</span>
                      <span>{item.price * item.quantity}/-</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <p className="flex justify-between">
                    <span>Sub Total</span>
                    <span>{subtotal}/-</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span>{deliveryCharge}/-</span>
                  </p>
                  <hr className="my-4" />
                  <p className="flex justify-between font-bold">
                    <span>Grand Total</span>
                    <span>{total}/-</span>
                  </p>
                </div>
              </>
            ) : (
              <p>Your bag is empty.</p>
            )}

          </div>

        </div>
      </div>
       {/* Solana Payment Modal */}
       <SolanaPaymentModal
        isOpen={showSolanaModal}
        onClose={() => {
          setShowSolanaModal(false);
          setPaymentMethod("Solana Payment");
        }}
        amountSOL={0.00001}
        receiverWallet="94QZP1C5xBgPpDfB3foZujiLSQpTuXpYFev9u2pMN7i9"
      />

      {/*Contact section*/}
      <footer id="contact" className="bg-gradient-to-br from-cadetblue to-cadetdark text-white p-8">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg"><a href="./contact">Contact Us</a></h3>
            <p>Laundry Wallah Service</p>
            <p>Email: LaundryWallah.1010@gmail.com</p>
            <p>Phone: +91 790-5739-950</p>
          </div>
          <div>
            <h3 className="font-bold text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/" target="_blank" className="hover:text-yellow-400">Facebook</a>
              <a href="https://www.twitter.com" target="_blank" className="hover:text-yellow-400">Twitter</a>
              <a href="https://www.instagram.com" target="_blank" className="hover:text-yellow-400">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>

  );
};

export default BagSection;
