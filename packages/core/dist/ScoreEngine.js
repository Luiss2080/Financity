"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreEngine = void 0;
class ScoreEngine {
    profile;
    budget;
    bank;
    constructor(profile, budget, bank) {
        this.profile = profile;
        this.budget = budget;
        this.bank = bank;
    }
    calculateFinancialHealth() {
        let score = 100;
        const totalIncome = this.profile.income;
        const totalExpenses = this.budget.getTotalExpenses();
        const totalDebtInstallments = this.bank.getActiveLoans().reduce((sum, loan) => sum + loan.monthlyPayment, 0);
        const availableMoney = this.profile.money;
        if (totalIncome === 0) {
            if (totalExpenses > 0 || totalDebtInstallments > 0)
                return 0;
            return 50; // Sin ingresos ni gastos, estado neutral
        }
        // 1. Regla 50/30/20: Gastos Fijos no deberían superar el 50%
        const expenseRatio = totalExpenses / totalIncome;
        if (expenseRatio > 0.5)
            score -= (expenseRatio - 0.5) * 100;
        // 2. Capacidad de endeudamiento: Las cuotas no deberían superar el 30%
        const debtRatio = totalDebtInstallments / totalIncome;
        if (debtRatio > 0.3)
            score -= (debtRatio - 0.3) * 150; // Mayor penalización
        // 3. Fondo de Emergencia: Idealmente tener 3 a 6 meses de gastos
        const monthlyObligations = totalExpenses + totalDebtInstallments;
        if (monthlyObligations > 0) {
            const emergencyMonths = availableMoney / monthlyObligations;
            if (emergencyMonths < 1)
                score -= 30;
            else if (emergencyMonths < 3)
                score -= 10;
            else if (emergencyMonths >= 6)
                score = Math.min(100, score + 10); // Bono por precaución
        }
        // Asegurarse de que el score esté entre 0 y 100
        return Math.max(0, Math.min(100, Math.round(score)));
    }
}
exports.ScoreEngine = ScoreEngine;
