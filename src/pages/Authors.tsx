import { useEffect, useState } from "react";
import { Author } from "../types/Author";
import { getAuthors, deleteAuthor } from "../api/authorApi";
import AuthorForm from "../components/authors/AuthorForm";
import AuthorSearch from "../components/authors/AuthorSearch";
import './Authors.css';

export default function Authors() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<Set<number>>(new Set());
    const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAuthors()
            .then(setAuthors)
            .catch((error) => console.error(error));
    }, []);

    function toggleAuthor(id: number) {
        setSelectedAuthors(prev => {
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
            setError(null);

            for (const id of selectedAuthors) {
                await deleteAuthor(id);
            }

            setAuthors(prev =>
                prev.filter(author => !selectedAuthors.has(author.id))
            );

            setSelectedAuthors(new Set());
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to delete author");
        }
    }

    const selectedCount = selectedAuthors.size;

    return (
        <main>
            <h1>Authors</h1>

            <AuthorSearch
                onSearchResults={setAuthors}
                onClearSearch={() => {
                    getAuthors()
                        .then(setAuthors)
                        .catch((error) => console.error(error));
                }}
            />

            <div className="authors-layout">
                <AuthorForm
                    author={editingAuthor ?? undefined}
                    onAuthorSaved={(savedAuthor) => {
                        setAuthors(prev =>
                            prev.map(author =>
                                author.id === savedAuthor.id
                                    ? savedAuthor
                                    : author
                            )
                        );

                        setEditingAuthor(null);
                        setSelectedAuthors(new Set());
                    }}
                />

                <div className="author-list">
                    <div className="author-rows">
                        {authors.map((author) => (
                            <div
                                key={author.id}
                                className={`author-row ${
                                    selectedAuthors.has(author.id)
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => toggleAuthor(author.id)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedAuthors.has(author.id)}
                                    onChange={() => toggleAuthor(author.id)}
                                    onClick={(event) => event.stopPropagation()}
                                />

                                <span>
                                {" "}{author.first}{" "}
                                    {author.middle
                                        ? author.middle + " "
                                        : ""}
                                    {author.last}
                                    {" "}
                            </span>

                                <span>
                                ({author.birthYear})
                            </span>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedCount > 0 && (
                    <div className="author-actions">
                        {selectedCount === 1 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const id = [...selectedAuthors][0];
                                    const author = authors.find(author => author.id === id);

                                    if (author) {
                                        setEditingAuthor(author);
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

                        {error && (
                            <div className="delete-error">
                                {error}
                            </div>
                        )}

                    </div>
                )}
            </div>
        </main>
    );
}