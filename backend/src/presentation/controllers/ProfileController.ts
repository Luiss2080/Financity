import { Request, Response } from 'express';
import { prisma } from '../../infrastructure/database/prisma';
import { PlayerProfile, BudgetEngine } from 'core';

export class ProfileController {
  
  // RF-7: Obtener estado
  static async getProfile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const profile = await prisma.playerProfile.findUnique({
        where: { userId: id },
        include: { expenses: true }
      });

      if (!profile) return res.status(404).json({ error: 'Profile not found' });
      res.status(200).json(profile);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Ingresos
  static async addIncome(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { amount } = req.body;

      const profile = await prisma.playerProfile.findUnique({ where: { userId: id } });
      if (!profile) throw new Error('Not found');

      // Regla Core
      const coreProfile = new PlayerProfile(profile.userId, profile.name);
      coreProfile.income = profile.income;
      coreProfile.addIncome(amount);

      // Persistencia
      await prisma.playerProfile.update({
        where: { userId: id },
        data: { income: coreProfile.income }
      });

      res.status(201).json({ message: 'Ingreso actualizado' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // RF-8: Registrar Gasto
  static async addExpense(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, amount } = req.body;

      // 1. Cargar desde BD
      const profileData = await prisma.playerProfile.findUnique({
        where: { userId: id },
        include: { expenses: true }
      });
      if (!profileData) throw new Error('Not found');

      // 2. Reconstruir Core
      const coreProfile = new PlayerProfile(profileData.userId, profileData.name);
      coreProfile.income = profileData.income;
      coreProfile.money = profileData.money;

      const engine = new BudgetEngine(coreProfile);
      // Rehidratar estado (gastos anteriores)
      for (const exp of profileData.expenses) {
        engine.addExpense(exp.name, exp.amount);
      }

      // 3. Ejecutar regla de negocio pura (Lanza 'Presupuesto en déficit' si falla)
      engine.addExpense(name, amount); 

      // 4. Si no falló, guardar en BD
      await prisma.expense.create({
        data: {
          profileId: profileData.id,
          name,
          amount
        }
      });

      res.status(201).json({ message: 'Gasto registrado con éxito' });
    } catch (error: any) {
      // 5. El error de Core se atrapa aquí
      res.status(400).json({ error: error.message });
    }
  }
}
