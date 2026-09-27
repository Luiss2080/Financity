import { Request, Response } from 'express';
import { prisma } from '../../infrastructure/database/prisma';
import { PlayerProfile, BankEngine } from 'core';

export class BankController {
  
  static async requestLoan(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { amount, rate, months } = req.body;

      // 1. Cargar perfil desde BD
      const profileData = await prisma.playerProfile.findUnique({
        where: { userId: id }
      });
      if (!profileData) throw new Error('Not found');

      // 2. Reconstruir Core
      const coreProfile = new PlayerProfile(profileData.userId, profileData.name);
      coreProfile.money = profileData.money;
      coreProfile.income = profileData.income;

      const bank = new BankEngine(coreProfile);

      // 3. Ejecutar regla de negocio pura
      const loan = bank.requestLoan(amount, rate, months);

      // 4. Guardar en BD de forma transaccional
      await prisma.$transaction(async (tx) => {
        // Guardar el préstamo
        await tx.loan.create({
          data: {
            profileId: profileData.id,
            principal: loan.principal,
            interestRate: loan.interestRate,
            months: loan.months,
            totalOwed: loan.totalOwed,
            remaining: loan.remaining,
            monthlyPayment: loan.monthlyPayment,
          }
        });

        // Actualizar liquidez (dinero inyectado)
        await tx.playerProfile.update({
          where: { id: profileData.id },
          data: { money: coreProfile.money }
        });
      });

      res.status(201).json({ message: 'Préstamo aprobado y desembolsado', loan });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

}
