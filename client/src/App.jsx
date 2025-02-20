import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import Header from './components/Header';
import { UserProvider } from '../../context/UserContext';
import { PostProvider, usePosts } from '../../context/PostContext';
import { useEffect, useState } from 'react';
import CreatePost from './CreatePost';

const App = () => {
    return (
        <UserProvider>
            <PostProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </PostProvider>
        </UserProvider>
    );
};

const Home = () => {
    const { posts, setPosts } = usePosts();
    const isAuthenticated = localStorage.getItem('token') !== null;
    const user = JSON.parse(localStorage.getItem('user'));

    const getAllPosts = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/posts');
            if (!response.ok) {
                throw new Error('La réponse du réseau n\'était pas correcte');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des posts :", error);
        }
    };

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div>
            <h2>Bienvenue sur la page d&apos;accueil {isAuthenticated && user.pseudo}</h2>
            <CreatePost />
            <div>
                {posts.map(post => (
                    <div key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        {post.image && <img src={post.image} alt={post.title} />}
                        <p>Publié par: {post.author}</p>
                        <p>Publié le: {post.createdAt}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
