import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ContactUs = () => {

  const [submitMsg, setsubmitMsg] = useState(false);

  const toggleMsgSubmission = () => {
    setsubmitMsg(!setsubmitMsg);
  }

  useGSAP(() => {
    gsap.from(".title", {
      opacity:0,
      duration: 1,
      delay:0.25, 
    });
  }, []);

  return (
<div>
  <Header />
  <div className="flex justify-center items-center min-h-screen relative bg-black">
    <div className="bg-black absolute inset-0 z-10 opacity-80"></div>

    <div className="relative border border-white hover:border-custom1 rounded-2xl transition-colors duration-600 ease-in-out z-20 -mt-40 p-20 mx-auto w-4/12 max-w-lg bg-black bg-opacity-70">
      <h1 className="title text-5xl font-extrabold text-center mb-6">
        <span className="font-bold bg-gradient-to-b from-custom1 to-custom2 text-transparent bg-clip-text">
          Contact Us
        </span> 📨
      </h1>
      <form className="flex flex-col">
        <input
          type="text"
          className="transform transition-transform duration-300 hover:-translate-y-1 bg-gray-800 font-semibold text-white p-2 mb-6 rounded"
          placeholder="Name"
        />
        <input
          type="text"
          className="transform transition-transform duration-300 hover:-translate-y-1 bg-gray-800 font-semibold text-white p-2 mb-6 rounded"
          placeholder="Message"
        />
        <button
          onClick={toggleMsgSubmission}
          className="border border-black font-semibold text-white bg-gradient-to-r from-custom1 to-custom2 transition duration-300 ease-in-out hover:bg-gradient-to-l from-custom1 to-custom2 p-2 rounded-lg"
        >
          Submit
        </button>
        {submitMsg && (
          <p className="p-4 font-bold text-xl text-green-300">
            Message recorded! Our Team will contact you through Mail soon
          </p>
        )}
      </form>
    </div>
  </div>
  <Footer />
</div>
  )
}

export default ContactUs