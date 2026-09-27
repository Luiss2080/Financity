"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareerEngine = void 0;
class CareerEngine {
    profile;
    activeCourses = [];
    completedCourses = [];
    currentJob = null;
    constructor(profile) {
        this.profile = profile;
        // Añadir objeto skills si no existe
        if (!this.profile.skills) {
            this.profile.skills = { technology: 0 };
        }
    }
    enrollCourse(course) {
        if (this.profile.money < course.cost) {
            throw new Error('Fondos insuficientes para pagar el curso.');
        }
        this.profile.money -= course.cost;
        this.activeCourses.push({
            ...course,
            monthsRemaining: course.durationMonths
        });
    }
    processMonthlyProgress() {
        // Crear nueva lista excluyendo los terminados
        const remainingCourses = [];
        for (const course of this.activeCourses) {
            course.monthsRemaining--;
            if (course.monthsRemaining <= 0) {
                this.profile.skills.technology += course.xpReward;
                this.completedCourses.push(course);
            }
            else {
                remainingCourses.push(course);
            }
        }
        this.activeCourses = remainingCourses;
    }
    applyForJob(job) {
        if (this.profile.skills.technology < job.requiredSkill) {
            throw new Error('No cumples con la experiencia requerida para este puesto.');
        }
        this.currentJob = job;
        this.profile.income = job.salary;
    }
    getActiveCourses() { return this.activeCourses; }
    getCompletedCourses() { return this.completedCourses; }
    getCurrentJob() { return this.currentJob; }
}
exports.CareerEngine = CareerEngine;
