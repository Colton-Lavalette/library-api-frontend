import { Genre } from "../types/Genre";

async function handleError(response: Response, fallback: string): Promise<never> {
    const error = await response.json();

    throw new Error(error.message || fallback);
}

export async function getGenres(): Promise<Genre[]> {
    const response = await fetch("http://localhost:8080/genres");

    if (!response.ok) {
        await handleError(response, "Failed to fetch genres");
    }

    const json = await response.json();

    return json.data;
}

export async function deleteGenre(id: number): Promise<void> {
    const response = await fetch(`http://localhost:8080/genres/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        await handleError(response, "Failed to delete genre");
    }
}
