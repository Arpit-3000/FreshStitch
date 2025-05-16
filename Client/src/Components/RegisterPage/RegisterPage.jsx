import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import google from './sign-in-google.png';
import facebook from './sign-in-fb.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, provider, signInWithPopup } from "../../../firebase";


function RegisterForm({ toggleform }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Handle input changes
    const handleOnChangeUsername = (event) => setUsername(event.target.value);
    const handleOnChangePassword = (event) => setPassword(event.target.value);
    const handleOnChangeEmail = (event) => setEmail(event.target.value);

    // Handle form submission
    // const handleSubmit = async (event) => {
    //     event.preventDefault(); // Prevent default form behavior

    //     // Clear previous messages
    //     setErrorMessage('');
    //     setSuccessMessage('');

    //     // Validate inputs
    //     if (!username || !password || !email) {
    //         setErrorMessage(' All feilds  are required!');
    //         return;
    //     }

    //     // Send registration request to backend
    //     try {
    //         const response = await fetch('http://localhost:3000/register', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 username,
    //                 email,
    //                 password,
    //             }),
    //         });

    //         const data = await response.json();

    //         if (response.status === 201) {
    //             // Successful registration
    //             setSuccessMessage('User registered successfully!');
    //             setUsername('');
    //             setEmail('');
    //             setPassword('');
    //         } else {
    //             // Display error message
    //             setErrorMessage(data.message || 'Something went wrong!');
    //         }
    //     } catch (error) {
    //         console.error('Error registering user:', error);
    //         setErrorMessage('Server error! Please try again later.');
    //     }
    // };

       // Google Sign-In
       const handleGoogleLogin = async () => {
        try {
            provider.setCustomParameters({
                prompt: "select_account",
            });
    
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
    
            console.log("Google User:", user);
    
            // Save user details in localStorage
            localStorage.setItem("token", user.uid);
            setUser(user);
    
            // Send user data to backend
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user.displayName,
                    email: user.email,
                    uid: user.uid,
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                toast.success(`Welcome ${user.displayName}!`, {
                    position: 'bottom-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                });
                navigate('/');
                window.location.reload();
            } else {
                toast.error(`Failed to register: ${data.message}`, {
                    position: 'bottom-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            toast.error('Google Sign-in failed', {
                position: 'bottom-center',
                autoClose: 2000,
                hideProgressBar: true,
            });
            console.error("Google Login Error:", error);
        }
    };
    


    // Navigate to login page
    const goToSignIn = () => {
        navigate('/LoginPage');
    };

    return (
        <div className="mainn">
            <div className="register-page-main">
                <form className="form-page-register">
                    <p className="Sign-in-heading-register">Sign up</p>
                    <h1 className="text-3xl font-bold">This page isn't working, please sign-in with google in Login/sign section</h1>
                    <br/>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleOnChangeEmail}
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleOnChangePassword}
                    />
                    <br />
                    <button className="sign-up-btn-register" type="submit">
                        Sign up
                    </button>

                    <br />
                    <div className="sign-in-other-option">
                        <img
                            src={google}
                            className="google-sign-in"
                            alt="Google"
                            onClick={handleGoogleLogin}
                        />
                        <img
                            src={facebook}
                            className="facebook-sign-in"
                            alt="Facebook"
                        />
                    </div>
                    <br />
                    {successMessage && (
                        <p className="success-message">{successMessage}</p>
                    )}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
            </div>
            <div className="form-container-side">
                <p className="tagline-register">
                    Your Laundry, Our Priority!
                    <div className="register-title">
                        <p>One of us?</p>
                        <p className="welcome-msg">
                            Welcome to Laundry-Wallah! From crisp, clean laundry
                            to perfectly tailored outfits, we’ve got all your
                            wardrobe needs covered.
                        </p>
                        <button
                            className="Sign-in-btn-register"
                            onClick={goToSignIn}
                        >
                            Sign in
                        </button>
                    </div>
                </p>
            </div>
        </div>
    );
}

export default RegisterForm;
