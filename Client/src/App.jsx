import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Components/NavBar/NavBar.jsx';
import Chatbot from './Components/Chatbot.jsx';
import Home from './Components/Home/Home.jsx';
import Services from './Components/Services/Services.jsx';
import WashAndFoldDetails from './Components/Services/WashAndFold.jsx';
import WashAndIronDetails from './Components/Services/WashAndIron.jsx';
import IronAndFoldDetails from './Components/Services/IronAndFold.jsx';
import DryCleaningDetails from './Components/Services/DryCleaning.jsx';
import SewingDetails from './Components/Services/Sewing.jsx';
import LoginForm from './Components/LoginPage/LoginPage.jsx';
import RegisterForm from './Components/RegisterPage/RegisterPage.jsx';
import AnimatedRoute from './Components/Animations Routing/AnimatedRoute.jsx';
import AnimatedRoute2 from './Components/Animations Routing/AnimatedRoute2.jsx';
import './App.css';
import './index.css';
import Contact from './Components/Contact/Contact.jsx';
import BagSection from './Components/Bag Section/Bag.jsx';
import AboutUs from './Components/About/About.jsx';
import { ToastContainer } from 'react-toastify';
import OrderHistory from './Components/Bag Section/orderhistory.jsx';
import Lehenga from './Components/Services/Lehenga.jsx';
import Stitching from './Components/Services/Stitching.jsx';
import Jumpsuit from './Components/Services/Jumpsuit.jsx';
import SalwarSuit from './Components/Services/SalwarSuit.jsx';
import Profile from './Components/Profile.jsx';
import AdminLogin from './Components/Admin/AdminLogin.jsx';
import AdminDashboard from './Components/Admin/AdminDashboard.jsx';
import Products from './Components/Admin/Products.jsx';
import AdminOrders from './Components/Admin/AdminOrders.jsx';
import AdminCustomers from './Components/Admin/AdminCustomers.jsx';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (

    <AnimatePresence mode="wait">
      <ToastContainer />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/cart" element={<BagSection />} />
        <Route path="/orderhistory" element={<OrderHistory/>}/>
        <Route path="/Signin" element={<LoginForm />} />
        <Route path="/services" element={<Services />} />
        <Route path="/wash-and-fold" element={<WashAndFoldDetails />} />
        <Route path="/wash-and-iron" element={<WashAndIronDetails />} />
        <Route path="/iron-and-fold" element={<IronAndFoldDetails />} />
        <Route path="/Dry-Cleaning" element={<DryCleaningDetails />} />
        <Route path="/sewing" element={<SewingDetails />} />
        <Route path="/stitching" element={<Stitching />} />
        <Route path="/lehenga" element={<Lehenga />} />
        <Route path="/jumpsuit" element={<Jumpsuit />} />
        <Route path="/Salwarsuit" element={<SalwarSuit/>}/>
        <Route path="/RegisterPage" element={<AnimatedRoute><RegisterForm /></AnimatedRoute>} />
        <Route path="/LoginPage" element={<AnimatedRoute2><LoginForm /></AnimatedRoute2>} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-products" element={<Products/>}/>
        <Route path="/admin-orders" element={<AdminOrders/>}/>
        <Route path="/admin-customers" element={<AdminCustomers/>}/>
      </Routes>

    </AnimatePresence>
  );
};

const App = () => {
  return (

    <Router>
      <Navbar />
      <Chatbot/>
      <AnimatedRoutes />
    </Router>

  );
};

export default App;


