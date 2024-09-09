import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const faqsData = [
    {
        question: "What types of queries can the chatbot handle?",
        answer: "The chatbot can respond to queries related to HR policies, IT support, company events, and other organizational matters.",
    },
    {
        question: "How secure is the chatbot?",
        answer: "The chatbot is secured with Two-Factor Authentication (2FA) and filters inappropriate language to maintain a safe and professional environment.",
    },
    {
        question: "Can the chatbot process documents?",
        answer: "Yes, the chatbot can analyze uploaded documents, summarizing content and extracting relevant keywords.",
    },
    {
        question: "How many users can the chatbot support simultaneously?",
        answer: "The chatbot architecture is designed to handle at least 5 concurrent users with optimized response times.",
    },
    {
        question: "What happens if the chatbot encounters inappropriate language?",
        answer: "The chatbot uses a system-maintained dictionary to detect and filter inappropriate language, ensuring that communication remains professional and respectful.",
    },
    {
        question: "Can the chatbot handle custom organization-specific queries?",
        answer: "Yes, it can be customized with specific organizational knowledge.",
    },
    {
        question: "How is confidential information handled?",
        answer: "The chatbot recognizes and protects sensitive data according to policies.",
    },
    {
        question: "How does the chatbot avoid biases?",
        answer: "It is trained and monitored to provide fair and unbiased responses.",
    },
]

const Faqs = () => {


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".faq-item", {
      opacity: 0,
      y:50,
      duration: 4,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".faqs-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  const [openindex, setopenIndex] = useState(null);

    const toggleFAQ=(index)=>{
        setopenIndex(openindex === index ? null : index);
    };

  return (
    <div className="faqs-component px-8 py-20 flex flex-col items-center bg-black">
        <h1 className="title big-text font-bold text-4xl text-center mb-20 bg-gradient-to-r from-custom1 to-custom2 text-transparent bg-clip-text">
            <span className="text-white">F</span>requently
            <span className="text-white"> A</span>sked 
            <span className="text-white"> Q</span>uestion<span className="text-white">s</span>
        </h1>

        <div className="px-10 w-7/12 ques-container">
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className={`mb-5 rounded-full  transition-transform transform hover:-translate-y-3 hover:shadow-lg duration-300 text-white border ${openindex === index ? 'border-pink-400' : 'border-custom1'}`}
          >
            <div className="ques-box flex justify-between px-6 py-1 m-4 cursor-pointer space-y-3" onClick={() => toggleFAQ(index)}
            >
              <h2 className="font-bold text-lg flex-1 text-left my-auto">{faq.question}</h2>
              <span className="text-2xl text-white font-bold mx-4">
                {openindex === index ? "-" : "+"}
              </span>
            </div>
            <div
              className={`px-6 py-3 overflow-hidden transition-all duration-900 ease-in-out ${
                openindex === index ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="font-semibold m-3">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
</div>
  )
}

export default Faqs