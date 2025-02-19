import express from 'express';
import { createPost, getAllPosts } from '../controllers/post-controller.js';
import { recupererTousPosts } from '../db/repository/post-repository.js';

const router = express.Router();


router.post('/post', createPost);

router.get('/posts', async (req, res) => {
    try {
        const posts = await recupererTousPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la récupération des posts' });
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

export default router; 