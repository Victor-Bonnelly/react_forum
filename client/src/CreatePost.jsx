import React, { useState, useEffect } from 'react';
import { usePosts } from '../../context/PostContext';

const CreatePost = () => {
    const { setPosts } = usePosts();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [pseudo, setPseudo] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            const storedPseudo = parsedUser.pseudo;
            console.log("storedPseudo", storedPseudo);
            if (storedPseudo) {
                setPseudo(storedPseudo);
            }
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const postData = {
            title: title,
            content: content,
            author: pseudo,
            createdAt: new Date().toISOString(),
        };
        console.log("postData", postData);
        try {
            const response = await fetch('http://localhost:3001/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Créer un nouveau post</h2>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" required />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Contenu" required />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
            <button type="submit">Créer le post</button>
        </form>
    );
};

export default CreatePost; 