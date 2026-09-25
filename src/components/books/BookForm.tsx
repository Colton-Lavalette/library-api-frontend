import React, { useEffect, useState } from 'react';
import { Book } from '../../types/Book';
import './BookForm.css';


interface BookFormProps {
    book?: Book;
    onBookSaved: (book: Book) => void;
}

function BookForm({ book, onBookSaved }: BookFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        isbn: '',
        publishedYear: ''
    });

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title,
                isbn: book.isbn,
                publishedYear: book.publishedYear.toString()
            });
        }
    }, [book]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        let parsedValue: string | number = value;

        if (name === 'publishedYear') {
            parsedValue = value === '' ? '' : Number(value);
        }

        setFormData(prev => ({ ...prev, [name]: parsedValue }));
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            if (book) {
                const response = await fetch(
                    `http://localhost:8080/books/${book.id}`,
                    {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    }
                );

                if (!response.ok) {
                    const error = await response.json();
                    console.error(
                        'Failed to update book:',
                        error.message || response.status
                    );
                    return;
                }

                const responseBody = await response.json();
                const updatedBook = responseBody.data;

                onBookSaved(updatedBook);
            } else {
                const response = await fetch('http://localhost:8080/books', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.error(
                        'Failed to create book:',
                        error.message || response.status
                    );
                    return;
                }

                const responseBody = await response.json();
                const createdBook = responseBody.data;

                onBookSaved(createdBook);
            }

            setFormData({
                title: '',
                isbn: '',
                publishedYear: '',
            });
        } catch (error) {
            console.error('Network error:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="book-form">
            <h2>{book ? "Edit Book" : "Add Book"}</h2>
            <label>
                Book Title:
                <input required type="text" name="title" value={formData.title} onChange={handleChange} />
            </label>
            <label>
                ISBN:
                <input required type="text" name="isbn" value={formData.isbn} onChange={handleChange} />
            </label>
            <label>
                Published Year:
                <input required type="number" name="publishedYear" value={formData.publishedYear} onChange={handleChange} />
            </label>
            <button type="submit">
                {book ? "Update" : "Submit"}
            </button>
        </form>
    );

}

export default BookForm;