"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerProfile = void 0;
class PlayerProfile {
    userId;
    name;
    age = 18;
    money = 1500;
    income = 0;
    savings = 0;
    debt = 0;
    constructor(userId, name) {
        this.userId = userId;
        this.name = name;
    }
    addIncome(amount) {
        if (amount < 0)
            throw new Error("Income amount cannot be negative");
        this.income += amount;
    }
}
exports.PlayerProfile = PlayerProfile;
