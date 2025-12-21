import { useContext } from "react";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router";

const StartPage = () => {
    const context = useContext(AuthContext);

    return context.isAuthenticated ? (
        <p>
            Welcome to TMDB! View your <Link to="/movies/watchlist">Watchlist</Link>, your <Link to="/movies/favorites">Favorites</Link>, or your <Link to="/users/profile">Profile</Link>
        </p>
        ) : (
        <p>
            <Link to="/users/login">Login</Link> or <Link to="/users/signup">Signup</Link>
        </p>
    );
};

export default StartPage;