import './Ticker.css';

interface TickerProps {
    items: string[];
}

/** Scrolling strip shown inside the navbar on the home page. Items are duplicated for a seamless loop. */
const Ticker = ({ items }: TickerProps) => {
    if (items.length === 0) return null;
    return (
        <div className="ticker" aria-hidden="true">
            <div className="ticker__track">
                {[...items, ...items].map((text, i) => (
                    <span key={i}>{text}</span>
                ))}
            </div>
        </div>
    );
};

export default Ticker;
