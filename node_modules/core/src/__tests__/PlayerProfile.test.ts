import { PlayerProfile } from '../PlayerProfile';

describe('PlayerProfile - RF-1 y RF-2', () => {
  it('RF-1: CUANDO un nuevo usuario se registra, EL SISTEMA inicializa su perfil', () => {
    const profile = new PlayerProfile('User123', 'Edwin');
    
    expect(profile.age).toBe(18);
    expect(profile.money).toBe(1500);
    expect(profile.income).toBe(0);
    expect(profile.savings).toBe(0);
    expect(profile.debt).toBe(0);
  });

  it('RF-2: CUANDO el jugador selecciona la oferta laboral, EL SISTEMA actualiza sus ingresos', () => {
    const profile = new PlayerProfile('User123', 'Edwin');
    profile.addIncome(2500);
    
    expect(profile.income).toBe(2500);
  });
});
