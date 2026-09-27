export class PlayerProfile {
  public readonly userId: string;
  public readonly name: string;
  public age: number = 18;
  public money: number = 1500;
  public income: number = 0;
  public savings: number = 0;
  public debt: number = 0;
  public skills: Record<string, number> = { technology: 0 };

  constructor(userId: string, name: string) {
    this.userId = userId;
    this.name = name;
  }

  public addIncome(amount: number): void {
    if (amount < 0) throw new Error("Income amount cannot be negative");
    this.income += amount;
  }
}
