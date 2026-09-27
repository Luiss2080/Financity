import { Request, Response } from 'express';
import { prisma } from '../../infrastructure/database/prisma';
import { PlayerProfile, CareerEngine } from 'core';

export class CareerController {
  
  static async enrollCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { courseId, name, cost, durationMonths, xpReward } = req.body;

      const profileData = await prisma.playerProfile.findUnique({
        where: { userId: id }
      });
      if (!profileData) throw new Error('Not found');

      const coreProfile = new PlayerProfile(profileData.userId, profileData.name);
      coreProfile.money = profileData.money;
      
      const career = new CareerEngine(coreProfile);

      // Regla de Negocio
      career.enrollCourse({
        id: courseId, name, cost, durationMonths, xpReward
      });

      // Transacción BD
      await prisma.$transaction(async (tx) => {
        await tx.playerCourse.create({
          data: {
            profileId: profileData.id,
            courseId,
            name,
            monthsRemaining: durationMonths,
            xpReward
          }
        });

        // Cobrar al usuario
        await tx.playerProfile.update({
          where: { id: profileData.id },
          data: { money: coreProfile.money }
        });
      });

      res.status(201).json({ message: `Inscrito en ${name}` });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async applyJob(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { jobId, title, salary, requiredSkill } = req.body;

      const profileData = await prisma.playerProfile.findUnique({
        where: { userId: id }
      });
      if (!profileData) throw new Error('Not found');

      const coreProfile = new PlayerProfile(profileData.userId, profileData.name);
      coreProfile.skills = typeof profileData.skills === 'string' ? JSON.parse(profileData.skills) : profileData.skills;
      coreProfile.income = profileData.income;

      const career = new CareerEngine(coreProfile);

      // Regla de negocio: validar habilidades
      career.applyForJob({
        id: jobId, title, salary, requiredSkill
      });

      // Persistir nuevo salario
      await prisma.playerProfile.update({
        where: { id: profileData.id },
        data: { 
          income: coreProfile.income,
          currentJobId: jobId
        }
      });

      res.status(200).json({ message: `¡Felicidades! Fuiste contratado como ${title}` });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

}
