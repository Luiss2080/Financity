import request from 'supertest';
import app from '../src/app'; 
import { prisma } from '../src/infrastructure/database/prisma';

describe('API E2E Tests - Spec 002', () => {
  let createdUserId: string;
  const randomEmail = `test_${Date.now()}@financity.com`;

  it('RF-6: Debería registrar un usuario y crear su perfil con Bs 1500 iniciales', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: randomEmail,
        password: 'Password123!',
        name: 'Jugador Test'
      });

    expect(res.status).toBe(201);
    expect(res.body.profile).toBeDefined();
    expect(res.body.profile.money).toBe(1500);
    expect(res.body.profile.age).toBe(18);

    createdUserId = res.body.user.id;
  });

  it('RF-7: Debería retornar el estado financiero actualizado del perfil', async () => {
    // En un escenario real enviaríamos un JWT, aquí simulamos que pasamos el ID para efectos de test MVP
    const res = await request(app)
      .get(`/api/profiles/${createdUserId}`);

    expect(res.status).toBe(200);
    expect(res.body.money).toBe(1500);
    expect(res.body.income).toBe(0);
  });

  it('RF-8 (Éxito): Debería permitir agregar un gasto si hay dinero disponible', async () => {
    // Primero simulamos inyectar ingresos para tener disponible (RF-2)
    await request(app)
      .post(`/api/profiles/${createdUserId}/income`)
      .send({ amount: 3000 });

    const res = await request(app)
      .post(`/api/profiles/${createdUserId}/expenses`)
      .send({ name: 'Comida', amount: 500 });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Gasto registrado con éxito');
  });

  it('RF-8 (Fallo): Debería bloquear el gasto y retornar error si excede el dinero (Deficit)', async () => {
    const res = await request(app)
      .post(`/api/profiles/${createdUserId}/expenses`)
      .send({ name: 'Deuda Impagable', amount: 999999 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Presupuesto en déficit'); // El mensaje que lanza nuestro @financity/core
  });
});
