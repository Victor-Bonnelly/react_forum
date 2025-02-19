import express from 'express';
import { createPost, getAllPosts } from '../controllers/post-controller.js';
import { recupererTousPosts } from '../db/repository/post-repository.js';
import Post from '../db/models/Post.js';

const router = express.Router();

router.post('/post', createPost);

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/api/posts', async (req, res) => {
    try {
        const posts = await recupererTousPosts();
        res.json(posts);
    } catch (error) {
        console.error('Erreur lors de la récupération des posts:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des posts' });
    }
});

router.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router; 