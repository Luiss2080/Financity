import { Request, Response } from 'express';
import { prisma } from '../../infrastructure/database/prisma';
import { PlayerProfile } from 'core';

export class AuthController {
  static async register(req: Request, res: Response) {
    const { email, password, name } = req.body;
    
    try {
      // 1. Instanciamos el core para obtener los valores por defecto (RF-6)
      // La especificación dice que el core maneja el estado inicial (Bs 1500)
      const coreProfile = new PlayerProfile('temp-id', name);

      // 2. Transacción de Base de Datos para asegurar consistencia
      const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: { email, password }
        });

        const profile = await tx.playerProfile.create({
          data: {
            userId: user.id,
            name: coreProfile.name,
            age: coreProfile.age,
            money: coreProfile.money,
            income: coreProfile.income
          }
        });

        return { user, profile };
      });

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
