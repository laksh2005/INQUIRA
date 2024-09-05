import React from 'react'
import Header from './Header'

const ContactUs = () => {
  return (
    <div>
      <Header />
      <div className="bg-gradient-to-l from-black to-gray-600 flex justify-between relative min-h-screen">
        <div className="bg-gradient-to-l from-black to-gray-600 absolute inset-0 z-10"></div>

        <div className="relative z-20 mt-40 p-12 ml-[40px]">
          <h1 className="font-bold text-white text-5xl p-4 m-4">Contact Us 📨</h1>
          <form>
            <input
              type="text"
              className="border border-black bg-opacity-30 hover:bg-opacity-100 font-semibold text-black bg-violet-100 p-2 m-7"
              placeholder="Name"
            />
            <input
              type="text"
              className="border border-black bg-opacity-30 hover:bg-opacity-100 font-semibold text-black bg-violet-100 p-2 m-7"
              placeholder="Message"
            />
            <button className="border border-black font-semibold text-black bg-gray-200 hover:bg-green-300 p-2 m-10 rounded-lg">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default ContactUs