import { PlayerProfile } from '../PlayerProfile';
import { BudgetEngine } from '../BudgetEngine';
import { BankEngine } from '../BankEngine';
import { ScoreEngine } from '../ScoreEngine';

describe('ScoreEngine - Phase 7', () => {
  let profile: PlayerProfile;
  let budget: BudgetEngine;
  let bank: BankEngine;
  let score: ScoreEngine;

  beforeEach(() => {
    profile = new PlayerProfile('u1', 'Edwin');
    budget = new BudgetEngine(profile);
    bank = new BankEngine(profile);
    score = new ScoreEngine(profile, budget, bank);
  });

  it('RF-38: Debería calcular la salud financiera inicial correcta', () => {
    profile.income = 3000;
    budget.addExpense('Renta', 1000); // 33% del income (Bueno)
    profile.money = 6000; // Fondo emergencia de 6 meses (Excelente)

    const health = score.calculateFinancialHealth();

    // Como ahorra y su deuda es baja, debería estar por encima de 80.
    expect(health).toBeGreaterThanOrEqual(80);
    expect(health).toBeLessThanOrEqual(100);
  });

  it('RF-39: Debería penalizar si las deudas superan el 40% de los ingresos', () => {
    profile.income = 3000;
    bank.requestLoan(10000, 0.1, 5); // Cuota ~ 2200 (73% del ingreso) -> Peligroso

    const health = score.calculateFinancialHealth();
    expect(health).toBeLessThan(50); // Salud deficiente
  });

  it('RF-40: Debería devolver 0 si no hay ingresos pero hay gastos', () => {
    profile.income = 1000;
    budget.addExpense('Comida', 500);
    profile.income = 0; // Se queda desempleado

    const health = score.calculateFinancialHealth();
    expect(health).toBe(0);
  });
});
