import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Navbar = () => (
    <nav className="navbar">
        <div className="navbar-left">
            <Link to="/" className="logo">📚 Library API</Link>
        </div>
        <div className="navbar-center">
            <ul className="nav-links">
                <li><NavLink to="/" end>Home</NavLink></li>
                <li><NavLink to="/books">Books</NavLink></li>
                <li><NavLink to="/authors">Authors</NavLink></li>
                <li><NavLink to="/genres">Genres</NavLink></li>
                <li><NavLink to="/members">Members</NavLink></li>
            </ul>
        </div>
        <div className="navbar-right">
            <Link to="/circulation" className="navbar-cta">Circulation desk</Link>
            <ThemeToggle />
        </div>
    </nav>
);

export default Navbar;