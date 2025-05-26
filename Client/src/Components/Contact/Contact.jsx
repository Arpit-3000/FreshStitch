import React, { useState } from "react";
import bgcontact from './contactbg.jpg';
import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when this page loads
  }, []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !message) {
      setErrorMessage("Please fill in all the fields.");
      setSuccessMessage("");
    } else {
      setSuccessMessage("Submitted successfully!");
      setErrorMessage("");


      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgcontact})`,
      }}
    >
      <div className="flex items-center justify-center min-h-screen py-12 bg-white bg-opacity-50  p-8">
        <div className=" bg-white bg-opacity-50  shadow-lg rounded-lg p-8 max-w-lg w-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">

          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
            Contact Us
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Please fill this form in a decent manner
          </p>


          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}


          {successMessage && (
            <p className="text-cadetblue text-center mb-4">{successMessage}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>

            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  First Name
                </label>
                <input
                  type="names"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cadetblue transition duration-300"
                  placeholder="First Name"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name
                </label>
                <input
                  type="names"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cadetblue transition duration-300"
                  placeholder="Last Name"
                />
              </div>
            </div>


            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                E-mail
              </label>
              <input
                type="emaill"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cadetblue transition duration-300"
                placeholder="example@example.com"
              />
            </div>


            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Message
              </label>
              <textarea
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cadetblue transition duration-300"
                placeholder="Your message here..."
              ></textarea>
            </div>


            <div className="text-center">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-cadetblue text-white font-semibold rounded-lg shadow-md hover:bg-cadetdark transition duration-300 hover:shadow-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <footer id="contact" className="bg-gradient-to-br from-cadetblue to-cadetdark text-white p-8 ">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg text-black" onClick={() => navigate(Contact)} >Contact Us</h3>
            <p>Fresh Stitch Service</p>
            <p>Email: FreshStitch.1010@gmail.com</p>
            <p>Phone: +91 790-5739-950</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-black">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/" target="blank" className="hover:text-yellow-400">Facebook</a>
              <a href="https://www.twitter.com" target="blank" className="hover:text-yellow-400">Twitter</a>
              <a href="https://www.instagram.com" target="blank" className="hover:text-yellow-400">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
