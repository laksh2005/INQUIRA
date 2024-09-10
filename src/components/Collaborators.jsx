import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Collaborators = () => {
  return (
    <div>
      <Header />
      <div className="bg-black font-sans min-h-screen z-10 space-y-10 ">

        <div className="relative z-20 p-10 mx-auto">
          <h1 className="text-5xl font-bold bg-gradient-to-b from-custom1 to-custom2 text-transparent bg-clip-text text-center p-4 mb-10">
            Collaborators
          </h1>

          <div className="text-center space-y-10 z-20 border border-white rounded-full p-14">
            <p className="text-2xl font-bold text-white"><span className='bg-custom1 font-extrabold text-transparent bg-clip-text'>Abhijeet Gupta :</span> Pre Final Year Engineering student, contributed in Backend Web Development</p>
            <p className="text-2xl font-bold text-white"><span className='bg-custom2 font-extrabold text-transparent bg-clip-text'>Chetna Madaan :</span> Pre Final Year Engineering student, aided in UI & Front End Web Development</p>
            <p className="text-2xl font-bold text-white"><span className='bg-custom1 font-extrabold text-transparent bg-clip-text'>Laksh Nijhawan :</span> Sophomore Engineering student, contributed in Front End Web Development & UI</p>
            <p className="text-2xl font-bold text-white"><span className='bg-custom2 font-extrabold text-transparent bg-clip-text'>Shubhra Narang :</span> Sophomore Engineering student, contributed in Front End Web Development & UI</p>
            <p className="text-2xl font-bold text-white"><span className='bg-custom2 font-extrabold text-transparent bg-clip-text'>Raghav Aggarwal :</span>Sophomore Engineering student, contributed in Backend Web Development</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default Collaborators