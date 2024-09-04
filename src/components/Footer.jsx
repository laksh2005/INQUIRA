import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
<div className="bg-gray-900 text-white py-10">
  <div className="container mx-auto px-8 flex flex-wrap justify-between items-start">

    <div className="w-full md:w-1/4 mb-6">
      <h2 className="font-bold text-xl mb-4">GAIL Bot</h2>
      <p className="text-gray-400 text-lg">Empowering Public Sector Efficiency with AI</p>
    </div>



    <div className="w-full md:w-1/4 mb-6">
      <h3 className="font-bold text-lg mb-4">Go Through</h3>
      <ul>
        <li className="mb-2"><a className="text-gray-400 hover:text-white"><Link to="/info">Info</Link></a></li>
        <li className="mb-2"><a className="text-gray-400 hover:text-white"><Link to="/guide">Guide</Link></a></li>
        <li className="mb-2"><a className="text-gray-400 hover:text-white"><Link to="/contactus">Contact Us</Link></a></li>
        <li className="mb-2"><a className="text-gray-400 hover:text-white"><Link to="/aboutus">About Us</Link></a></li>
      </ul>
    </div>

    <div className="w-full md:w-1/4 mb-6">
      <h3 className="font-bold text-lg mb-4">Get in touch</h3>
      <form className="flex mt-6">
        <input 
          type="email" 
          placeholder="Enter email address" 
          className="p-2 rounded-l-lg w-full text-white bg-black hover:border border-white"
        />
        <button className="bg-white hover:bg- text-black font-bold px-4 py-2 rounded-r-lg">Subscribe</button>
      </form>
    </div>
  </div>
  
  <div className="text-center text-gray-500 mt-10">
      ©2024 GAIL Bot, All rights reserved.
  </div>
</div>
  )
}

export default Footer