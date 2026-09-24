import { useEffect, useState } from "react";
import { Genre } from "../types/Genre";
import { getGenres, deleteGenre } from "../api/genreApi";
import './Genres.css';
import GenreForm from "../components/genres/GenreForm";

export default function Genres() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<Set<number>>(new Set());
    const [editingGenre, setEditingGenre] = useState<Genre | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getGenres()
            .then(setGenres)
            .catch((error) => console.error(error));
    }, []);

    function toggleGenre(id: number) {
        setSelectedGenres(prev => {
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

            for (const id of selectedGenres) {
                await deleteGenre(id);
            }

            setGenres(prev =>
                prev.filter(genre => !selectedGenres.has(genre.id))
            );

            setSelectedGenres(new Set());
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to delete Genre");
        }
    }

    const selectedCount = selectedGenres.size;

    return (
        <main>
            <h1>Genres</h1>

            <div className="genres-layout">
                <GenreForm
                    genre={editingGenre ?? undefined}
                    onGenreSaved={(savedGenre) => {
                        setGenres(prev =>
                            prev.map(genre =>
                                genre.id === savedGenre.id
                                    ? savedGenre
                                    : genre
                            )
                        );

                        setEditingGenre(null);
                        setSelectedGenres(new Set());
                    }}
                />

                <div className="genre-list">
                    <div className="genre-rows">
                        {genres.map((genre) => (
                            <div
                                key={genre.id}
                                className={`genre-row ${
                                    selectedGenres.has(genre.id)
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => toggleGenre(genre.id)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedGenres.has(genre.id)}
                                    onChange={() => toggleGenre(genre.id)}
                                    onClick={(event) => event.stopPropagation()}
                                />

                                <span>
                                {" "}{genre.name}{" "}
                            </span>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedCount > 0 && (
                    <div className="genre-actions">
                        {selectedCount === 1 && (
                            <button
                                type="button"
                                onClick={() => {
                                    const id = [...selectedGenres][0];
                                    const genre = genres.find(genre => genre.id === id);

                                    if (genre) {
                                        setEditingGenre(genre);
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