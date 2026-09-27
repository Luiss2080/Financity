import { PlayerProfile } from './PlayerProfile';
export declare class BudgetEngine {
    private profile;
    private expenses;
    constructor(profile: PlayerProfile);
    addExpense(name: string, amount: number): void;
    getTotalExpenses(): number;
    getAvailableMoney(): number;
}
