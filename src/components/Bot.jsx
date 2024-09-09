import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import FilePicker from './FilePicker';

const Bot = () => {
  const [showFilePicker, setShowFilePicker] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleButtonClick = () => {
    setShowFilePicker(true); 
  };

  const handleFileUpload = async (files) => {
    const formData = new FormData();
    Array.from(files).forEach((file, index) => {
      formData.append(`file${index}`, file);
    });


    const accessToken = 'ACCESS_TOKEN';
    formData.append('accessToken', accessToken); 
    
  
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setUploadStatus('Files uploaded successfully');
      } else {
        setUploadStatus('File upload failed');
        console.error('File upload failed', response.statusText);
      }
    } catch (error) {
      setUploadStatus('Error uploading files');
      console.error('Error uploading files:', error.message);
    }
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
        {showFilePicker && <FilePicker onFileUpload={handleFileUpload} />}
        {uploadStatus && <p className="text-white mt-4">{uploadStatus}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default Bot;

