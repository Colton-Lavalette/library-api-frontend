import './Navbar.css';

const Navbar = () => {
    return (
<nav className="navbar">
    <div className="navbar-left">
        <span className="logo">
            📚 Library API
        </span>
    </div>
    <div className="navbar-center">
        <ul className="nav-links">
            <li>
                <a href="/public">Home</a>
            </li>
            <li>
                <a href="/books">Books</a>
            </li>
            <li>
                <a href="/authors">Authors</a>
            </li>
            <li>
                <a href="/genres">Genres</a>
            </li>
        </ul>
    </div>
    <div className="navbar-right">

    </div>
</nav>
    );
};

export default Navbar;