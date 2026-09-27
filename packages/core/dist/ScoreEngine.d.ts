import { PlayerProfile } from './PlayerProfile';
import { BudgetEngine } from './BudgetEngine';
import { BankEngine } from './BankEngine';
export declare class ScoreEngine {
    private profile;
    private budget;
    private bank;
    constructor(profile: PlayerProfile, budget: BudgetEngine, bank: BankEngine);
    calculateFinancialHealth(): number;
}
