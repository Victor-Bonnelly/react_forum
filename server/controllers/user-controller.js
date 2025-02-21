import bcrypt from 'bcrypt';
import userRepository from '../db/repository/user-repository.js';
import User from '../db/models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

console.log('Current directory:', process.cwd()); 
const JWT_SECRET = process.env.JWT_SECRET;

console.log('JWT_SECRET:', JWT_SECRET);
console.log('PORT:', process.env.PORT);
export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'aaEmail et mot de passe sont requis.' });
  }

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: 'L\'utilisateur existe déjà.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = { email, password: hashedPassword };
  await userRepository.create(userData);

  return res.status(201).json({ message: 'Utilisateur créé avec succès.' });
};

export const registerUser = async (req, res) => {
   
    console.log('Données reçues:', req.body);
    
    const { email, password, description, pseudo } = req.body;
    const avatar = req.body.avatar || null; 


    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe sont requis.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'L\'utilisateur existe déjà.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = new User({ email, password: hashedPassword, avatar, description, pseudo });
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('Données reçues pour la connexion:', { email, password });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

       
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        console.log('Données de l\'utilisateur récupérées :', {
            _id: user._id,
            email: user.email,
            avatar: user.avatarURL,
            description: user.description,
            pseudo: user.pseudo
        });

      
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        
        const responseData = { 
            token, 
            user: { 
                _id: user._id, 
                email: user.email, 
                avatar: user.avatarURL, 
                description: user.description, 
                pseudo: user.pseudo 
            } 
        };
        console.log('Réponse envoyée au client :', responseData);
        res.json(responseData);
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur' });
    }
};

export const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Déconnexion réussie' });
};

export const addFavorite = async (req, res) => {
    const userId = req.params.id;
    const favoriteId = req.params.favoriteId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        if (!user.favorites) {
            user.favorites = []; 
        }

        if (user.favorites.includes(favoriteId)) {
            await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { favorites: favoriteId } },
                { new: true } 
            );
            return res.status(200).json({ message: 'Favori retiré avec succès.' });
        } else {
            await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { favorites: favoriteId } },
                { new: true } 
            );
            return res.status(200).json({ message: 'Favori ajouté avec succès.' });
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout ou du retrait du favori:", error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout ou du retrait du favori.', error });
    }
};

export const fetchFavorites = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).populate('favorites');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const userController = {
  register,
  registerUser,
  loginUser,
  logoutUser,
  addFavorite,
  fetchFavorites,
};

export default userController; 