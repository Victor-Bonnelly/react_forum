import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import Header from './components/Header';
import { UserProvider } from '../../context/UserContext';

const App = () => {
    const isAuthenticated = localStorage.getItem('token') !== null;

    return (
        <UserProvider>
            <Header />
            <Routes>
                <Route path="/" element={<h2>Bienvenue sur la page d&apos;accueil</h2>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            </Routes>
        </UserProvider>
    );
};

export default App;
