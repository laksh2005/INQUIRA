import React, { useState } from 'react'
import Header from './Header';

const Login = () => {

  const [isSignUpForm, setIsSignUpForm] = useState(true);

  const toggleSignUpForm = () => {
    setIsSignUpForm(!isSignUpForm);
  }

  return (
    <div>
      <div>
      <Header />
    </div>

    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
    <form
      className="bg-black text-white rounded-lg bg-opacity-65 absolute p-12 w-4/12 mx-auto mt-[0] right-0 left-0"
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="font-bold text-3xl py-4 bg-gradient-to-l from-custom1 to-custom2 text-transparent bg-clip-text">{isSignUpForm ? "Sign Up" : "Sign In"}</h1>
      <p className="p-4 text-gray-300 hover:text-white cursor-pointer" onClick={toggleSignUpForm}>
        {isSignUpForm ? "Already a user? Sign In now." : "New to GAIL Bot? Sign up now."}
      </p>
      
      {isSignUpForm && (
        <input
          type="text"
          placeholder="Name"
          className="p-4 my-2 font-bold w-full bg-gray-700 hover:border-white bg-opacity-80 text-white"
        />
      )}
      
      <input
        type="text"
        placeholder="E-mail"
        className="p-4 my-2 font-bold w-full bg-gray-700 bg-opacity-80 text-white"
      />

      {isSignUpForm && (
        <input
          type="text"
          placeholder="Enter Phone Number"
          className="p-4 my-2 font-bold w-full bg-gray-700 hover:border-white bg-opacity-80 text-white"
        />
      )}
      
      <input
        type="password"
        placeholder="Enter Password"
        className="p-4 my-2 font-bold w-full bg-gray-700 hover:border-white bg-opacity-80 text-white"
      />
      
      <button
        className="p-4 my-6 text-black font-bold bg-gradient-to-r from-custom1 to-custom2 hover:bg-gradient-to-l from-custom1 to-custom2 text-white text-lg py-3 px-8 mt-3 transition duration-300 ease-in-out hover:text-white hover:border-white border border-transparent w-full"
      >
        {isSignUpForm ? "Sign Up" : "Sign In"}
      </button>
      
    </form>
  </div>
  </div>
  )
}

export default Login