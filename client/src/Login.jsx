import React from 'react';
import { useUser } from '../../context/UserContext';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { login } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        
       
        console.log('Tentative de connexion avec les données suivantes :', { email, password });

        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const userData = { 
                _id: data.user._id, 
                email: data.user.email, 
                avatar: data.user.avatar, 
                description: data.user.description, 
                pseudo: data.user.pseudo 
            }; 
            login(userData); 


            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', data.token);
            console.log('Utilisateur connecté :', userData); 
            console.log('Données stockées dans le localStorage :', userData);
        } else {

            const errorData = await response.json();
            console.error('Erreur de connexion:', errorData.message || 'Erreur inconnue');
        }
    };

    return (
        <div>
            <h2>Page de connexion</h2>
            <form onSubmit={handleLogin}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login; 