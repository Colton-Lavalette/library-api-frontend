import React, { useEffect, useState } from 'react';
import { Genre } from '../../types/Genre';
import './GenreForm.css';


interface GenreFormProps {
    genre?: Genre;
    onGenreSaved: (genre: Genre) => void;
}

function GenreForm({ genre, onGenreSaved }: GenreFormProps) {
    const [formData, setFormData] = useState({
        name: ''
    });

    useEffect(() => {
        if (genre) {
            setFormData({
                name: genre.name
            });
        }
    }, [genre]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            if (genre) {
                const response = await fetch(
                    `http://localhost:8080/genres/${genre.id}`,
                    {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData),
                    }
                );

                if (!response.ok) {
                    const error = await response.json();
                    console.error(
                        'Failed to update genre:',
                        error.message || response.status
                    );
                    return;
                }

                const responseBody = await response.json();
                const updatedGenre = responseBody.data;

                onGenreSaved(updatedGenre);
            } else {
                const response = await fetch('http://localhost:8080/genres', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.error(
                        'Failed to create genre:',
                        error.message || response.status
                    );
                    return;
                }

                const responseBody = await response.json();
                const createdGenre = responseBody.data;

                onGenreSaved(createdGenre);
            }

            setFormData({
                name: ''
            });
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="genre-form">
            <h2>{genre ? "Edit Genre" : "Add Genre"}</h2>
            <label>
                Genre Name:
                <input required type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <button type="submit">
                {genre ? "Update" : "Submit"}
            </button>
        </form>
    );

}

export default GenreForm;