import { BookCopy } from "../types/BookCopy";

const BOOKS_BASE = "http://localhost:8080/books";
const COPIES_BASE = "http://localhost:8080/book-copies";

async function handleError(response: Response, fallback: string): Promise<never> {
    const error = await response.json();

    throw new Error(error.message || fallback);
}

// inCirculation is optional; pass true or false to filter, or omit for all copies.
export async function getCopiesForBook(bookId: number, inCirculation?: boolean): Promise<BookCopy[]> {
    const query = inCirculation === undefined ? "" : `?inCirculation=${inCirculation}`;
    const response = await fetch(`${BOOKS_BASE}/${bookId}/copies${query}`);

    if (!response.ok) {
        await handleError(response, "Failed to fetch copies");
    }

    const json = await response.json();

    return json.data;
}

export async function addCopy(bookId: number): Promise<BookCopy> {
    const response = await fetch(`${BOOKS_BASE}/${bookId}/copies`, {
        method: "POST",
    });

    if (!response.ok) {
        await handleError(response, "Failed to add copy");
    }

    const json = await response.json();

    return json.data;
}

export async function getCopyByCode(copyCode: string): Promise<BookCopy> {
    const response = await fetch(`${COPIES_BASE}/code/${copyCode}`);

    if (!response.ok) {
        await handleError(response, "Failed to fetch copy");
    }

    const json = await response.json();

    return json.data;
}
