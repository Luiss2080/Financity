import { PlayerProfile } from './PlayerProfile';
import { BudgetEngine } from './BudgetEngine';
import { BankEngine } from './BankEngine';
import { CareerEngine } from './CareerEngine';
export declare class TurnEngine {
    private profile;
    private budget;
    private bank;
    private career;
    constructor(profile: PlayerProfile, budget: BudgetEngine, bank: BankEngine, career: CareerEngine);
    nextMonth(): void;
}
