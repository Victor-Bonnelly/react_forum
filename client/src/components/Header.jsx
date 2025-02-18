import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useUser } from '../../../context/UserContext'; 
import './Header.css'; 

const Header = () => {
    const { user } = useUser(); 
    const isAuthenticated = localStorage.getItem('token') !== null; 
    const navigate = useNavigate(); 

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
    };

    return (
        <header className="header">
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Accueil</Link>
                    </li>
                    {!isAuthenticated && ( 
                        <li>
                            <Link to="/signup">Inscription</Link>
                        </li>
                    )}
                    {!isAuthenticated ? ( 
                        <li>
                            <Link to="/login">Connexion</Link>
                        </li>
                    ) : ( 
                        <li>
                            <button onClick={handleLogout}>Déconnexion</button>
                        </li>
                    )}
                    {isAuthenticated && ( 
                        <li>
                            <Link to="/profile">Profil</Link>
                            {user && user.avatar && ( 
                                <img src={user.avatar} alt="Avatar" className="user-avatar" />
                            )}
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header; 