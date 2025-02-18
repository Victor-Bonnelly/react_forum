import { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [validationMessage, setValidationMessage] = useState("");

    const registerUser = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('description', description);
        formData.append('pseudo', pseudo);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Erreur lors de l\'enregistrement:', error);
                setValidationMessage(error.message);
            } else {
                const data = await response.json();
                console.log('Réponse du serveur:', data);
                setValidationMessage("Inscription réussie !");
            }
        } catch (error) {
            console.error('Error:', error);
            setValidationMessage(error.message);
        }
    };

    return (
        <form onSubmit={registerUser}>
            <h2>Inscription</h2>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Entrez votre email" 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Entrez votre mot de passe" 
            />
            <input 
                type="text" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Entrez une description"
            />
            <input 
                type="text" 
                value={pseudo} 
                onChange={(e) => setPseudo(e.target.value)} 
                placeholder="Entrez votre pseudo"
            />
            <input 
                type="file" 
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="image/*"
            />
            <button type="submit">S'inscrire</button>
            {validationMessage && <div className="validation-message">{validationMessage}</div>}
        </form>
    );
};

export default Signup; 