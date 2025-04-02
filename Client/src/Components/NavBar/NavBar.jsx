import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { deleteUser } from "firebase/auth";
import './NavBar.css';
import account from './account-png.png';
import logo from './Logo.png';
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';
import { auth} from "../../../firebase";
import { signOut, setPersistence, browserSessionPersistence } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
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


  const handleLogout = async () => {
      try {
          // Firebase logout
          await signOut(auth);
  
          // Ensure no auto-login on next visit
          await setPersistence(auth, browserSessionPersistence);  // Session will not persist
  
          // Clear local/session storage
          localStorage.removeItem("token");
          sessionStorage.clear();
  
          // Reset user state
          setUser(null);
          setIsLoggedIn(false);
  
          toast.success("Logged out successfully!", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: true,
          });
          
          setTimeout(() => {
            navigate('/');
            window.location.reload();
            window.location.href = "/";
              }, 2000);
  
      } catch (error) {
          console.error("Logout error:", error);
          toast.error("Logout failed, please try again.", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: true,
          });
      }
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
