import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const [isOTPForm, setIsOTPForm] = useState(false);
  const navigate = useNavigate();

  const toggleSignUpForm = () => {
    setIsSignUpForm(!isSignUpForm);
  };

  const loginHandler = async () => {
    if (!email || !password) {
      // TODO: Add error handling
      return;
    }

    try {
      const res = await axios.post('api/login', { email, password });

      if (res.status === 200) {
        setIsOTPForm(true);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const registerHandler = async () => {
    console.log('1')
    if (!username || !email || !password) {
      // TODO: Add error handling
      return;
    }

    try {
      const res = await axios.post('api/register', {
        username,
        email,
        password,
      });

      if (res.status === 201) {
        setIsOTPForm(true);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const authHandler = () => {
    if (isSignUpForm) {
      registerHandler();
    } else {
      loginHandler();
    }
  };

  const otpVerificationHandler = async () => {
    if (!otp) {
      // TODO: Add error handling
      return;
    }

    const apiEndpoint = isSignUpForm ? 'api/verify-email' : 'api/login/otp-verify';
    try {
      const res = await axios.post(apiEndpoint, { email, otp });
      console.log(res);

      // res.data["access_token"]
    } catch (err) {
      console.log(err);
    }
  };

  useGSAP(() => {
    gsap.from(".login-form", {
      opacity:0,
      duration: 1,
      delay:0.75, 
    
    });
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="bg-black min-h-screen flex justify-center items-center">
        <form
            className="bg-black login-form text-white bg-opacity-50 hover:bg-opacity-100 rounded-3xl absolute p-12 w-4/12 mx-auto -mt-28 right-0 left-0 border border-white hover:border-pink-500 transition-colors duration-600 ease-in-out"
          onSubmit={(e) => e.preventDefault()}
        >
          {isOTPForm ? (
            <>
              <h1 className="font-bold text-3xl py-4">Enter OTP</h1>
              <input
                type="text"
                placeholder="Enter OTP"
                className="p-4 my-2 font-bold w-full bg-gray-700 hover:border-white bg-opacity-80 text-white"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className="p-4 my-6 text-black font-bold bg-gray-200 hover:bg-gray-500 hover:text-white" onClick={() => {
                  otpVerificationHandler();
                  navigate('/chatbot');
                }}

              >
                Submit
              </button>
            </>
          ) : (
            <>
            <h1 className="font-extrabold text-4xl py-4 bg-gradient-to-l from-custom1 to-custom2 text-transparent bg-clip-text">{isSignUpForm ? "Sign Up" : "Sign In"}</h1>
            <p className="p-4 text-gray-300 hover:text-white cursor-pointer" onClick={toggleSignUpForm}>
              {isSignUpForm ? "Already a user? Sign In now." : "New to INQUIRA? Sign up now."}
            </p>

              {isSignUpForm && (
                <input
                  type="text"
                  placeholder="Name"
                  className="p-4 my-2 font-bold w-full bg-gray-700 hover:border-white bg-opacity-80 text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}

              <input
                type="email"
                placeholder="E-mail"
                className="p-4 my-2 font-bold w-full bg-gray-700 bg-opacity-80 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Enter Password"
                className="p-4 my-2 font-bold w-full bg-gray-700 hover:border-white bg-opacity-80 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
              className="p-4 my-6 w-full font-bold rounded-xl bg-gradient-to-r from-custom1 to-custom2 hover:bg-gradient-to-l from-custom1 to-custom2 text-white text-lg py-3 px-8 mt-3 transition duration-300 ease-in-out hover:text-white hover:border-white border border-transparent"
              onClick={authHandler}
              >
                {isSignUpForm ? "Sign Up" : "Sign In"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
