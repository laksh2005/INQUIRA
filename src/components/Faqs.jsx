import { Link } from "react-router-dom"


const Faqs = () => {
  return (
    <div className="px-8 py-20 flex flex-col items-center bg-gradient-to-r from-gray-500 to-black">
    <h1 className="font-bold text-4xl text-center text-white mb-20">
        <span className="text-white">F</span>requently
        <span className="text-white"> A</span>sked 
        <span className="text-white"> Q</span>uestions
    </h1>

    <div className="px-10 w-7/12 ques-container ">
        <div className="px-6 py-5 mb-5 hover:bg-gradient-to-l from-gray-500 to-black text-center rounded-lg border border-white">
            <h2 className="w-6/12 font-bold my-6 mb-5 text-lg flex justify-end"></h2>
            <p className="px-2 font-semibold"></p>
        </div>
        <div className="px-6 py-5 mb-5 hover:bg-gradient-to-l from-gray-500 to-black text-center rounded-lg border border-white">
            <h2 className="w-6/12 font-bold my-6 mb-5 text-lg flex justify-start"></h2>
            <p className="px-2 font-semibold"></p>
        </div>
        <div className="px-6 py-5 mb-5 hover:bg-gradient-to-l from-gray-500 to-black text-center rounded-lg border border-white">
            <h2 className="w-6/12 font-bold my-6 mb-5 text-lg flex justify-end"></h2>
            <p className="px-2 font-semibold"></p>
        </div>
        <div className="px-6 py-5 mb-5 hover:bg-gradient-to-l from-gray-500 to-black text-center rounded-lg border border-white">
            <h2 className="w-6/12 font-bold my-6 mb-5 text-lg flex justify-start"></h2>
            <p className="px-2 font-semibold"></p>
        </div>
        <div className="px-6 py-5 mb-5 hover:bg-gradient-to-l from-gray-500 to-black text-center rounded-lg border border-white">
            <h2 className="w-6/12 font-bold my-6 mb-5 text-lg flex justify-end"></h2>
            <p className="px-2 font-semibold"></p>
        </div>
        <div className="px-6 py-5 mb-5 hover:bg-gradient-to-l from-gray-500 to-black text-center rounded-lg border border-white">
            <h2 className="w-6/12 font-bold my-6 mb-5 text-lg flex justify-start"></h2>
            <p className="px-2 font-semibold"></p>
        </div>
    </div>
</div>
  )
}

export default Faqs