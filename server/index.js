import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from './routes/user-routes.js';
import postRoutes from './routes/post-routes.js';
import bodyParser from 'body-parser';
import User from './db/models/User.js';
import Post from './db/models/Post.js';
import { recupererTousPosts } from './db/repository/post-repository.js';

const DB_NAME = "todos";
const MONGO_URI = process.env.MONGO_URI + DB_NAME;

const app = express();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type'], 
}));
app.use(bodyParser.json());


const addHeaders = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
};

app.use(addHeaders); 

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.get('/ping', (req, res) => {
    res.send('<h1>Pong</h1>');
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/posts', async (req, res) => {
    try {
        const listeDesPosts = await recupererTousPosts();
        console.log("listeDesPosts", listeDesPosts);
        res.json(listeDesPosts);
    } catch (error) {
        console.error("Erreur lors de la récupération des posts:", error);
        res.status(500).json({ message: 'Erreur lors de la récupération des posts' });
    }
});


app.post('/api/posts', async (req, res) => {
    const { title, content } = req.body; 
    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connecté à la base de données');
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('Erreur de connexion à la base de données:', err);
});
