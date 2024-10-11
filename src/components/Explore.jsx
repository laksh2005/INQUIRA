import React, { useEffect } from 'react';
import Header from './Header';
import Footer from "./Footer";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function breakTheText() {
  const h1 = document.querySelector("h1");
  if (h1) {
    const h1Text = h1.textContent;
    const splittedText = h1Text.split("");
    const halfValue = Math.floor(splittedText.length / 2);
    let clutter = "";

    splittedText.forEach((elem, index) => {
      clutter += `<span class="${index < halfValue ? 'a' : 'b'}">${elem}</span>`;
    });

    h1.innerHTML = clutter;
  }
}

const Info = () => {

  useEffect(() => {
    breakTheText();
  }, []);

  useGSAP(() => {
    gsap.to(".info-img", {
      y: 20,
      duration: 2, 
      repeat: -1, 
      yoyo: true, 
      ease: "power1.inOut", 
    });
  }, []);

  useGSAP(() => {
    gsap.from(".text-container", {
      opacity: 0,
      duration: 1,
      delay: 0.5, 
      y: -20,
      ease: "power1.out"
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans">
      <Header />
      <div className="flex whole">
        <div className="flex container mx-auto pt-6 pl-6 pb-6 max-w-5xl ml-20 items-center">
          <div className=" flex-1 mr-10 text-container">
            <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-custom1 to-custom2 text-transparent bg-clip-text mb-8">
            Explore the One-Stop Solution to HR & IT Queries
            </h1>
            <div>
            <p className='text-bold text-lg'>Welcome to our innovative chatbot project! Our goal is to develop a sophisticated chatbot leveraging deep learning and natural language processing (NLP) techniques. This chatbot is designed to efficiently address and respond to a wide range of queries from employees in a large public sector organization. Here’s what makes our chatbot stand out:</p>
           
           <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-white to-custom2 mb-8 mt-7">
           Key Features:
           </h2>

           <ul className="list-disc text-lg list-inside mb-8 space-y-5">
             <li className="mb-4">
             Comprehensive Query Handling: Capable of addressing diverse questions related to HR policies, IT support, company events, and other organizational matters. It utilizes publicly available sample information to provide accurate responses.

             </li>
             <li className="mb-4">
             Document Processing Capabilities: Equipped to analyze and extract information from documents uploaded by employees. The chatbot can summarize documents or extract key text and keyword information relevant to organizational needs. (Demonstration uses an 8 to 10-page sample document.)
             </li>
             <li className="mb-4">
             Scalability and Performance: Designed to handle at least 5 users simultaneously with optimized response times. Queries are answered within 5 seconds, barring any technical issues such as connectivity problems.
             </li>
             <li className="mb-4">
             Enhanced Security: Implements 2-Factor Authentication (2FA) via email to bolster the security of user interactions.

             </li>
             <li className="mb-4">
             Content Filtering: Features a built-in system to filter inappropriate language based on a maintained dictionary, ensuring a professional and respectful communication environment.

             </li>
           
           </ul>

           <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-white to-custom1 mb-8">
           Technology and Resources:
           </h2>

           <ul className="list-disc list-inside text-lg mb-4 space-y-5">
             <p className="mb-2">
             This project utilizes advanced deep learning and NLP techniques, relying on open-source tools and resources. Our team has utilized free and open-source resources to develop this solution.
             </p>
             <p className="mb-4">
             Join us in revolutionizing how organizational queries are handled with cutting-edge technology and robust security!
             </p>
           </ul>
        
            </div>

          </div>
        </div>
        <div className="flex-shrink-0 ml-auto flex items-center">
          <img
            src="chatbot.webp"
            alt="Chatbot"
            className="w-[500px] h-auto mr-10 mt-10 mb-10 rounded-[20px] info-img"
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Info