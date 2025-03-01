import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import google from './sign-in-google.png';
import facebook from './sign-in-fb.png';
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';

function LoginForm({ toggleform }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleOnChangeUsername = (event) => setUsername(event.target.value);
    const handleOnChangePassword = (event) => setPassword(event.target.value);

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            toast.error('Please enter your credentials', {
                position: 'bottom-center',
                autoClose: 2000,
                hideProgressBar: true,
            });
            return;
        }

        console.log("Sending login data:", { username, password });

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
                localStorage.setItem("token", data.token);

                toast.success('You are logged in successfully!', {
                    position: 'bottom-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                });
               

                navigate('/'); // Redirect to home page
                window.location.reload();
            } else {
                const errorData = await response.text();
                toast.error(errorData || 'Invalid username or password', {
                    position: 'bottom-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                });
                console.log("Login failed response:", errorData);
            }
        } catch (error) {
            toast.error('Server error, please try again later', {
                position: 'bottom-center',
                autoClose: 2000,
                hideProgressBar: true,
            });
            console.error('Error during login:', error);
        }
    };

    const goToSignUp = () => {
        navigate('/RegisterPage');
    };

    return (
        <div className='mainn'>
            <ToastContainer /> {/* Ensure this is present to render toasts */}
            <div className='register-page'>
                <p className='tagline'>
                    Your Laundry, Our Priority!
                    <div className='register-title'>
                        <p>New here?</p>
                        <p className='welcome-msg'>
                            Welcome to Laundry-Wallah! From crisp, clean laundry to perfectly tailored outfits, we’ve got all your wardrobe needs covered.
                        </p>
                        <button className='Sign-up-btn' onClick={goToSignUp}>Sign Up</button>
                    </div>
                </p>
            </div>
            <div className='form-container'>
                <form className='form-page' onSubmit={handleLogin}>
                    <p className='Sign-in-heading'>Sign in</p>
                    <input
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={handleOnChangeUsername}
                    />
                    <br />
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={handleOnChangePassword}
                    />
                    <br />
                    <button type="submit" className='sign-in-btn'>Sign in</button>
                    <p className='password-forgot'>Forgot your password?</p>
                    <br />
                    <div className='sign-in-other-option'>
                        <img src={google} className='google-sign-in' alt="Google" />
                        <img src={facebook} className='facebook-sign-in' alt="Facebook" />
                    </div>
                    <br />
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
