import React from 'react'
import Header from './Header'
import Footer from "./Footer";
import Card from './Card';


const Info = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans">
      <Header />
      <div className="flex whole">
        <div className="flex container mx-auto pt-6 pl-6 pb-6 max-w-4xl ml-20 items-center">
          <div className="flex-1 mr-10">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-custom1 to-custom2 text-transparent bg-clip-text mb-8">
            About the Chatbot Project
            </h1>
            <p>Welcome to our innovative chatbot project! Our goal is to develop a sophisticated chatbot leveraging deep learning and natural language processing (NLP) techniques. This chatbot is designed to efficiently address and respond to a wide range of queries from employees in a large public sector organization. Here’s what makes our chatbot stand out:</p>
           
              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 mb-8 mt-7">
              Key Features:
              </h2>

              <ul className="list-disc list-inside mb-4">
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
              <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 mb-8">
              Technology and Resources:
              </h2>
              <ul className="list-disc list-inside">
                <p className="mb-2">
                This project utilizes advanced deep learning and NLP techniques, relying on open-source tools and resources. GAIL (INDIA) LTD will not provide any hardware, software, license, or data resources. Our team has utilized free and open-source resources to develop this solution.
                </p>
                <p className="mb-4">
                For a detailed explanation of the problem statement and project scope, watch our 3-minute introductory video.


                </p>
                <p className="mb-4">
                Join us in revolutionizing how organizational queries are handled with cutting-edge technology and robust security!
                </p>
                
              </ul>
           
          </div>
        </div>
        <div className="flex-shrink-0 ml-auto flex items-center">
          <img
            src="chatbot.webp"
            alt="Chatbot"
            className="w-[500px] h-auto mr-10 mt-10 mb-10 rounded-[20px]"
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Info