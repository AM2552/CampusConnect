import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../helpers/AuthProvider';

function FileDownload() {
    const [files, setFiles] = useState([]);
    const auth = useAuth();

    const fetchFiles = async () => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await axios.get('https://62.178.154.233:5001/files/list', {
                headers: {
                    'auth-token': `Bearer ${token}`
                }
            });
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
            alert('Error fetching files.');
        }
    };

    const handleDownload = async (filename) => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`https://62.178.154.233:5001/files/download/${filename}`, {
                headers: {
                    'auth-token': `Bearer ${token}`
                },
                responseType: 'blob', // Important for handling binary files
            });
            // Create a URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Error downloading file.');
        }
    };

    const handleDelete = async (filename) => {
        const token = localStorage.getItem("accessToken");
        try {
            await axios.delete(`https://62.178.154.233:5001/files/delete/${filename}`, {
                headers: {
                    'auth-token': `Bearer ${token}`
                }
            });
            alert('File deleted successfully.');
            // Remove the file from the state to update the UI
            setFiles(files.filter(file => file.filename !== filename));
        } catch (error) {
            console.error('Error deleting file:', error);
            alert('Error deleting file.');
        }
    };

    if (!auth.authState) {
        return null; // or any other placeholder/redirect as per your design
    }

    return (
        <div>
            <h3 className='fileHeader'>File Download</h3>
            <div className="selectFileDiv">
            <button className='getFiles' onClick={fetchFiles}>Get all files</button>
            </div>
            <ul>
                {files.map((file, index) => (
                    <li className='downloadTitle' key={index}>
                        {file.filename}
                        <div>
                        <button className='download' onClick={() => handleDownload(file.filename)}>🡇</button>
                        
                        {(auth.user === file.username || auth.modState) && (
                            <button className='trash' onClick={() => handleDelete(file.filename)}>🗑️</button>
                            
                        )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FileDownload;
