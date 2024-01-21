const express = require('express');
const multer = require('multer');
const path = require('path');
const { verifyToken } = require('./auth');
const fs = require('fs');
const db = require('../models');

const File = db.File;
const router = express.Router();

// Check and create uploads directory
const uploadsDir = './files';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: './files/',
    filename: function(req, file, cb) {

      cb(null, file.originalname);
    }
});
  
// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB file size limit
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
}).single('file')
  
// Check File Type
function checkFileType(file, cb) {
    // Allowed file extensions
    const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Files Only!');
    }
}

// File upload handler
const handleFileUpload = (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        res.status(400).json({ msg: err });
      } else {
        if (req.file == undefined) {
          res.status(400).json({ msg: 'No file selected!' });
        } else {
          try {
            const username = req.body.username; // Get username from the request body
            await File.create({
              filename: req.file.filename,
              filepath: `files/${req.file.filename}`,
              username, // Use the provided username
            });
            res.json({
              msg: 'File Uploaded!',
              file: `files/${req.file.filename}`
            });
          } catch (dbError) {
            res.status(500).json({ msg: 'Database error', error: dbError });
          }
        }
      }
    });
};

const listFiles = async (req, res) => {
    try {
        const files = await File.findAll({
            attributes: ['filename', 'username'] // Select only filename and username
        });
        res.json(files);
    } catch (error) {
        res.status(500).send('Error fetching files: ' + error);
    }
};

const downloadFile = (req, res) => {
    const filename = req.params.filename;
    const fileDirectory = path.join(__dirname, '..', 'files'); // Adjust the path as needed
    const filePath = path.join(fileDirectory, filename);

    // Check if file exists
    if (fs.existsSync(filePath)) {
        res.download(filePath, filename, (err) => {
            if (err) {
                res.status(500).send('Could not download the file: ' + err);
            }
        });
    } else {
        res.status(404).send('File not found');
    }
};

const deleteFile = async (req, res) => {
    const filename = req.params.filename;
    const fileDirectory = path.join(__dirname, '..', 'files'); // Adjust the path as needed
    const filePath = path.join(fileDirectory, filename);

    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the file from the filesystem

            // Delete the record from the database
            await File.destroy({ where: { filename: filename } });
            res.send('File deleted successfully');
        } else {
            res.status(404).send('File not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting the file: ' + error);
    }
};
  

router.post('/upload', handleFileUpload);
router.get('/list', listFiles);
router.get('/download/:filename', downloadFile);
router.delete('/delete/:filename', deleteFile);

module.exports = router;
