import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération du post');
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) return <div>Chargement...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} />
            <p>{post.content}</p>
            <p>Publié par: {post.author}</p>
            <p>Publié le: {post.createdAt}</p>
         
        </div>
    );
};

export default PostDetail; 