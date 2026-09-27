import { create } from 'zustand';
import { PlayerProfile, BudgetEngine } from 'core';

interface GameState {
  profile: PlayerProfile;
  budgetEngine: BudgetEngine;
  addIncome: (amount: number) => void;
  addExpense: (name: string, amount: number) => void;
  error: string | null;
  clearError: () => void;
}

const initialProfile = new PlayerProfile('User123', 'Edwin');
const initialEngine = new BudgetEngine(initialProfile);

export const useGameStore = create<GameState>((set, get) => ({
  profile: initialProfile,
  budgetEngine: initialEngine,
  error: null,

  addIncome: (amount: number) => {
    const { profile, budgetEngine } = get();
    profile.addIncome(amount);
    set({ 
      profile: Object.assign(new PlayerProfile(profile.userId, profile.name), profile),
      error: null
    });
  },

  addExpense: (name: string, amount: number) => {
    const { budgetEngine } = get();
    try {
      budgetEngine.addExpense(name, amount);
      set({ 
        budgetEngine: Object.assign(new BudgetEngine(get().profile), budgetEngine),
        error: null
      });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  clearError: () => set({ error: null })
}));
