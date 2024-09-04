import { Link } from "react-router-dom"


const MainContainer = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-500 to-black">
        <div className="text-white font-bold mt-15 text-center w-7/12">
        <h1 className="text-6xl w-full font-bold">Empowering Your Workplace with AI-Driven Support</h1>
        <p className="py-6 text-lg w-full">Instant answers to your HR and IT queries, document analysis, and more. Streamline your organizational needs with our intelligent chatbot, designed to assist you with precision and speed.</p>
        <button className="text-black font-bold p-4 rounded-lg bg-white hover:bg-black hover:text-white hover:border border-white"><Link to="/booking">Start Chatting</Link></button>
      </div>
    </div>
  )
}

export default MainContainer