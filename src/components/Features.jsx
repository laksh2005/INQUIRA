import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { F1 } from '../utils/constants';


gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const cardsRef = useRef([]);

  //this fades in each card upon scrolling to it
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card, {
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none', 
        }
      });
    });
  }, []);

  return (
    <div className="px-8 py-20 font-sans bg-black">
      <div className="card-container flex flex-col z-10">
        <div
          className="card flex flex-col md:flex-row items-center shadow-lg w-full space-y-4"
          ref={(el) => cardsRef.current[0] = el} 
        >
          <div className="feature-img flex w-full md:w-1/2 mx-8">
            <img src={F1} className="" />
          </div>
          <div className="z-10 feature-card transform transition-transform duration-300 hover:-translate-y-1 border border-custom1 hover:border-blue-300 w-full md:w-1/2 p-8 text-center rounded-3xl">
            <h2 className="feature text-4xl p-2 md:text-6xl font-bold bg-gradient-to-r from-custom1 to-custom2 text-transparent bg-clip-text mb-8 relative z-20">
              Document Processing
            </h2>
            <p className="feature-desc text-white text-lg md:text-xl">
              Analyzes and extracts information from uploaded documents, providing features like summarization and keyword extraction to assist with organizational needs.
            </p>
          </div>
        </div>

        <div
          className="card flex flex-col md:flex-row-reverse items-center shadow-lg w-full space-y-4"
          ref={(el) => cardsRef.current[1] = el} 
        >
          <div className="feature-img flex w-full md:w-6/12 mx-8 justify-center items-center">
            <img src="F2.png" className="rounded-lg" />
          </div>
          <div className="feature-card transform transition-transform duration-300 hover:-translate-y-1 border border-custom2 hover:border-pink-400 w-full md:w-6/12 p-8 text-center rounded-3xl">
            <h2 className="feature text-4xl md:text-6xl p-2 font-bold bg-gradient-to-r from-custom1 to-custom2 text-transparent bg-clip-text mb-10 leading-tight">
              Filtering
            </h2>
            <p className="feature-desc text-white text-lg md:text-xl">
              Implements a system-maintained dictionary to filter out inappropriate language, maintaining a professional environment.
            </p>
          </div>
        </div>

        <div
          className="card flex flex-col md:flex-row items-center shadow-lg w-full space-y-2"
          ref={(el) => cardsRef.current[2] = el} 
        >
          <div className="feature-img flex w-full md:w-5/12 mx-8">
            <img src="F3.png" className="rounded-lg" />
          </div>
          <div className="feature-card transform transition-transform duration-300 hover:-translate-y-1 border border-custom1 hover:border-blue-400 w-full md:w-1/2 p-8 text-center rounded-3xl">
            <h2 className="feature text-4xl md:text-6xl p-2 font-bold bg-gradient-to-l from-custom1 to-custom2 text-transparent bg-clip-text mb-8">
              Security with 2FA
            </h2>
            <p className="feature-desc text-white text-lg md:text-xl">
              Integrates Two-Factor Authentication (2FA) to enhance security, ensuring only authorized personnel can access the chatbot.
            </p>
          </div>
        </div>

        <div
          className="card flex flex-col md:flex-row-reverse items-center shadow-lg w-full space-y-4"
          ref={(el) => cardsRef.current[3] = el}>
          <div className="feature-img flex w-full md:w-1/2 mx-8 justify-center items-center">
            <img src="F4.png" className="rounded-lg" />
          </div>
          <div className="feature-card transform transition-transform duration-300 hover:-translate-y-1 border border-custom2 hover:border-pink-400 w-full md:w-1/2 p-8 text-center rounded-3xl">
            <h2 className="feature text-4xl p-2 md:text-6xl font-bold bg-gradient-to-r from-custom1 to-custom2 text-transparent bg-clip-text mb-8">
              Performance Optimization
            </h2>
            <p className="feature-desc text-white text-lg md:text-xl">
              Regular testing and architecture optimization ensure the chatbot delivers responses within 5 seconds, providing a quick and efficient user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
