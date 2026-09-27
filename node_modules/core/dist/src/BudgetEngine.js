"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetEngine = void 0;
class BudgetEngine {
    profile;
    expenses = [];
    constructor(profile) {
        this.profile = profile;
    }
    addExpense(name, amount) {
        if (this.getTotalExpenses() + amount > this.profile.income) {
            throw new Error('Presupuesto en déficit');
        }
        this.expenses.push({ name, amount });
    }
    getTotalExpenses() {
        return this.expenses.reduce((total, expense) => total + expense.amount, 0);
    }
    getAvailableMoney() {
        return this.profile.income - this.getTotalExpenses();
    }
}
exports.BudgetEngine = BudgetEngine;
