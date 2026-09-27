import { PlayerProfile } from './PlayerProfile';
export interface Loan {
    id: string;
    principal: number;
    interestRate: number;
    months: number;
    totalOwed: number;
    remaining: number;
    monthlyPayment: number;
}
export declare class BankEngine {
    private profile;
    private loans;
    constructor(profile: PlayerProfile);
    requestLoan(amount: number, interestRate: number, months?: number): Loan;
    getActiveLoans(): Loan[];
    processMonthlyPayments(): void;
}
