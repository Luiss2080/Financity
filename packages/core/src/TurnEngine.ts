import { PlayerProfile } from './PlayerProfile';
import { BudgetEngine } from './BudgetEngine';
import { BankEngine } from './BankEngine';
import { CareerEngine } from './CareerEngine';

export class TurnEngine {
  constructor(
    private profile: PlayerProfile,
    private budget: BudgetEngine,
    private bank: BankEngine,
    private career: CareerEngine
  ) {}

  public nextMonth() {
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
