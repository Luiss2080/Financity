import { PlayerProfile } from './PlayerProfile';
interface Expense {
    name: string;
    amount: number;
}
export declare class BudgetEngine {
    private profile;
    private expenses;
    constructor(profile: PlayerProfile);
    addExpense(name: string, amount: number): void;
    getExpenses(): Expense[];
    getTotalExpenses(): number;
    getAvailableMoney(): number;
}
export {};
