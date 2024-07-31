const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { updateUserImage, getUserImage, deleteUserImage } = require('../controllers/image');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'public', 'uploads')),
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, raw) => {
      if (err) return cb(err);
      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});

const upload = multer({ storage: storage });

router.put('/:id', upload.single('userImage'), updateUserImage);
router.get('/:id', getUserImage);
router.delete('/:id', deleteUserImage);

module.exports = router;