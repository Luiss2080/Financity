import { create } from 'zustand';
import { PlayerProfile, BudgetEngine, BankEngine, ScoreEngine } from 'core';

interface GameState {
  profile: PlayerProfile;
  budgetEngine: BudgetEngine;
  bankEngine: BankEngine;
  healthScore: number;
  addIncome: (amount: number) => void;
  addExpense: (name: string, amount: number) => void;
  error: string | null;
  clearError: () => void;
}

const initialProfile = new PlayerProfile('User123', 'Edwin');
const initialBudget = new BudgetEngine(initialProfile);
const initialBank = new BankEngine(initialProfile);

export const useGameStore = create<GameState>((set, get) => ({
  profile: initialProfile,
  budgetEngine: initialBudget,
  bankEngine: initialBank,
  healthScore: new ScoreEngine(initialProfile, initialBudget, initialBank).calculateFinancialHealth(),
  error: null,

  addIncome: (amount: number) => {
    const { profile, budgetEngine, bankEngine } = get();
    profile.addIncome(amount);
    
    set({ 
      profile: Object.assign(new PlayerProfile(profile.userId, profile.name), profile),
      healthScore: new ScoreEngine(profile, budgetEngine, bankEngine).calculateFinancialHealth(),
      error: null
    });
  },

  addExpense: (name: string, amount: number) => {
    const { profile, budgetEngine, bankEngine } = get();
    try {
      budgetEngine.addExpense(name, amount);
      set({ 
        budgetEngine: Object.assign(new BudgetEngine(profile), budgetEngine),
        healthScore: new ScoreEngine(profile, budgetEngine, bankEngine).calculateFinancialHealth(),
        error: null
      });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  clearError: () => set({ error: null })
}));
