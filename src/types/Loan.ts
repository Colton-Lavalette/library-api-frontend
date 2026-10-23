export interface Loan {
    id: number;
    memberName: string;
    bookTitle: string;
    copyCode: string;
    loanDate: string;
    dueDate: string;
    returnDate: string | null;
}
