import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            console.log('Données utilisateur dans le Profile :', parsedUser);
            setUser(parsedUser);
        }
    }, []);

    return (
        <div>
            <h2>Profil de l'utilisateur</h2>
            {user ? (
                <div>
                    <p>ID: {user._id}</p>
                    <p>Email: {user.email}</p>
                    <p>Pseudo: {user.pseudo}</p>
                    <p>Description: {user.description}</p>
                    <img src={user.avatar} alt="Avatar" />
                </div>
            ) : (
                <p>Aucun utilisateur connecté.</p>
            )}
        </div>
    );
};

export default Profile; 