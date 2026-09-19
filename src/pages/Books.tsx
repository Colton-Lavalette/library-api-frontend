import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { getBooks, deleteBook } from "../api/bookApi";
import './Books.css';
import BookForm from "../components/books/BookForm";

export default function Books() {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBooks, setSelectedBooks] = useState<Set<number>>(new Set());
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        getBooks()
            .then(setBooks)
            .catch((error) => console.error(error));
    }, []);

    function toggleBook(id: number) {
        setSelectedBooks(prev => {
            const updated = new Set(prev);

            if (updated.has(id)) {
                updated.delete(id);
            } else {
                updated.add(id);
            }

            return updated;
        });
    }

    async function handleDelete() {
        try {
            for (const id of selectedBooks) {
                await deleteBook(id);
            }

            setBooks(prev =>
                prev.filter(book => !selectedBooks.has(book.id))
            );

            setSelectedBooks(new Set());
        } catch (error) {
            console.error(error);
        }
    }

    const selectedCount = selectedBooks.size;

    return (
        <main>
            <h1>Books</h1>

            <div className="books-layout">
                <BookForm
                    book={editingBook ?? undefined}
                    onBookSaved={(savedBook) => {
                        setBooks(prev =>
                            prev.map(book =>
                                book.id === savedBook.id
                                    ? savedBook
                                    : book
                            )
                        );

                        setEditingBook(null);
                        setSelectedBooks(new Set());
                    }}
                />

                <div className="book-list">
                    <div className="book-rows">
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className={`book-row ${
                                    selectedBooks.has(book.id)
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => toggleBook(book.id)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedBooks.has(book.id)}
                                    onChange={() => toggleBook(book.id)}
                                    onClick={(event) => event.stopPropagation()}
                                />

                                <span>
                                {" "}{book.title}{" "}
                                    {book.isbn}
                                    {" "}
                            </span>

                                <span>
                                ({book.publishedYear})
                            </span>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedCount > 0 && (
                    <div className="book-actions">
                        {selectedCount === 1 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const id = [...selectedBooks][0];
                                    const book = books.find(book => book.id === id);

                                    if (book) {
                                        setEditingBook(book);
                                    }
                                }}
                            >
                                Edit
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={handleDelete}
                        >
                            Delete
                            {selectedCount > 1
                                ? ` (${selectedCount})`
                                : ""}
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}