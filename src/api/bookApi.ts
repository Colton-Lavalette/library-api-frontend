import { Book } from "../types/Book";

async function handleError(response: Response, fallback: string): Promise<never> {
    const error = await response.json();

    throw new Error(error.message || fallback);
}

export async function getBooks(): Promise<Book[]> {
    const response = await fetch("http://localhost:8080/books");

    if (!response.ok) {
        await handleError(response, "Failed to fetch books");
    }

    const json = await response.json();

    return json.data;
}

export async function deleteBook(id: number): Promise<void> {
    const response = await fetch(`http://localhost:8080/books/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        await handleError(response, "Failed to delete book");
    }
}
