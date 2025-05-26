import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css'; 
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Components/NavBar/NavBar.jsx';
import Chatbot from './Components/Chatbot/Chatbot.jsx';
import Home from './Components/Home/Home.jsx';
import Services from './Components/Services/Services.jsx';
import WashAndFoldDetails from './Components/Services/Wash_Fold/WashAndFold.jsx';
import WashAndIronDetails from './Components/Services/Wash_Iron/WashAndIron.jsx';
import IronAndFoldDetails from './Components/Services/Iron_Fold/IronAndFold.jsx';
import DryCleaning from './Components/Services/Dry_Cleaning/DryCleaning.jsx';
import LoginForm from './Components/LoginPage/LoginPage.jsx';
import RegisterForm from './Components/RegisterPage/RegisterPage.jsx';
import Contact from './Components/Contact/Contact.jsx';
import BagSection from './Components/Bag Section/Bag.jsx';
import AboutUs from './Components/About/About.jsx';
import OrderHistory from './Components/Bag Section/orderhistory.jsx';
import Lehenga from './Components/Services/Stitching/Lehenga/Lehenga.jsx';
import Stitching from './Components/Services/Stitching/Stitching.jsx';
import Jumpsuit from './Components/Services/Stitching/Jumpsuit/Jumpsuit.jsx';
import SalwarSuit from './Components/Services/Stitching/Salwar_Suit/SalwarSuit.jsx';
import Shirt from './Components/Services/Stitching/Shirt_Mens/Shirt.jsx';
import MyOrders from './Components/MyOrders/MyOrders.jsx';
import AdminLogin from './Components/Admin/AdminLogin.jsx';
import AdminDashboard from './Components/Admin/AdminDashboard.jsx';
import Products from './Components/Admin/Products.jsx';
import AdminOrders from './Components/Admin/AdminOrders.jsx';
import AdminCustomers from './Components/Admin/AdminCustomers.jsx';
import AdminRegistration from './Components/Admin/AdminRegistration.jsx';



const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
     <div className="max-w-screen overflow-x-hidden">
      {/* Toast messages */}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
      />
      {/* Show Navbar & Chatbot only on client routes */}
      {!isAdminRoute && <Navbar />}
      

      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<Home />} />
       
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/cart" element={<BagSection />} />
        
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/Signin" element={<LoginForm />} />
        <Route path="/services" element={<Services />} />
        <Route path="/wash-and-fold" element={<WashAndFoldDetails />} />
        <Route path="/wash-and-iron" element={<WashAndIronDetails />} />
        <Route path="/iron-and-fold" element={<IronAndFoldDetails />} />
        <Route path="/dry-cleaning" element={<DryCleaning />} />
        
        <Route path="/stitching" element={<Stitching />} />
        <Route path="/lehenga" element={<Lehenga />} />
        <Route path="/jumpsuit" element={<Jumpsuit />} />
        <Route path="/Salwarsuit" element={<SalwarSuit />} />
        <Route path="/shirt" element={<Shirt/>}/>
        <Route path="/RegisterPage" element={<RegisterForm />} />
        <Route path="/LoginPage" element={<LoginForm />} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-products" element={<Products />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
        <Route path="/admin-customers" element={<AdminCustomers />} />
        <Route path="/admin-registration" element={<AdminRegistration />} />
        {/* <Route path="/admin-customers" element={<AdminCustomers />} /> */}
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
