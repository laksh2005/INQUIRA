import React from 'react';

const FilePicker = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // Implement file upload logic here
      console.log("File selected:", selectedFile.name);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <button onClick={handleFileUpload}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default FilePicker;

