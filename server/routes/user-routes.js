import express from 'express';
import { registerUser, loginUser, logoutUser, addFavorite } from '../controllers/user-controller.js';
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

router.post('/users/:id/favorites/:favoriteId', async (req, res) => {
    const { id, favoriteId } = req.params;
    console.log("req", req.params);
  

    const userId = req.params.id; 
    console.log("userId", userId);
    console.log("id", id);
  

    try {
        await addFavorite(req, res, favoriteId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router; 