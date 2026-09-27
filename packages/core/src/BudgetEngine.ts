import { PlayerProfile } from './PlayerProfile';

interface Expense {
  name: string;
  amount: number;
}

export class BudgetEngine {
  private profile: PlayerProfile;
  private expenses: Expense[] = [];

  constructor(profile: PlayerProfile) {
    this.profile = profile;
  }

  public addExpense(name: string, amount: number): void {
    if (this.getTotalExpenses() + amount > this.profile.income) {
      throw new Error('Presupuesto en déficit');
    }
    
    this.expenses.push({ name, amount });
  }

  public getTotalExpenses(): number {
    return this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  public getAvailableMoney(): number {
    return this.profile.income - this.getTotalExpenses();
  }
}
