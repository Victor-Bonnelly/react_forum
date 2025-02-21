import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import Header from './components/Header';
import { UserProvider } from '../../context/UserContext';
import { PostProvider, usePosts } from '../../context/PostContext';
import { useEffect } from 'react';
import CreatePost from './CreatePost';
import PostDetail from './PostDetail';
import Favorites from './Favorites';



const App = () => {
    const userData = localStorage.getItem('user');
    let storedId;
    if (userData) {
        const parsedUser = JSON.parse(userData);
        storedId = parsedUser._id;
    }
    return (
        <UserProvider>
            <PostProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/favorites" element={<Favorites userId={storedId} />} />
                    <Route path="/post/:id" element={<PostDetail />} />
                </Routes>
            </PostProvider>
        </UserProvider>
    );
};

const Home = () => {
    const { posts, setPosts } = usePosts();
    const isAuthenticated = localStorage.getItem('token') !== null;
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id;
    const token = localStorage.getItem('token');
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

    const handleDeletePost = async (postId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/posts/${postId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du post');
            }
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error("Erreur lors de la suppression du post :", error);
        }
    };
    const toggleFavorite = async (postId) => {
        try {
            console.log("userId", userId);
            console.log("postId", postId);
            const response = await fetch(`http://localhost:3001/users/${userId}/favorites/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            
            if (!response.ok) {
                throw new Error(`Erreur lors de la modification du favoris : ${response.statusText}`);
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div>
            <h2>Bienvenue sur la page d&apos;accueil {isAuthenticated && user.pseudo}</h2>
            <CreatePost />
            <div className="row">
                {posts.map(post => (
                    <div className="col-md-4" key={post._id}>
                        <div className="card" style={{ width: '18rem' }}>
                            {post.image && <img className="card-img-top" src={post.image} alt={post.title} />}
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p>Publié par: {post.author}</p>
                                <p>Publié le: {post.createdAt}</p>
                                <a href={`/post/${post._id}`} className="btn btn-primary">Voir le post</a>
                                {isAuthenticated && user.pseudo === post.author && (
                                    <button onClick={() => handleDeletePost(post._id)} className="btn btn-danger">Supprimer</button>
                                )}
                                <button onClick={() => toggleFavorite(post._id)}>
                                    {post.isFavorite ? '❤️' : '🤍'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
