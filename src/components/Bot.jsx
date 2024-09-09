import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import FilePicker from './FilePicker';

const Bot = () => {
  const [showFilePicker, setShowFilePicker] = useState(false);

  const handleButtonClick = () => {
    setShowFilePicker(true); 
  };

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="flex flex-col justify-center items-center">

        <button
          className="bg-blue-500 text-white p-2 rounded mb-4"
          onClick={handleButtonClick}
        >
          Upload your PDFs
        </button>


        {showFilePicker && <FilePicker />}
      </div>
      <Footer />
    </div>
  );
};

export default Bot;


