import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Ticker from './Ticker';
import './Navbar.css';

interface NavbarProps {
    /** Items shown in the scrolling strip. Only rendered on the home page. */
    tickerItems?: string[];
}

const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/books', label: 'Books' },
    { to: '/authors', label: 'Authors' },
    { to: '/genres', label: 'Genres' },
    { to: '/members', label: 'Members' },
    { to: '/circulation', label: 'Circulation' },
];

const Navbar = ({ tickerItems = [] }: NavbarProps) => {
    const { pathname } = useLocation();
    const isHome = pathname === '/';

    return (
        <header className={`top-bar${isHome ? ' top-bar--home' : ''}`}>
            <div className="top-bar__row">
                <Link to="/" className="brand">
                    <Logo />
                    <span>Library</span>
                </Link>

                <nav className="nav" aria-label="Main">
                    {links.map(({ to, label, end }) => (
                        <NavLink key={to} to={to} end={end} className="nav__link">
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <ThemeToggle />
            </div>

            {isHome && <Ticker items={tickerItems} />}
        </header>
    );
};

export default Navbar;
