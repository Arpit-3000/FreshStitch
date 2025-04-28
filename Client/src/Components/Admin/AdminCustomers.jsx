import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Loader from "../Loader/Loader";

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/orders/place-order")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
        setLoading(false);
      });
  }, []);

  const sendEmail = (email) => {
    const subject = "Exclusive Offer: Thank You for Choosing [Your Company]";
    const body = `Dear Valued Customer,

We appreciate your trust in [Your Company]. We strive to provide the best service for your laundry and tailoring needs.

If you have any feedback or special requests, feel free to reach out.

Best Regards,  
[Your Company Name]  
[Your Contact Info]`;

    // Gmail compose URL with prefilled details
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(gmailComposeUrl, "_blank");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-6 overflow-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-700 font-serif">All Customers</h2>

        {loading ? (
        <Loader/>
        ) : customers.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No Customers Found</p>
        ) : (
          <div className="border p-4 rounded-lg shadow-md bg-white max-h-[620px] overflow-x-auto">
            <table className="w-full border-collapse table-auto">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="p-3">S.No</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Address</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {customers.map((customer, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{customer.contactName}</td>
                    <td className="py-3 px-4">{customer.email}</td>
                    <td className="py-3 px-4">{customer.mobileNumber}</td>
                    <td className="py-3 px-4">{customer.address}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        className="px-4 py-2 bg-gradient-to-r from-cadetblue to-cadetdark text-white rounded-md hover:opacity-80 transition"
                        onClick={() => sendEmail(customer.email)}
                      >
                        Send Email
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersTable;
