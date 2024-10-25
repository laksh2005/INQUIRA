import { Link, useNavigate } from "react-router-dom"
import {LOGO_URL } from "../utils/constants"
import { useState } from "react"

const Header = () => {

  const navigate = useNavigate();
  const[isSignUpForm, setIsSignUpForm] = useState(false);

  const toggleSignUpForm=()=>{
    setIsSignUpForm(!isSignUpForm);
  }

  return (
    <div className="bg-black flex justify-between m-0 z-30 relative">
      <div className="logocontainer pl-6">
          <img 
            onClick={()=>navigate('/')}
            src= "inquiralogo.jpg"
            className="w-44 p-2 ml-[40px]" 
          />
      </div>

      <div className="flex items-center font-sans">
        <ul className="flex p-4 m-4 space-x-8 items-center justify-center">
          <li className="px-4 text-white font-bold hover:bg-gradient-to-r from-custom1 to-custom2 hover:text-black rounded-full transition duration-300 ease-in-out"><Link to='/'>Home</Link></li>
          <li className="px-4 text-white font-bold hover:bg-gradient-to-r from-custom1 to-custom2 hover:text-black rounded-full transition duration-300 ease-in-out"><Link to='/chatbot'>INQUIRA Bot</Link></li>
          <li className="px-4 text-white font-bold hover:bg-gradient-to-r from-custom1 to-custom2 hover:text-black rounded-full transition duration-300 ease-in-out"><Link to='/guide'>Guide</Link></li>
          <li className="px-4 text-white font-bold hover:bg-gradient-to-r from-custom1 to-custom2 hover:text-black rounded-full transition duration-300 ease-in-out"><Link to='/explore'>Explore</Link></li>
        </ul>
      </div>
    
      <div className="flex items-center space-x-4 pr-6">
        <button className="px-4 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-300 transition duration-300 ease-in-out">
          <Link to="/contactus">Contact Us</Link>
        </button>

         {!isSignUpForm && (
        <div 
          className="px-4 py-2 rounded-full text-white bg-gradient-to-r from-custom1 to-custom2 hover:bg-gradient-to-l from-custom1 to-custom2 font-bold transition duration-300 ease-in-out"
          onClick={toggleSignUpForm}>
          <Link to='/login'>Sign Up</Link>
        </div>
        )}  

      </div>
    </div>
  )
}

export default Header
