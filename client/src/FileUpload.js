import React, { useState } from 'react';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    // Here you would send formData to the server.
    // For example: axios.post('/upload', formData);
    console.log('File to be uploaded:', selectedFile);

    // Reset file input
    setSelectedFile(null);
  };

  return (
    <div>
      <h3 className='fileHeader'>File Sharing</h3>
      <input type="file" onChange={handleFileChange} />
      <button className='uploadButton' onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
