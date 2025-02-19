import * as postRepository from '../db/repository/post-repository.js';

export const createPost = async (req, res) => {
  const { title, content, image, author } = req.body;

  try {
    const newPost = await postRepository.createPost({ title, content, image, author });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du post', error });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postRepository.findAllPosts();
    console.log('Posts récupérés :', posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des posts', error });
  }
}; 