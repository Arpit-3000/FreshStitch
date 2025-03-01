import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './NavBar.css';
import account from './account-png.png';
import logo from './Logo.png';
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [showDropdown, setShowDropdown] = useState(false); // Account dropdown visibility
  const [showServicesDropdown, setShowServicesDropdown] = useState(false); // Services dropdown visibility
  const navigate = useNavigate();
  const location = useLocation(); // React Router's location hook

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAccountDropdownToggle = () => {
    setShowDropdown((prevState) => !prevState); // Toggle account dropdown visibility
  };

  const handleServicesDropdownToggle = () => {
    setShowServicesDropdown((prevState) => !prevState); // Toggle services dropdown visibility
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.clear();
 
      // localStorage.clear();
      // window.location.reload();// Remove the token on logout
    setIsLoggedIn(false); // Update login state
    setShowDropdown(false); // Close account dropdown
    setShowServicesDropdown(false);

    navigate('/');
    toast.error('You are logged out!', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: true,
    }); // Close services dropdown // Redirect to login page
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // localStorage.setItem("isLoggedIn", "true");
      // window.location.reload();
      setIsLoggedIn(true);
      toast.success('You are logged in successfully!', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };
 
 

  // Scroll to section when hash changes
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get the Navbar height
        const elementPosition = element.offsetTop; // Get the element's position from the top
        const offsetPosition = elementPosition - navbarHeight; // Adjust for Navbar height
  
        // Scroll with a smooth animation
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [location]);
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo flex">
        <Link to="/">
          <img src={logo} alt="Logo" style={{ display: 'block' }} />
        </Link>
        <Link to="/">Fresh Stitch</Link>
      </div>

      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        {/* Services Dropdown Button */}
        <div className="services-section">
          <button
            className="services-button"
            onClick={handleServicesDropdownToggle} // Toggle dropdown on click
          >
            Services
          </button>
          {showServicesDropdown && (
            <div className="services-dropdown-menu">
              <Link
                to="/services#laundry-services"
                className="dropdown-item"
                onClick={() => setShowServicesDropdown(false)} // Close dropdown on click
              >
                Laundry Services
              </Link>
              <Link
                to="/services#tailoring-services"
                className="dropdown-item"
                onClick={() => setShowServicesDropdown(false)} // Close dropdown on click
              >
                Tailoring Services
              </Link>
            </div>
          )}
        </div>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="#">Dashboard</Link>
        <Link to="/cart">Bag</Link>

        <div className="account-section">
          <img
            src={account}
            alt="Account"
            className="account-icon"
            onClick={handleAccountDropdownToggle} // Toggle account dropdown on click
          />
          {showDropdown && (
            <div className="dropdown-menu">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    className="logout-btn dropdown-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/LoginPage"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/RegisterPage"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
