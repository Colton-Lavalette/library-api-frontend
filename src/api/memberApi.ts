import { Member } from "../types/Member";

async function handleError(response: Response, fallback: string): Promise<never> {
    const error = await response.json();

    throw new Error(error.message || fallback);
}

export async function getMembers(): Promise<Member[]> {
    const response = await fetch("http://localhost:8080/members");

    if (!response.ok) {
        await handleError(response, "Failed to fetch members");
    }

    const json = await response.json();

    return json.data;
}

export async function deleteMember(memberCode: string): Promise<void> {
    const response = await fetch(`http://localhost:8080/members/${memberCode}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        await handleError(response, "Failed to delete member");
    }
}
