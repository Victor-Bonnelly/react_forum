import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from './routes/user-routes.js';
import postRoutes from './routes/post-routes.js';

import bodyParser from 'body-parser';
import User from './db/models/User.js';

const DB_NAME = "todos";
const MONGO_URI = process.env.MONGO_URI + DB_NAME;

const app = express();
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());

app.use('/', userRoutes);
app.use('/', postRoutes);

app.get('/ping', (requete, reponse) => {
    reponse.end('<h1>Pong</h1>');
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

const connectDB = async () => {
    try {
        console.log('MongoDB URI:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            writeConcern: {
                w: 'majority',
                j: true,
                wtimeout: 1000,
            },
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})