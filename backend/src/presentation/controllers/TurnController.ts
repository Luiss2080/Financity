import { Request, Response } from 'express';
import { prisma } from '../../infrastructure/database/prisma';
import { PlayerProfile, BudgetEngine, BankEngine, CareerEngine, TurnEngine } from 'core';

export class TurnController {
  
  static async advanceMonth(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const profileData = await prisma.playerProfile.findUnique({
        where: { userId: id },
        include: { expenses: true, loans: true, courses: true }
      });
      if (!profileData) throw new Error('Not found');

      // 1. Reconstruir Core
      const coreProfile = new PlayerProfile(profileData.userId, profileData.name);
      coreProfile.money = profileData.money;
      coreProfile.income = profileData.income;
      coreProfile.skills = typeof profileData.skills === 'string' ? JSON.parse(profileData.skills) : profileData.skills;
      
      const budget = new BudgetEngine(coreProfile);
      for (const e of profileData.expenses) { budget.addExpense(e.name, e.amount); }

      const bank = new BankEngine(coreProfile);
      // Rehidratar prestamos manual en el core (esto es simplificado)
      for (const l of profileData.loans) {
         if (l.remaining > 0) {
           bank.requestLoan(l.principal, l.interestRate, l.months);
         }
      }

      const career = new CareerEngine(coreProfile);
      for (const c of profileData.courses) {
        if (c.monthsRemaining > 0) {
          career.enrollCourse({
            id: c.courseId, name: c.name, cost: 0, durationMonths: c.monthsRemaining, xpReward: c.xpReward
          });
        }
      }

      // 2. Ejecutar turno (Avanzar mes)
      const turn = new TurnEngine(coreProfile, budget, bank, career);
      turn.nextMonth(); // Esto muta coreProfile y reduce remaining de courses/loans internamente en el Engine

      // 3. Persistir en BD
      await prisma.$transaction(async (tx) => {
        // Actualizar dinero e income
        await tx.playerProfile.update({
          where: { id: profileData.id },
          data: { money: coreProfile.money, skills: coreProfile.skills }
        });

        // Actualizar Remaining de préstamos (Simplificado: restar 1 cuota)
        for (const l of profileData.loans) {
          if (l.remaining > 0) {
            await tx.loan.update({
              where: { id: l.id },
              data: { remaining: Math.max(0, l.remaining - l.monthlyPayment) }
            });
          }
        }

        // Actualizar meses de estudio
        for (const c of profileData.courses) {
          if (c.monthsRemaining > 0) {
            await tx.playerCourse.update({
              where: { id: c.id },
              data: { monthsRemaining: c.monthsRemaining - 1 }
            });
          }
        }
      });

      res.status(200).json({ message: 'Ha pasado un mes. Gastos y deudas procesadas.' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

}
