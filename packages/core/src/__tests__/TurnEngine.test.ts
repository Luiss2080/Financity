import { PlayerProfile } from '../PlayerProfile';
import { BudgetEngine } from '../BudgetEngine';
import { BankEngine } from '../BankEngine';
import { CareerEngine } from '../CareerEngine';
import { TurnEngine } from '../TurnEngine';

describe('TurnEngine - Phase 4', () => {
  let profile: PlayerProfile;
  let budget: BudgetEngine;
  let bank: BankEngine;
  let career: CareerEngine;
  let turn: TurnEngine;

  beforeEach(() => {
    profile = new PlayerProfile('u1', 'Edwin');
    profile.money = 1500;
    profile.income = 3000;
    
    budget = new BudgetEngine(profile);
    bank = new BankEngine(profile);
    career = new CareerEngine(profile);
    
    turn = new TurnEngine(profile, budget, bank, career);
  });

  it('RF-30: Debería procesar un mes sumando ingresos y restando gastos', () => {
    budget.addExpense('Alquiler', 1000);
    budget.addExpense('Comida', 500);
    // Gastos = 1500, Ingresos = 3000 -> Liquidez += 1500

    turn.nextMonth();

    expect(profile.money).toBe(3000); // 1500 inicial + 1500 de ahorro
  });

  it('RF-31: Debería procesar el pago automático del banco', () => {
    bank.requestLoan(1000, 0.10, 10); // Préstamo 1000. Recibe 1000. Cuota 110.
    // profile.money ahora es 2500 (1500+1000)
    // Ingresos 3000, sin gastos.

    turn.nextMonth();

    // 2500 inicial + 3000 ingresos - 110 cuota = 5390
    expect(profile.money).toBe(5390);
  });

  it('RF-32: Debería avanzar el tiempo de los cursos', () => {
    career.enrollCourse({ id: 'c1', name: 'Curso', cost: 100, durationMonths: 1, xpReward: 10 });
    // profile.money es 1400. 
    
    turn.nextMonth();

    expect(career.getActiveCourses().length).toBe(0);
    expect(career.getCompletedCourses().length).toBe(1);
    expect(profile.skills.technology).toBe(10);
  });

  it('RF-33: Debería lanzar Bancarrota si los gastos y préstamos superan la liquidez + ingresos', () => {
    profile.money = 0;
    profile.income = 0;
    
    // Al pedir préstamo se añade al profile.money
    bank.requestLoan(100000, 0.20, 5); // Cuota gigante = 24000
    // profile.money es 100000. Así que gastamos ese dinero para no poder pagar la cuota.
    profile.money = 0;
    
    expect(() => turn.nextMonth()).toThrow('Bancarrota: No tienes dinero para cubrir tus gastos.');
  });
});
