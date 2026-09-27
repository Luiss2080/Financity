import { BudgetEngine } from '../BudgetEngine';
import { PlayerProfile } from '../PlayerProfile';

describe('BudgetEngine - RF-3 y RF-4', () => {
  it('RF-3: CUANDO el jugador agrega un gasto, EL SISTEMA resta el valor del disponible', () => {
    const profile = new PlayerProfile('User123', 'Edwin');
    profile.addIncome(2500); // Ingresos de Ayudante

    const engine = new BudgetEngine(profile);
    engine.addExpense('Alquiler', 900);

    expect(engine.getTotalExpenses()).toBe(900);
    expect(engine.getAvailableMoney()).toBe(1600); // 2500 - 900
  });

  it('RF-4: SI los gastos superan ingresos, ENTONCES muestra error Presupuesto en déficit', () => {
    const profile = new PlayerProfile('User123', 'Edwin');
    profile.addIncome(1000);

    const engine = new BudgetEngine(profile);
    
    // Esto debería lanzar el error específico dictado por la spec
    expect(() => {
      engine.addExpense('Hipoteca', 1500);
    }).toThrowError('Presupuesto en déficit');
  });
});
