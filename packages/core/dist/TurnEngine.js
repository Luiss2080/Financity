"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnEngine = void 0;
class TurnEngine {
    profile;
    budget;
    bank;
    career;
    constructor(profile, budget, bank, career) {
        this.profile = profile;
        this.budget = budget;
        this.bank = bank;
        this.career = career;
    }
    nextMonth() {
        const totalExpenses = this.budget.getTotalExpenses();
        const bankInstallments = this.bank.getActiveLoans().reduce((sum, loan) => sum + loan.monthlyPayment, 0);
        const requiredMoney = totalExpenses + bankInstallments;
        // Sumar ingresos
        this.profile.money += this.profile.income;
        // Verificar si puede pagar sus obligaciones
        if (this.profile.money < requiredMoney) {
            // Revertimos el ingreso para simular que no pasó el mes porque quebró
            this.profile.money -= this.profile.income;
            throw new Error('Bancarrota: No tienes dinero para cubrir tus gastos.');
        }
        // Pagar gastos corrientes
        this.profile.money -= totalExpenses;
        // Procesar préstamos bancarios
        this.bank.processMonthlyPayments();
        // Avanzar estudios
        this.career.processMonthlyProgress();
    }
}
exports.TurnEngine = TurnEngine;
