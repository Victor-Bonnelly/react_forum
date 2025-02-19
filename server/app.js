import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/user-routes.js';
import postRoutes from './routes/post-routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

console.log('Routes configured:');
console.log('POST /api/posts -> createPost');
console.log('GET /api/posts -> getAllPosts');

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('BDD connecté');
        console.log(`Server is running on port ${PORT}`);
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log('Database connection error:', error)); 