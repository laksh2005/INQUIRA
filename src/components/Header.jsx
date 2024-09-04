import { Link } from "react-router-dom"
import {LOGO_URL } from "../utils/constants"

const Header = () => {
  return (
  <div className="bg-gradient-to-l from-gray-500 to-black flex justify-between m-0 z-30 relative">
    <div className="logocontainer">
      <img 
       src={LOGO_URL}
       className="w-36 p-1"
       />
    </div>
    <div className="flex items-center">
      <ul className="flex p-4 m-4 space-x-4">
        <li className="flex items-center justify-center px-4 text-white font-bold hover:bg-white hover:text-black rounded-lg"><Link to='/'>Home</Link></li>
        <li className="flex items-center justify-center px-4 text-white font-bold hover:bg-white hover:text-black rounded-lg">GAIL Bot</li>
        <li className="flex items-center justify-center px-4 text-white font-bold hover:bg-white hover:text-black rounded-lg"><Link to='/guide'>Guide</Link></li>
        <li className="flex items-center justify-center px-4 text-white font-bold hover:bg-white hover:text-black rounded-lg"><Link to='/info'>Info</Link></li>
        <li className="flex items-center justify-center px-4 text-white font-bold hover:bg-white hover:text-black rounded-lg"><Link to='/aboutus'>About Us</Link></li>
        <li className="flex items-center justify-center px-4 text-white font-bold hover:bg-white hover:text-black rounded-lg"><Link to='/contactus'>Contact Us</Link></li>
        <li className="items-center justify-center"><button className="px-8 rounded-lg font-bold text-white hover:text-black hover:bg-red-500">Sign Up</button></li>
      </ul>
    </div>
  </div>
  )
}

export default Header