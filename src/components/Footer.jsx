import React from "react";
import { useState } from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail('');
    setSub('')
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        console.log('Email subscribed successfully!');
      } else {
        console.error('Error subscribing to email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
};
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="bg-black text-white py-10">
      <div className="container mx-auto px-8 py-10 flex flex-wrap justify-between items-start p-2 border-t border-t-gray-100">
        <div className="w-full md:w-1/4 mb-6">
          <h2 className="font-bold text-xl mb-4">INQUIRA</h2>
          <p className="text-gray-400 text-lg">
            Empowering Public Sector Efficiency with AI
          </p>
        </div>

        <div className="w-full md:w-1/4 mb-6">
          <h3 className="font-bold text-lg mb-4">Go Through</h3>
          <ul>
            <li className="mb-2">
              <a className="text-gray-400 hover:text-white">
                <Link to="/explore">Explore</Link>
              </a>
            </li>
            <li className="mb-2">
              <a className="text-gray-400 hover:text-white">
                <Link to="/guide">Guide</Link>
              </a>
            </li>
            <li className="mb-2">
              <a className="text-gray-400 hover:text-white">
                <Link to="/contactus">Contact Us</Link>
              </a>
            </li>
            <li className="mb-2">
              <a className="text-gray-400 hover:text-white">
                <Link to="/collab">Collaborators</Link>
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-6">
          <h3 className="font-bold text-lg mb-4">Get in touch</h3>
          <form onSubmit={handleSubmit} className="flex mt-6">
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={handleEmailChange}
              className="p-2 rounded-l-lg w-full text-white bg-gray-900 hover:border border-white"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-custom1 to-custom2 text-black font-bold px-4 py-2 rounded-r-lg"
            >
              Subscribe
            </button>
          </form>

               
          {sub && (
            <div className="mt-4 text-sm text-center text-white">
              {sub}
            </div>
          )}
          
          {/* <form className="flex mt-6">
            <input
              type="email"
              placeholder="Enter email address"
              className="p-2 rounded-l-lg w-full text-white bg-gray-900 hover:border border-white"
            />
            <button className="bg-gradient-to-r from-custom1 to-custom2 text-black font-bold px-4 py-2 rounded-r-lg">
              Subscribe
            </button>
          </form> */}
        </div>
      </div>

      <div className="text-center text-gray-500 mt-4">
        ©2024 INQUIRA, All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
