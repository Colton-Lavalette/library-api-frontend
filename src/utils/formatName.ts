export interface PersonName {
    lastName: string;
    firstName?: string | null;
    middleName?: string | null;
}

export function formatName(p: PersonName): string {
    const given = [p.firstName, p.middleName].filter(Boolean).join(" ");
    return [p.lastName, given].filter(Boolean).join(", ");
}

export function compareNames(a: PersonName, b: PersonName): number {
    return (
        a.lastName.localeCompare(b.lastName) ||
        (a.firstName ?? "").localeCompare(b.firstName ?? "") ||
        (a.middleName ?? "").localeCompare(b.middleName ?? "")
    );
}