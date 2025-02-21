import { useEffect, useState } from 'react'; 
import PropTypes from 'prop-types';

const Favorites = ({ userId }) => {
    const [favorites, setFavorites] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchFavorites = async () => {
            try {
                const response = await fetch(`http://localhost:3001/users/${userId}/favorites`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des favoris');
                }
                
                const data = await response.json();
                setFavorites(data);
            } catch (err) {
                console.error("Erreur lors de la récupération des favoris:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchAllPosts = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/posts');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des posts');
                }
                const data = await response.json();
                setAllPosts(data);
            } catch (err) {
                console.error("Erreur lors de la récupération des posts:", err);
                setError(err.message);
            }
        };

        fetchFavorites();
        fetchAllPosts();
    }, [userId]);

    const filteredFavorites = allPosts.filter(post => favorites.includes(post._id));

    if (loading) return <div>Chargement des favoris...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div>
            <h2>Mes Favoris</h2>
            <div className="row">
                {filteredFavorites.map(favorite => (
                    <div className="col-md-4" key={favorite._id}>
                        <div className="card" style={{ width: '18rem' }}>
                            {favorite.image && <img className="card-img-top" src={favorite.image} alt={favorite.title} />}
                            <div className="card-body">
                                <h5 className="card-title">{favorite.title}</h5>
                                <p>Publié par: {favorite.author}</p>
                                <p>Publié le: {favorite.createdAt}</p>
                                <a href={`/post/${favorite._id}`} className="btn btn-primary">Voir le post</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

Favorites.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default Favorites; 