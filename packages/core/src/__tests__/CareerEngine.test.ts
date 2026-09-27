import { PlayerProfile } from '../PlayerProfile';
import { CareerEngine, Course, JobOffer } from '../CareerEngine';

describe('CareerEngine - Phase 3', () => {
  let profile: PlayerProfile;
  let career: CareerEngine;

  beforeEach(() => {
    profile = new PlayerProfile('u1', 'Edwin');
    profile.money = 2000; // Fondos para el test
    career = new CareerEngine(profile);
  });

  it('RF-25: Debería permitir inscribirse a un curso y ganar experiencia', () => {
    const course: Course = { id: 'c1', name: 'Programación Básica', cost: 800, durationMonths: 2, xpReward: 15 };
    
    career.enrollCourse(course);
    
    expect(profile.money).toBe(1200); // 2000 - 800
    expect(career.getActiveCourses().length).toBe(1);

    // Simular que pasaron los 2 meses
    career.processMonthlyProgress();
    career.processMonthlyProgress();

    expect(career.getActiveCourses().length).toBe(0);
    expect(career.getCompletedCourses().length).toBe(1);
    expect(profile.skills.technology).toBe(15);
  });

  it('RF-26: Debería bloquear inscripción si no hay fondos', () => {
    profile.money = 100;
    const course: Course = { id: 'c2', name: 'Master en Finanzas', cost: 2000, durationMonths: 3, xpReward: 30 };
    
    expect(() => career.enrollCourse(course)).toThrow('Fondos insuficientes para pagar el curso.');
  });

  it('RF-27: Debería permitir obtener un empleo si se cumplen los requisitos', () => {
    // Simulamos que el jugador ya estudió
    profile.skills.technology = 20;

    const job: JobOffer = { id: 'j1', title: 'Desarrollador Junior', salary: 3500, requiredSkill: 15 };
    
    career.applyForJob(job);

    expect(profile.income).toBe(3500);
    expect(career.getCurrentJob()?.title).toBe('Desarrollador Junior');
  });

  it('RF-28: Debería rechazar postulación si no cumple habilidades', () => {
    const job: JobOffer = { id: 'j2', title: 'Director Ejecutivo', salary: 15000, requiredSkill: 100 };
    
    expect(() => career.applyForJob(job)).toThrow('No cumples con la experiencia requerida para este puesto.');
  });
});
