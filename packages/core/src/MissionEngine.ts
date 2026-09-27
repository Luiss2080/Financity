import { PlayerProfile } from './PlayerProfile';

export interface Mission {
  id: string;
  title: string;
  type: 'INCOME_GREATER_THAN' | 'MONEY_GREATER_THAN' | 'SKILL_GREATER_THAN';
  targetValue: number;
  xpReward: number;
  moneyReward: number;
  isCompleted: boolean;
}

export class MissionEngine {
  private missions: Mission[] = [];

  constructor(private profile: PlayerProfile) {}

  addMission(mission: Mission) {
    this.missions.push(mission);
  }

  getMissions() {
    return this.missions;
  }

  checkMissions(): Mission[] {
    const completedNow: Mission[] = [];

    for (const mission of this.missions) {
      if (mission.isCompleted) continue;

      let achieved = false;
      switch (mission.type) {
        case 'INCOME_GREATER_THAN':
          achieved = this.profile.income > mission.targetValue;
          break;
        case 'MONEY_GREATER_THAN':
          achieved = this.profile.money >= mission.targetValue;
          break;
        case 'SKILL_GREATER_THAN':
          achieved = this.profile.skills.technology >= mission.targetValue;
          break;
      }

      if (achieved) {
        mission.isCompleted = true;
        this.profile.money += mission.moneyReward;
        this.profile.skills.technology += mission.xpReward;
        completedNow.push(mission);
      }
    }

    return completedNow; // Devuelve las recién completadas para mostrar notificaciones en la UI
  }
}
