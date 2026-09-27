# ARCHITECTURE SPEC

## 1. Diagrama del Sistema
React + Vite -> UI (Tailwind) / Minijuegos (Phaser) -> PWA / Electron -> Game Logic (Node + Express) -> Base de Datos (MySQL)

## 2. Estructura Modular Estricta en React
El proyecto abandonará componentes planos ("Game.jsx 5000 líneas").
```
src/
  landing/ (HomePage, DownloadPage, Navbar, Hero)
  game/
  modules/
    economy/
    budget/ (BudgetPage, IncomeCard, ExpenseCard)
    banking/
    savings/
    debt/
    business/
    investments/
    missions/
    challenges/
    lessons/
    achievements/
    profile/
```
