import { PlayerProfile } from './PlayerProfile';

export interface Loan {
  id: string;
  principal: number;
  interestRate: number;
  months: number;
  totalOwed: number;
  remaining: number;
  monthlyPayment: number;
}

export class BankEngine {
  private profile: PlayerProfile;
  private loans: Loan[] = [];

  constructor(profile: PlayerProfile) {
    this.profile = profile;
  }

  requestLoan(amount: number, interestRate: number, months: number = 12): Loan {
    const totalOwed = amount * (1 + interestRate);
    const monthlyPayment = totalOwed / months;

    const loan: Loan = {
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

  getActiveLoans(): Loan[] {
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
