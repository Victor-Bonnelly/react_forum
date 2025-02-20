import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [commentRating, setCommentRating] = useState(0);

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

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/posts/${id}/comments`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des commentaires');
                }
                const data = await response.json();
                console.log(data);
                setComments(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchComments();
    }, [id]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const commentData = {
            content: newComment,
            author: post.author,
            postId: id,
            createdAt: new Date().toISOString(),
            rating: commentRating
        };

        try {
            const response = await fetch(`http://localhost:3001/api/posts/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi du commentaire');
            }

            const newComment = await response.json();
            
            if (Array.isArray(comments)) {
                setComments([...comments, newComment]);
            } else {
                console.error('comments n\'est pas un tableau:', comments);
                setComments([newComment]);
            }

            setNewComment('');
        } catch (error) {
            console.error(error);
        }
    };

    if (!post) return <div>Chargement...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} />
            <p>{post.content}</p>
            <p>Publié par: {post.author}</p>
            <p>Publié le: {post.createdAt}</p>
            
            <h2>Commentaires:</h2>
            <div className="row">
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div className="col-md-4" key={comment._id}>
                            <div className="card" style={{ margin: '10px' }}>
                                <div className="card-body">
                           
                                    <h6 className="card-subtitle mb-2 text-muted">Publié par: {comment.author}</h6>
                                    <p className="card-text">{comment.content}</p>
                                    <p className="card-text">Note: {comment.rating}</p>
                                 
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun commentaire disponible.</p>
                )}
            </div>

            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Écrivez votre commentaire ici..."
                    required
                />
                <label htmlFor="rating">Note:</label>
                <select
                    id="rating"
                    value={commentRating}
                    onChange={(e) => setCommentRating(e.target.value)}
                    required
                >
                    <option value="">Sélectionnez une note</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button type="submit">Poster un commentaire</button>
            </form>
        </div>
    );
};

export default PostDetail; 