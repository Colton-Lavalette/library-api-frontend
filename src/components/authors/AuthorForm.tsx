import React, { useEffect, useState } from 'react';
import { Author } from '../../types/Author';
import './AuthorForm.css';


interface AuthorFormProps {
    author?: Author;
    onAuthorSaved: (author: Author) => void;
}

function AuthorForm({ author, onAuthorSaved }: AuthorFormProps) {
    const [formData, setFormData] = useState({
        first: '',
        middle: '',
        last: '',
        birthYear: '',
    });

    useEffect(() => {
        if (author) {
            setFormData({
                first: author.first,
                middle: author.middle ?? '',
                last: author.last,
                birthYear: author.birthYear.toString(),
            });
        }
    }, [author]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        let parsedValue: string | number = value;

        if (name === 'birthYear') {
            parsedValue = value === '' ? '' : Number(value);
        }

        setFormData(prev => ({ ...prev, [name]: parsedValue }));
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            if (author) {
                const response = await fetch(
                    `http://localhost:8080/authors/${author.id}`,
                    {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData),
                    }
                );

                if (!response.ok) {
                    const error = await response.json();
                    console.error(
                        'Failed to update author:',
                        error.message || response.status
                    );
                    return;
                }

                const responseBody = await response.json();
                const updatedAuthor = responseBody.data;

                onAuthorSaved(updatedAuthor);
            } else {
                const response = await fetch('http://localhost:8080/authors', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.error(
                        'Failed to create author:',
                        error.message || response.status
                    );
                    return;
                }

                const responseBody = await response.json();
                const createdAuthor = responseBody.data;

                onAuthorSaved(createdAuthor);
            }

            setFormData({
                first: '',
                middle: '',
                last: '',
                birthYear: '',
            });
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="author-form">
            <h2>{author ? "Edit Author" : "Add Author"}</h2>
            <label>
                First Name:
                <input required type="text" name="first" value={formData.first} onChange={handleChange} />
            </label>
            <label>
                Middle Name:
                <input type="text" name="middle" value={formData.middle} onChange={handleChange} />
            </label>
            <label>
                Last Name:
                <input required type="text" name="last" value={formData.last} onChange={handleChange} />
            </label>
            <label>
                Birth Year:
                <input required type="number" name="birthYear" value={formData.birthYear} onChange={handleChange} />
            </label>
            <button type="submit">
                {author ? "Update" : "Submit"}
            </button>
        </form>
    );

}

export default AuthorForm;