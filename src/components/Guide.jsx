import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Guide = () => {

  useGSAP(() => {
    gsap.to(".guide-img", {
      y: 20,
      duration: 2, 
      repeat: -1, 
      yoyo: true, 
      ease: "power1.inOut", 
    });
  }, []);

  useGSAP(() => {
    gsap.from(".text-box", {
      opacity:0,
      duration: 1,
      delay:0.5, 
      y:-20
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans">
      <Header />
      <div className="flex whole">
        <div className="flex container mx-auto pt-6 pl-6 pb-6 max-w-4xl ml-20 items-center">
          <div className="flex-1 mr-10 z-20 text-box">
            <h1 className="text-5xl text-center font-extrabold bg-gradient-to-r from-custom1 to-custom2 text-transparent bg-clip-text mb-6">
              Guide to INQUIRA
            </h1>
            <div className="bg-gray-900 p-6 rounded-3xl shadow-lg">
              <h2 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-l from-white to-custom2 mb-4">
                Getting Started
              </h2>
              <ul className="list-disc text-lg list-inside mb-4">
                <li className="mb-2">
                  Find the chat icon at the bottom right corner of your screen
                  and click on it to open the chatbot.
                </li>
                <li className="mb-2">
                  Type your question or message into the chat input field
                  provided in the chatbot window.
                </li>
                <li className="mb-2">
                  Press Enter on your keyboard or click the send button to
                  submit your message to the chatbot.
                </li>
                <li className="mb-2">
                  The chatbot will process your message and provide a response
                  in real-time.
                </li>
                <li className="mb-2">
                  Read the chatbot's response and follow any instructions or
                  suggestions provided.
                </li>
                <li className="mb-2">
                  Continue interacting with the chatbot by asking more questions
                  or requesting further assistance if necessary.
                </li>
              </ul>
              <h2 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-l from-white to-custom1 mb-4">
                Tips
              </h2>
              <ul className="list-disc list-inside text-lg text-lg">
                <li className="mb-2">
                  Ensure your questions are clear and detailed to receive
                  accurate responses.
                </li>
                <li className="mb-2">
                  Include keywords related to your query to help the chatbot
                  understand your needs better.
                </li>
                <li className="mb-2">
                  If the chatbot provides instructions, follow them carefully
                  for optimal results.
                </li>
                <li className="mb-2">
                  If you need additional support beyond the chatbot, contact our
                  support team for further assistance.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 ml-auto flex items-center">
          <img
            src="guide.png"
            alt="Chatbot"
            className="w-[600px] h-auto mr-16 mt-16 rounded-[20px] z-10 guide-img"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Guide;
