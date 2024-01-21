import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../helpers/AuthProvider';

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const auth = useAuth();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }
        const token = localStorage.getItem("accessToken");
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('username', auth.user); // Include username

        try {
            const response = await axios.post('https://62.178.154.233:5001/files/upload', formData, {
                headers: {
                    'auth-token': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('File uploaded successfully.');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file.');
        }

        setSelectedFile(null);
    };

    if (!auth.authState) {
        return null; // Or render a message that user needs to be logged in
    }

    return (
        <div>
            <h3 className='fileHeader'>File Sharing</h3>
            <div className='selectFileDiv'>
            <input className='selectFile' type="file" onChange={handleFileChange} />
            </div>
            <div className='selectFileDiv'>
            <button className='uploadButton' onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
}

export default FileUpload;
