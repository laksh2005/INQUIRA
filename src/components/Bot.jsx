import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import FilePicker from './FilePicker';

const Bot = () => {
  const [showFilePicker, setShowFilePicker] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [namespace, setNamespace] = useState(Date.now().toString());

  const handleButtonClick = () => {
    setShowFilePicker(true);
  };

  const handleNamespaceChange = (e) => {
    setNamespace(e.target.value); 
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };


  const handleFileUpload = async (files) => {
    const formData = new FormData();
    Array.from(files).forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {

      const response = await fetch('https://gailbot-v1.onrender.com/upload?namespace=newwww', { 
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setUploadStatus('Files uploaded successfully');
      } else {
        setUploadStatus(`File upload failed: ${response.statusText}`);
        console.error('File upload failed', await response.text());
      }
    } catch (error) {
      setUploadStatus('Error uploading files');
      console.error('Error uploading files:', error.message);
    }
  };

  const handleQuerySubmit = async () => {
    if (!query) {
      setResponse('Please provide a query.');
      return;
    }

    try {
      const requestBody = {
        namespace,
        query 
      };

      const response = await fetch('https://gailbot-v1.onrender.com/query', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(data.reply || 'No response from bot'); 
      } else {
        setResponse(`Failed to get response from the bot: ${response.statusText}`);
        console.error('Failed to get bot response', await response.text());
      }
    } catch (error) {
      setResponse('Error connecting to the bot');
      console.error('Error connecting to bot:', error.message);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <div className="flex flex-col justify-center items-center p-6 space-y-6">

        <div className="w-80 p-4 rounded-lg shadow-lg bg-black border border-custom2 hover:border-pink-400">
          <label className="text-sm text-gray-300 mb-1 block">Namespace Token</label>
          <input
            type="text"
            placeholder="Enter Namespace Token"
            value={namespace}
            onChange={handleNamespaceChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
  
        <div className="w-80 p-4 rounded-lg shadow-lg bg-black border border-custom1 hover:border-blue-300 space-y-4">
          <button
            className="w-full bg-custom1 hover:bg-blue-500 text-white py-2 rounded-md"
            onClick={handleButtonClick}
          >
            Upload your PDFs
          </button>
          {showFilePicker && <FilePicker onFileUpload={handleFileUpload} />}
          {uploadStatus && <p className="text-green-400 text-sm">{uploadStatus}</p>}
        </div>

        <div className="w-80 p-4 rounded-lg shadow-lg bg-black border border-custom2 hover:border-pink-400">
          <textarea
            placeholder="Enter your query..."
            value={query}
            onChange={handleQueryChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-green-500"
          ></textarea>
          <button
            className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
            fixed
          >
            Submit Query
          </button>
        </div>

        {response && (
          <div className="w-80 p-4 rounded-lg shadow-lg border-4 border-purple-700 bg-white text-black mt-6">
            {response}
          </div>
        )}
  
      </div>
      <Footer />
    </div>
  )};
  

export default Bot;





