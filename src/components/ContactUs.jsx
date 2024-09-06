import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'

const ContactUs = () => {

  const [submitMsg, setsubmitMsg] = useState(false);

  const toggleMsgSubmission = () => {
    setsubmitMsg(!setsubmitMsg);
  }

  return (
    <div>
      <Header />
      <div className="bg-black flex justify-between relative min-h-screen">
        <div className="bg-gradient-to-b from-black to-custom2 absolute inset-0 z-10"></div>

        <div className="relative z-20 mt-12 p-12 mx-auto opacity-100 hover:opacity-100 bg-gradient-to-b from-black to-custom2">
          <h1 className="text-5xl font-bold text-center p-4 m-4"><span className="font-bold bg-gradient-to-b from-custom1 to-custom2 text-transparent bg-clip-text">Contact Us</span>📨</h1>
          <form>
            <input
              type="text"
              className=" bg-opacity-30 hover:bg-opacity-100 font-semibold text-white bg-violet-100 p-2 m-7  transition duration-300 ease-in-out"
              placeholder="Name"
            />

            <input
              type="text"
              className=" bg-opacity-30 hover:bg-opacity-100 font-semibold text-white bg-violet-100 p-2 m-7  transition duration-300 ease-in-out"
              placeholder="Message"
            />

            <button 
            onClick={toggleMsgSubmission}
            className="border border-black font-semibold text-white bg-gradient-to-r from-custom1 to-custom2  transition duration-300 ease-in-out hover:bg-gradient-to-l from-custom1 to-custom2 p-2 m-10 rounded-lg">
              Submit
            </button>

            {submitMsg &&(
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