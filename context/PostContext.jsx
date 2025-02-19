import React, { createContext, useContext, useEffect, useState } from 'react';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:3001/api/posts');
            const data = await response.json();
            console.log('Données récupérées :', data); 
            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <PostContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => useContext(PostContext); 