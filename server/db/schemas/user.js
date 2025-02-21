import mongoose from 'mongoose';
import express from 'express'; 
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

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String, 
  },
  description: {
    type: String,
  },
  pseudo: {
    type: String,
    required: true,
  },
  favorites: {
    type: [String],
    default: [],
  },
});

userSchema.methods.verifyPassword = function(password) {
  return this.password === password; 
};

const router = express.Router();

router.post('/register', upload.single('avatar'), async (req, res) => {

  console.log('Données reçues:', req.body);
  
  const { email, password, description, pseudo } = req.body;
  const avatar = req.file ? req.file.path : null; 

  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
  }

  try {
    const newUser = new User({ email, password, avatar, description, pseudo });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verifyPassword(password)) {
    return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
  }

  res.status(200).json({ message: 'Connexion réussie', user });
});


router.get('/logout', (req, res) => {

  res.status(200).json({ message: 'Déconnexion réussie' });
});

export default router;

export { userSchema }; 