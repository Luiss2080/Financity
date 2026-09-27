export declare class PlayerProfile {
    readonly userId: string;
    readonly name: string;
    age: number;
    money: number;
    income: number;
    savings: number;
    debt: number;
    constructor(userId: string, name: string);
    addIncome(amount: number): void;
}
