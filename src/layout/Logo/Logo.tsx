import './Logo.css';

/** Open-book mark. Decorative: the adjacent text carries the name. */
const Logo = () => (
    <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
        <path className="logo-mark__page" d="M15.5 9.5C12 6.8 7.4 6.6 3 7.6V25.4C7.4 24.4 12 24.6 15.5 27.3Z" />
        <path className="logo-mark__page" d="M16.5 9.5C20 6.8 24.6 6.6 29 7.6V25.4C24.6 24.4 20 24.6 16.5 27.3Z" />
        <path className="logo-mark__spine" d="M15.2 9.3H16.8V27.4H15.2Z" />
    </svg>
);

export default Logo;
