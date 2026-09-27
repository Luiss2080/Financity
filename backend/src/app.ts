import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

import { AuthController } from './presentation/controllers/AuthController';
import { ProfileController } from './presentation/controllers/ProfileController';

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'FinanCity API running' });
});

app.post('/api/auth/register', AuthController.register);
app.get('/api/profiles/:id', ProfileController.getProfile);
app.post('/api/profiles/:id/income', ProfileController.addIncome);
app.post('/api/profiles/:id/expenses', ProfileController.addExpense);

export default app;
