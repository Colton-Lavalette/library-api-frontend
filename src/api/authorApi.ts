import { Author } from "../types/Author";

async function handleError(response: Response, fallback: string): Promise<never> {
    const error = await response.json();

    throw new Error(error.message || fallback);
}

export async function getAuthors(): Promise<Author[]> {
    const response = await fetch("http://localhost:8080/authors");

    if (!response.ok) {
        await handleError(response, "Failed to fetch authors");
    }

    const json = await response.json();

    return json.data;
}

export async function searchAuthors(
    first?: string,
    last?: string,
    birthYear?: number
): Promise<Author[]> {
    const params = new URLSearchParams();

    if (first) {
        params.append("first", first);
    }

    if (last) {
        params.append("last", last);
    }

    if (birthYear !== undefined) {
        params.append("birthYear", birthYear.toString());
    }

    const response = await fetch(
        `http://localhost:8080/authors?${params.toString()}`
    );

    if (!response.ok) {
        await handleError(response, "Failed to search authors");
    }

    const json = await response.json();

    return json.data;
}

export async function deleteAuthor(id: number): Promise<void> {
    const response = await fetch(`http://localhost:8080/authors/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        await handleError(response, "Failed to delete author");
    }
}

export async function updateAuthor(
    id: number,
    author: {
        first?: string;
        middle?: string;
        last?: string;
        birthYear?: number;
    }
): Promise<Author> {
    const response = await fetch(`http://localhost:8080/authors/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(author),
    });

    if (!response.ok) {
        await handleError(response, "Failed to update author");
    }

    const json = await response.json();

    return json.data;
}