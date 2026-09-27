import { PlayerProfile } from '../PlayerProfile';
import { MissionEngine, Mission } from '../MissionEngine';

describe('MissionEngine - Phase 5', () => {
  let profile: PlayerProfile;
  let missionEngine: MissionEngine;

  beforeEach(() => {
    profile = new PlayerProfile('u1', 'Edwin');
    profile.income = 0;
    profile.money = 1500;
    missionEngine = new MissionEngine(profile);
  });

  it('RF-35: Debería validar que la misión de conseguir empleo se cumpla al tener ingresos', () => {
    const mission: Mission = {
      id: 'm1',
      title: 'Consigue tu primer empleo',
      type: 'INCOME_GREATER_THAN',
      targetValue: 0,
      xpReward: 50,
      moneyReward: 500,
      isCompleted: false
    };

    missionEngine.addMission(mission);
    
    // Antes de tener ingresos
    missionEngine.checkMissions();
    expect(missionEngine.getMissions()[0].isCompleted).toBe(false);

    // Conseguir empleo
    profile.income = 2500;
    
    const rewards = missionEngine.checkMissions();
    
    expect(missionEngine.getMissions()[0].isCompleted).toBe(true);
    expect(rewards.length).toBe(1);
    expect(rewards[0].moneyReward).toBe(500);
    // Verificar que se entregó la recompensa
    expect(profile.money).toBe(2000); // 1500 + 500
    expect(profile.skills.technology).toBe(50); // Empieza en 0 + 50
  });

  it('RF-36: Debería validar la misión de ahorro', () => {
    const mission: Mission = {
      id: 'm2',
      title: 'Ahorra tus primeros 1000',
      type: 'MONEY_GREATER_THAN',
      targetValue: 1000,
      xpReward: 10,
      moneyReward: 100,
      isCompleted: false
    };

    profile.money = 500; // No cumple aún
    missionEngine.addMission(mission);
    missionEngine.checkMissions();
    expect(missionEngine.getMissions()[0].isCompleted).toBe(false);

    profile.money = 1100; // Ya cumple
    missionEngine.checkMissions();
    expect(missionEngine.getMissions()[0].isCompleted).toBe(true);
    expect(profile.money).toBe(1200); // 1100 + 100 reward
  });
});
