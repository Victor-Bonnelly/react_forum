import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/user-controller.js';
import { authenticateToken } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

const router = express.Router();

router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', loginUser);
router.get('/logout', authenticateToken, logoutUser);

export default router; 