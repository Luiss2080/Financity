# 🎮 FinanCity - Simulador Financiero

Aprende a manejar tu dinero construyendo tu futuro. FinanCity es un juego educativo de simulación financiera para jóvenes y adultos que enseña sobre finanzas personales mediante la toma de decisiones prácticas (ahorro, presupuesto, créditos, inversiones, educación y emprendimiento) sin clases aburridas.

## 🏗️ Arquitectura del Proyecto (Monorepo Turborepo)

Este proyecto está construido con un enfoque altamente modular y escalable, utilizando **Turborepo** para gestionar múltiples paquetes y aplicaciones en un solo repositorio. 
Además, se ha desarrollado rigurosamente bajo la filosofía **Spec-Driven Development (SDD)** y **Clean Architecture**.

```text
Financity/
├── apps/
│   └── web/                # Frontend en React, Vite, Tailwind v4 y Zustand (PWA Integrado)
├── backend/                # API REST en Node.js, Express, Prisma y MySQL
├── packages/
│   ├── core/               # Lógica de Negocio y Reglas Puras (Engines Matemáticos) probados con Jest
│   ├── eslint-config/      # Configuración de linter compartida
│   └── typescript-config/  # Configuración base de TS
└── docs/                   # Documentación y Especificaciones Formales (SDD)
```

## 🚀 Fases Completadas (MVP 1.0)

El núcleo del juego ha sido construido e integrado con éxito:

1. **Fase 1: Motor Económico**: Seguimiento de liquidez, ingresos y egresos (Presupuesto mensual).
2. **Fase 2: Sistema Bancario**: El jugador puede solicitar préstamos, pagar intereses y generar un historial crediticio (`BankEngine`).
3. **Fase 3: Educación y Empleo**: Universidad para aumentar experiencia (XP) pagando un costo y bolsa de empleo que valida XP para otorgar un salario fijo mensual (`CareerEngine`).
4. **Fase 4: Motor de Turnos**: Botón `[Avanzar Mes]` que cobra deudas, procesa gastos e inyecta salarios usando una transacción segura en MySQL (`TurnEngine`).
5. **Fase 5: Misiones y Recompensas**: Objetivos lúdicos (Ej. Conseguir empleo, Ahorrar Bs 5000) que se auto-validan y entregan XP/Dinero de forma automática (`MissionEngine`).
6. **Fase 6: Dashboard Analítico**: Gráfico en tiempo real que muestra la distribución del dinero (Flujo de Caja, Deudas, Gastos).
7. **Fase 7: Score Financiero**: Algoritmo matemático que clasifica la Salud Financiera de 0 a 100 usando la regla 50/30/20 y penalizaciones por riesgo de deuda.
8. **Fase 8: Offline PWA**: Aplicación instalable en cualquier dispositivo sin requerir internet para la interfaz de usuario.
9. **Fase 9: QA & Testing**: Más de 20 tests unitarios y End-To-End (E2E) aprobados.

## 🔧 Instalación y Despliegue

### Requisitos
- Node.js v18 o superior
- MySQL (puedes usar Laragon, XAMPP o Docker)
- PNPM o NPM

### Pasos
1. **Instalar dependencias globales**
   ```bash
   npm install
   ```
2. **Configurar la Base de Datos**
   Crea una base de datos en MySQL llamada `financity`.
   Copia el archivo `backend/.env.example` a `backend/.env` y ajusta el `DATABASE_URL`:
   ```env
   DATABASE_URL="mysql://root:@localhost:3306/financity"
   ```
3. **Migrar la base de datos**
   ```bash
   cd backend
   npx prisma db push
   npx prisma generate
   ```
4. **Ejecutar el proyecto en Desarrollo**
   Vuelve a la raíz del proyecto y arranca todo con Turborepo:
   ```bash
   npm run dev
   ```
   - El Frontend correrá en `http://localhost:5173`
   - El Backend correrá en `http://localhost:3000`

### 🧪 Ejecutar Pruebas (Testing)
Para validar que los módulos de lógica matemática (`@financity/core`) y el backend (`API E2E`) funcionen correctamente:
```bash
npm run test
```

## 📜 Licencia & Diseño
Creado aplicando prácticas empresariales (Clean Architecture, TDD).  
Reglas de Diseño aplicadas: *UI moderna, Micro-animaciones, Tailwind CSS custom utilities.*
