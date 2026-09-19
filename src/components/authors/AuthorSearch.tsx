import React, { useState } from 'react';
import { Author } from '../../types/Author';
import { searchAuthors } from '../../api/authorApi';
import './AuthorSearch.css';

interface AuthorSearchProps {
    onSearchResults: (authors: Author[]) => void;
    onClearSearch: () => void;
}

function AuthorSearch({ onSearchResults, onClearSearch }: AuthorSearchProps) {
    const [formData, setFormData] = useState({
        first: '',
        last: '',
        birthYear: '',
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const authors = await searchAuthors(
                formData.first || undefined,
                formData.last || undefined,
                formData.birthYear ? Number(formData.birthYear) : undefined
            );

            onSearchResults(authors);
        } catch (error) {
            console.error('Failed to search authors:', error);
        }
    }

    function handleClear() {
        setFormData({
            first: '',
            last: '',
            birthYear: '',
        });

        onClearSearch();
    }

    return (
        <section className="author-search">
            <h2>Search Authors</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    First Name
                    <input
                        type="text"
                        name="first"
                        value={formData.first}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Last Name
                    <input
                        type="text"
                        name="last"
                        value={formData.last}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Birth Year
                    <input
                        type="number"
                        name="birthYear"
                        value={formData.birthYear}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">
                    Search
                </button>

                <button type="button" onClick={handleClear}>
                    Clear
                </button>
            </form>
        </section>
    );
}

export default AuthorSearch;