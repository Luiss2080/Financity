"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionEngine = void 0;
class MissionEngine {
    profile;
    missions = [];
    constructor(profile) {
        this.profile = profile;
    }
    addMission(mission) {
        this.missions.push(mission);
    }
    getMissions() {
        return this.missions;
    }
    checkMissions() {
        const completedNow = [];
        for (const mission of this.missions) {
            if (mission.isCompleted)
                continue;
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
exports.MissionEngine = MissionEngine;
