# GAME DESIGN DOCUMENT (GDD) & SPEC-DRIVEN DEVELOPMENT (SDD)

## 1. Visión General
**FinanCity** es un simulador financiero educativo de nueva generación sin mecánicas 3D o aburridas clases de economía. Es un juego basado en **decisiones e interfaz UI** de alta calidad (React/Vite) enfocado en jóvenes que buscan aprender a administrar su dinero, escapar de las deudas y alcanzar la libertad financiera mediante un algoritmo realista.

## 2. Concepto Mecánico Principal (Core Loop)
```text
  [ Ganar Dinero (Empleo) ] 
         ↓
  [ Administrar (Gastos/Deuda) ] 
         ↓
  [ Invertir en Educación (XP) ]
         ↓
  [ Avanzar Mes (Motor de Turnos) ] -> (Aplica intereses y pagos)
         ↓
  [ Desbloquear Misiones ] -> (Recompensas que permiten mejores empleos)
```

## 3. Arquitectura SDD / DDD (Domain-Driven Design)
Toda la lógica matemática y restricciones del juego existen puramente en TypeScript de manera aislada (`@financity/core`). Nunca se programó código sin que primero exista un Test Unitario en Jest (TDD).

### Entidades Puras (Engines)
*   **PlayerProfile**: Guarda edad, nombre, habilidades (skills JSON), y liquidez.
*   **BudgetEngine**: Protege el flujo de caja; bloquea compras que dejarían en quiebra y separa egresos de ingresos.
*   **BankEngine**: Genera créditos, tasas de interés realistas y cuotas fijas amortizables por turnos.
*   **CareerEngine**: Permite escalar sueldos estudiando cursos con duración en meses. Si no tienes la XP mínima requerida, el backend te rechaza postular.
*   **MissionEngine**: Gamificación pura. Si tu `money` cruza una meta de ahorro pre-configurada, el motor te inyecta XP al siguiente turno.
*   **ScoreEngine**: Algoritmo global que dictamina si estás quebrado o en ruta al éxito. Te penaliza severamente si las cuotas del banco ahogan más del 30% de tu sueldo.
*   **TurnEngine**: El "Reloj" del juego. Llama iterativamente a todos los motores para avanzar un mes de tu vida.

## 4. Persistencia (MySQL & Prisma)
Cada mes avanzado se sincroniza al servidor de Node.js donde Prisma ORM se encarga de realizar un `$transaction`. Si un cobro bancario te deja en negativo, la transacción se revierte y el juego declara la Bancarrota (Game Over preventivo).

## 5. Accesibilidad Offline
Todo el empaquetado del Frontend está impulsado por **VitePWA**. Un Service Worker almacena el mapa de la ciudad en Caché y genera manifiestos WebManifest para que FinanCity sea instalable (Añadir a la pantalla de inicio) de inmediato en móviles.
