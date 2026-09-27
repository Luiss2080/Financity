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
export declare class MissionEngine {
    private profile;
    private missions;
    constructor(profile: PlayerProfile);
    addMission(mission: Mission): void;
    getMissions(): Mission[];
    checkMissions(): Mission[];
}
