import mongoose from 'mongoose';
import express from 'express';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    content: { type: String, required: true },
    deleted: { type: Boolean, default: false },
});

export const PostModel = mongoose.model('Post', postSchema);

const router = express.Router();

router.get('/posts', async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la récupération des posts' });
    }
});

export default router;

