import React from 'react';

const FilePicker = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
	const files = event.target.files;
	if (files.length > 0) {
	  onFileUpload(files);
	}
  };

  return (
	<div>
	  <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />
	</div>
  );
};

export default FilePicker;