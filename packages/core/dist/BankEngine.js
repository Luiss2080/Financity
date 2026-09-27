"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankEngine = void 0;
class BankEngine {
    profile;
    loans = [];
    constructor(profile) {
        this.profile = profile;
    }
    requestLoan(amount, interestRate, months = 12) {
        const totalOwed = amount * (1 + interestRate);
        const monthlyPayment = totalOwed / months;
        const loan = {
            id: Math.random().toString(36).substring(7),
            principal: amount,
            interestRate,
            months,
            totalOwed,
            remaining: totalOwed,
            monthlyPayment
        };
        this.loans.push(loan);
        // Añadimos liquidez al jugador
        this.profile.money += amount;
        return loan;
    }
    getActiveLoans() {
        return this.loans.filter(l => l.remaining > 0);
    }
    processMonthlyPayments() {
        for (const loan of this.getActiveLoans()) {
            if (this.profile.money < loan.monthlyPayment) {
                throw new Error('Bancarrota: Fondos insuficientes para cubrir cuotas bancarias.');
            }
            this.profile.money -= loan.monthlyPayment;
            loan.remaining -= loan.monthlyPayment;
            // Precisión de coma flotante
            if (loan.remaining < 0.01) {
                loan.remaining = 0;
            }
        }
    }
}
exports.BankEngine = BankEngine;
