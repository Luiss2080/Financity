import { PlayerProfile } from './PlayerProfile';
export interface Course {
    id: string;
    name: string;
    cost: number;
    durationMonths: number;
    xpReward: number;
}
export interface ActiveCourse extends Course {
    monthsRemaining: number;
}
export interface JobOffer {
    id: string;
    title: string;
    salary: number;
    requiredSkill: number;
}
export declare class CareerEngine {
    private profile;
    private activeCourses;
    private completedCourses;
    private currentJob;
    constructor(profile: PlayerProfile);
    enrollCourse(course: Course): void;
    processMonthlyProgress(): void;
    applyForJob(job: JobOffer): void;
    getActiveCourses(): ActiveCourse[];
    getCompletedCourses(): Course[];
    getCurrentJob(): JobOffer | null;
}
