import express from 'express';
import upload from '../cloudinary/multer-middleware.js';

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Uploaded!',
    data: {
      url: req.file.path, // Cloudinary URL
      public_id: req.file.filename
    }
  });
});

export default router;
