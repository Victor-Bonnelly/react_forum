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
        const posts = await Post.find({ deleted: false });
        res.json(posts);
    } catch (error) {
        console.error('Erreur lors de la récupération des posts:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des posts' });
    }
});

router.post('/api/posts', async (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({ error: 'Title, content and author are required.' });
    }

    try {
        const newPost = new Post({ title, content, author, deleted: false });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post non trouvé' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/api/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByIdAndUpdate(postId, { deleted: true }, { new: true });
        if (!post) {
            return res.status(404).send('Post non trouvé');
        }
        res.status(200).send('Post supprimé avec succès');
    } catch (error) {
        res.status(500).send('Erreur lors de la suppression du post');
    }
});

export default router; 