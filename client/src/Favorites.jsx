import { useContext, useEffect, useState } from 'react'; 

import { PostProvider } from '../../context/PostContext';
const Favorites = () => {
    const { userId } = useContext(PostProvider) || {};
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (!userId) return;
        const fetchFavorites = async () => {
            const response = await fetch(`/api/users/${userId}/favorites`);
            const data = await response.json();
            setFavorites(data);
        };
        fetchFavorites();
    }, [userId]);

    return (
        <div>
            <h2>Mes Favoris</h2>
            <div className="row">
                {favorites.map(favorite => (
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

export default Favorites; 