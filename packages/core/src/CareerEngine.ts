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

export class CareerEngine {
  private profile: PlayerProfile;
  private activeCourses: ActiveCourse[] = [];
  private completedCourses: Course[] = [];
  private currentJob: JobOffer | null = null;

  constructor(profile: PlayerProfile) {
    this.profile = profile;
    // Añadir objeto skills si no existe
    if (!this.profile.skills) {
      this.profile.skills = { technology: 0 };
    }
  }

  enrollCourse(course: Course) {
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
    const remainingCourses: ActiveCourse[] = [];
    
    for (const course of this.activeCourses) {
      course.monthsRemaining--;
      if (course.monthsRemaining <= 0) {
        this.profile.skills.technology += course.xpReward;
        this.completedCourses.push(course);
      } else {
        remainingCourses.push(course);
      }
    }
    this.activeCourses = remainingCourses;
  }

  applyForJob(job: JobOffer) {
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
