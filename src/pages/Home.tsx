import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Book } from "../types/Book";
import { Member } from "../types/Member";
import { getBooks } from "../api/bookApi";
import { getMembers } from "../api/memberApi";
import "./Home.css";

// Forest and gold tones for the shelf spines, matching the cover palette.
const TONES: [string, string][] = [
    ["#2f5e37", "#113a18"],
    ["#8a6d1f", "#5c4713"],
    ["#113a18", "#071a0a"],
    ["#5f7d52", "#2f5e37"],
    ["#b59a4a", "#8a6d1f"],
    ["#0c2a11", "#2f5e37"],
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function Home() {
    const [books, setBooks] = useState<Book[]>([]);
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        getBooks()
            .then(setBooks)
            .catch((error) => console.error(error));

        getMembers()
            .then(setMembers)
            .catch((error) => console.error(error));
    }, []);

    const recent = books.slice(-12);

    return (
        <main className="page home">
            <section className="home-hero">
                <h1 className="display">
                    Find it.<br />
                    Lend it.<br />
                    <em>Log it.</em>
                </h1>

                <div className="home-hero__aside">
                    <p className="muted home-lede">
                        The catalogue and the members in one place.
                    </p>
                    <div className="field">
                        <input placeholder="Title, author or ISBN" aria-label="Search catalogue" />
                    </div>
                </div>
            </section>

            <section className="home-kpis">
                <div className="home-kpi">
                    <span className="label">Titles</span>
                    <div className="home-kpi__n">{pad(books.length)}</div>
                </div>
                <div className="home-kpi">
                    <span className="label">Members</span>
                    <div className="home-kpi__n">{pad(members.length)}</div>
                </div>
            </section>

            <div className="home-shelf" aria-label="Recently added books">
                {recent.map((book) => {
                    const [c1, c2] = TONES[book.id % TONES.length];
                    const height = 150 + ((book.id * 37) % 60);
                    return (
                        <Link
                            key={book.id}
                            to="/books"
                            className="spine"
                            style={{ "--h": `${height}px`, "--c1": c1, "--c2": c2 } as CSSProperties}
                            title={book.title}
                        >
                            {book.title}
                        </Link>
                    );
                })}
            </div>
            <div className="home-shelf-cap">
                <span className="label">Recently added</span>
                <Link to="/books" className="label">Browse all →</Link>
            </div>

            <section className="home-actions">
                <Link to="/members" className="glass home-action">
                    <span className="home-action__num">01</span>
                    <h3>Members</h3>
                </Link>
                <Link to="/books" className="glass home-action">
                    <span className="home-action__num">02</span>
                    <h3>Books</h3>
                </Link>
                <Link to="/authors" className="glass home-action">
                    <span className="home-action__num">03</span>
                    <h3>Authors</h3>
                </Link>
            </section>
        </main>
    );
}
