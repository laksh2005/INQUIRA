import { F1 } from "../utils/constants"
import Feat2 from "../images/F2.png"
import Feat3 from "../images/F3.png"
import Feat4 from "../images/F4.png"


const Features = () => {
  return (
    <div className="px-8 py-20 font-sans bg-black mt-[-50px]">
      <div className="card-container flex flex-col space-y-4">

        <div className="card flex flex-col md:flex-row items-center shadow-lg w-full space-y-4">
          <div className="flex w-full md:w-1/2 mx-8">
            <img src={F1} className="" />
          </div>
          <div className="border border-custom1 w-full md:w-1/2 p-8 hover:bg-gray-900 text-center rounded-3xl">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-l from-custom1 to-custom2 text-transparent bg-clip-text mb-8">Document Processing</h2>
            <p className="text-white text-lg md:text-xl">
              Analyzes and extracts information from uploaded documents, providing features like summarization and keyword extraction to assist with organizational needs.
            </p>
          </div>
        </div>

        <div className="card flex flex-col md:flex-row-reverse items-center shadow-lg w-full space-y-4">
          <div className="flex w-full md:w-6/12 mx-8 justify-center items-center">
            <img src={Feat2} className="rounded-lg" />
          </div>
          <div className="border border-custom2 w-full md:w-6/12 p-8 hover:bg-gray-900 text-center rounded-3xl">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-custom1 to-custom2 text-transparent bg-clip-text mb-8">Filtering</h2>
            <p className="text-white text-l md:text-xl">
              Implements a system-maintained dictionary to filter out inappropriate language, maintaining a professional environment.
            </p>
          </div>
        </div>

        <div className="card flex flex-col md:flex-row items-center shadow-lg w-full space-y-4">
          <div className="flex w-full md:w-5/12 mx-8">
            <img src={Feat3} className="rounded-lg" />
          </div>
          <div className="border border-custom1 w-full md:w-1/2 p-8 hover:bg-gray-900 text-center rounded-3xl">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-l from-custom1 to-custom2 text-transparent bg-clip-text mb-8">Security with 2FA</h2>
            <p className="text-white text-lg md:text-xl">
              Integrates Two-Factor Authentication (2FA) to enhance security, ensuring only authorized personnel can access the chatbot.
            </p>
          </div>
        </div>

        <div className="card flex flex-col md:flex-row-reverse items-center shadow-lg w-full space-y-4">
          <div className="flex w-full md:w-1/2 mx-8 justify-center items-center">
            <img src={Feat4} className="rounded-lg" />
          </div>
          <div className="border border-custom2 w-full md:w-1/2 p-8 hover:bg-gray-900 text-center rounded-3xl">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-custom1 to-custom2 text-transparent bg-clip-text mb-8">Performance Optimization</h2>
            <p className="text-white text-lg md:text-xl">
            Regular testing and architecture optimization ensure the chatbot delivers responses within 5 seconds, providing a quick and efficient user experience.
            </p>
          </div>
        </div>
    
      </div>
    </div>


  )
}

export default Features