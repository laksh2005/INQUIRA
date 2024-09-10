import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const MainContainer = () => {

//floating the main bot image 
  useGSAP(() => {
    gsap.to(".main-image img", {
      y: 20,
      duration: 2, 
      repeat: -1, 
      yoyo: true, 
      ease: "power1.inOut", 
    });
  }, []);

  useGSAP(() => {
    gsap.from(".main-image img", {
      opacity:0,
      duration: 1,
      delay:0.5, 
      y:-20
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-black px-6 md:px-16 mt-[-8vh]">
      <div className="text-container text-white font-bold text-center md:text-left md:w-6/12">
        <h1 className="big-heading font-sans text-7xl font-extrabold leading-tight tracking-wide mb-4">
          Empowering Your Workplace with{" "}
          <span className="bg-gradient-to-r from-custom1 to-custom2 text-transparent bg-clip-text">
            AI-Driven Support
          </span>
        </h1>

        <p className="small-text font-sans py-4 text-lg leading-relaxed max-w-md mb-4">
          Instant answers to your
          <span className="bg-gradient-to-r from-custom1 to-custom2 text-transparent bg-clip-text">
            {" "}
            HR and IT queries, document analysis, and more.
          </span>{" "}
          Streamline your organizational needs with our intelligent chatbot,
          designed to assist you with precision and speed.
        </p>

        <button className="bot-button bg-gradient-to-r from-custom1 to-custom2 hover:bg-gradient-to-l from-custom1 to-custom2 flex space-x-4 text-white text-lg font-bold py-3 px-8 rounded-full mt-3 transition duration-300 ease-in-out hover:bg-black hover:text-white hover:border-white border border-transparent">
          <Link to="/login" className="flex items-center justify-center space-x-2">
            <span>Start Chatting</span>
          </Link>
          <img src="arrow.svg" alt="arrow icon" className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="main-image mt-[-10] w-6/12 flex justify-center">
        <img src="MAIN_IMG.png" className="w-full max-w-xl object-cover" />
      </div>
    </div>
  );
};

export default MainContainer;

