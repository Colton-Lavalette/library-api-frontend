import { Loan } from "../types/Loan";

const BASE = "http://localhost:8080/loans";

async function handleError(response: Response, fallback: string): Promise<never> {
    const error = await response.json();

    throw new Error(error.message || fallback);
}

export async function getLoans(status?: string): Promise<Loan[]> {
    const url = status ? `${BASE}?status=${encodeURIComponent(status)}` : BASE;
    const response = await fetch(url);

    if (!response.ok) {
        await handleError(response, "Failed to fetch loans");
    }

    const json = await response.json();

    return json.data;
}

export async function getLoan(id: number): Promise<Loan> {
    const response = await fetch(`${BASE}/${id}`);

    if (!response.ok) {
        await handleError(response, "Failed to fetch loan");
    }

    const json = await response.json();

    return json.data;
}

export async function createLoan(loan: Loan): Promise<Loan> {
    const response = await fetch(BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loan),
    });

    if (!response.ok) {
        await handleError(response, "Failed to create loan");
    }

    const json = await response.json();

    return json.data;
}

// Returns a loan by the copy it was made against, matching POST /loans/return.
export async function returnLoan(loan: Loan): Promise<Loan> {
    const response = await fetch(`${BASE}/return`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loan),
    });

    if (!response.ok) {
        await handleError(response, "Failed to return loan");
    }

    const json = await response.json();

    return json.data;
}
