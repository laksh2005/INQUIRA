import React, { useState } from 'react'
import Header from './Header';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpForm, setIsSignUpForm] = useState(false);

  const toggleSignUpForm = () => {
    setIsSignUpForm(!isSignUpForm);
  }

  const loginHandler = async () => {
    if (!email || !password) {
      // TODO: Add error handling
    }

    try {
      const res = await axios.post(
        'api/login', {
          email,
          password
        }
      )
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const registerHandler = async () => {
    if (!username || !email || !password) {
      // TODO: Add error handling
    }

    try {
      const res = await axios.post(
        'api/register', {
          username,
          email,
          password
        }
      )
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const authHandler = () => {
    if (isSignUpForm) {
      registerHandler()
    } else {
      loginHandler()
    }
  }

  return (
    <div>
      <div>
      <Header />
    </div>

    <div className="bg-gradient-to-br  from-black to-gray-600 min-h-screen flex justify-center items-center">
    <form
      className="bg-gradient-to-tl  from-black to-gray-600 text-white rounded-lg bg-opacity-65 absolute p-12 w-4/12 mx-auto mt-[0] right-0 left-0"
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="font-bold text-3xl py-4">{isSignUpForm ? "Sign Up" : "Sign In"}</h1>
      <p className="p-4 text-gray-300 hover:text-white cursor-pointer" onClick={toggleSignUpForm}>
        {isSignUpForm ? "Already a user? Sign In now." : "New to GAIL Bot? Sign up now."}
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
        className="p-4 my-6 text-black font-bold bg-gray-200 hover:bg-gray-500 hover:text-white w-full rounded-lg hover:cursor-pointer"
        onClick={authHandler}
      >
        {isSignUpForm ? "Sign Up" : "Sign In"}
      </button>
      
    </form>
  </div>
  </div>
  )
}

export default Login