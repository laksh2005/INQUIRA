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
    <div className="bg-black min-h-screen">
      <Header />
      <div className="flex flex-col justify-center items-center">

        <input
          type="text"
          placeholder="Enter Namespace Token"
          value={namespace}
          onChange={handleNamespaceChange} 
          className="mb-4 p-2 rounded border"
        />

        <button
          className="bg-blue-500 text-white p-2 rounded mb-4"
          onClick={handleButtonClick}
        >
          Upload your PDFs
        </button>

        {showFilePicker && <FilePicker onFileUpload={handleFileUpload} />}
        {uploadStatus && <p className="text-white mt-4">{uploadStatus}</p>}
 
        <textarea
          placeholder="Enter your query..."
          value={query}
          onChange={handleQueryChange} 
          className="mt-4 mb-4 p-2 rounded border w-80"
        ></textarea>

        <button
          className="bg-green-500 text-white p-2 rounded mb-4"
          onClick={handleQuerySubmit}
        >
          Submit Query
        </button>

        {response && (
          <div className="border-4 border-[rgb(125,60,152)] p-4 rounded bg-white text-black">
            {response}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Bot;





