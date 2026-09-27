import { PlayerProfile } from '../PlayerProfile';
import { BankEngine } from '../BankEngine';

describe('BankEngine - Phase 2', () => {
  let profile: PlayerProfile;
  let bank: BankEngine;

  beforeEach(() => {
    profile = new PlayerProfile('user-1', 'Edwin');
    // Player starts with 1500 as per specs
    bank = new BankEngine(profile);
  });

  it('RF-18: Debería permitir solicitar un préstamo y calcular el total a pagar con interés', () => {
    // Pedir Bs 10.000 al 10%
    bank.requestLoan(10000, 0.10);
    
    expect(profile.money).toBe(11500); // 1500 + 10000
    expect(bank.getActiveLoans().length).toBe(1);
    expect(bank.getActiveLoans()[0].totalOwed).toBe(11000); // 10k + 10% interest
  });

  it('RF-18: Debería amortizar la deuda mes a mes y afectar los fondos', () => {
    bank.requestLoan(10000, 0.10, 10); // 10 meses plazo -> cuota = 1100/mes
    
    // Simular el pago mensual automático
    bank.processMonthlyPayments();

    expect(profile.money).toBe(10400); // 11500 - 1100
    expect(bank.getActiveLoans()[0].remaining).toBe(9900); // 11000 - 1100
  });

  it('RF-20: Debería lanzar alerta si el pago del préstamo supera el disponible mensual', () => {
    bank.requestLoan(50000, 0.20, 5); // Cuota gigante: (50k*1.2)/5 = 12000
    
    expect(() => {
      bank.processMonthlyPayments();
    }).toThrow('Bancarrota: Fondos insuficientes para cubrir cuotas bancarias.');
  });
});
