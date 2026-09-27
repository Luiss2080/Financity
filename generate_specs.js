const fs = require('fs');
const path = require('path');

const specsDir = path.join(__dirname, 'docs', 'specs');
if (!fs.existsSync(specsDir)) fs.mkdirSync(specsDir, { recursive: true });

const specs = {
  "PROJECT_SPEC.md": `# PROJECT SPEC\n\n**Visión**: FinanCity es un juego educativo de simulación financiera para enseñar ahorro, presupuesto, créditos e inversiones mediante decisiones, sin clases aburridas.\n\n**Alcance (9 Fases)**:\n1. MVP (Landing, Login, Perfil, Presupuesto, Ahorro)\n2. Banco (Préstamos, Deudas)\n3. Educación (Cursos, Empleos)\n4. Emprendimiento\n5. Inversiones\n6. Gamificación (Desafíos, Quiz, Ranking)\n7. PWA / Offline\n8. Desktop (Electron)\n9. QA Final`,
  "GAME_DESIGN_DOCUMENT.md": `# GAME DESIGN DOCUMENT (GDD)\n\n**Concepto**: El jugador inicia con 18 años, Bs 1.500 y Bs 0 de ingresos. El objetivo es alcanzar la estabilidad financiera.\n\n**Mecánicas Principales**:\n- UI basada en Cards y Eventos (sin mundo 3D).\n- Mapa sencillo interactivo (Casa, Trabajo, Banco, Universidad, Tienda).\n- Eventos aleatorios (Ej. "Tu celular se rompió: Reparar Bs 500 / Comprar Bs 3.800").\n- Minijuegos con Phaser (para conceptos como interés compuesto).`,
  "GAMEPLAY_SPEC.md": `# GAMEPLAY SPEC\n\n**Bucle principal**:\nEstudiar -> Trabajar -> Ganar Dinero -> Administrar Gastos -> Ahorrar -> Invertir.\n\n**Misiones**: "Ahorra Bs 1000", "Paga tu primera deuda". Recompensan con XP e insignias.`,
  "EDUCATION_SPEC.md": `# EDUCATION SPEC\n\n**Módulo Aprende**: Micro-lecciones (2-5 min) sobre Presupuesto, Ahorro, Intereses. \n**Quizzes rápidos**: Preguntas de opción múltiple con explicación del porqué de la respuesta correcta.`,
  "ECONOMY_SPEC.md": `# ECONOMY SPEC\n\n**Balance del Jugador**:\n- Ingresos (Salario, Negocios)\n- Gastos Fijos y Variables\n- Activos y Pasivos\n- Patrimonio Neto = Activos - Pasivos.\n**Inflación**: El juego simulará pérdida de poder adquisitivo con el tiempo.`,
  "PROGRESSION_SPEC.md": `# PROGRESSION SPEC\n\n**Niveles**:\n- Nivel 1: Aprendiz\n- Nivel 5: Ahorrador\n- Nivel 10: Administrador\n- Nivel 20: Inversionista\n- Nivel 30: Emprendedor\n\n**Salud Financiera (Score 0-100)**: Basada en ahorro, deudas y fondo de emergencia.`,
  "CHALLENGES_SPEC.md": `# CHALLENGES SPEC\n\n**Desafíos Específicos**:\n- "Sobrevive al Mes": Ingresos bajos vs Gastos altos.\n- "Sal de las Deudas": Liquidar Bs 15.000 estratégicamente.\nEventos inesperados afectarán el progreso.`,
  "LANDING_SPEC.md": `# LANDING SPEC\n\n**Página comercial**:\n- Hero animado: "Tus decisiones. Tu dinero. Tu futuro."\n- Dashboard flotante demostrativo.\n- Secciones: Características, Aprende, Ranking, FAQ.\n- CTA Principal: [ JUGAR GRATIS ] y [ INSTALAR ]`,
  "INSTALL_SPEC.md": `# INSTALL SPEC\n\n**Multiplataforma**:\n- Modal detecta el OS.\n- Opciones: Web (Browser), PWA (Android/iOS), Windows (.exe), macOS (.dmg), Linux.\n- Sincronización transparente de progreso.`,
  "UI_UX_SPEC.md": `# UI/UX SPEC\n\n**Estética**: Moderna, colorida, amigable, juvenil, clara y animada.\nNo debe parecer un software contable.\n**Framework**: Tailwind CSS, Framer Motion, Lucide Icons. Glassmorphism para modales y navegación.`,
  "ARCHITECTURE.md": `# ARCHITECTURE SPEC\n\n**Monorepo (Turborepo)**:\n- \`apps/web\`: React + Vite + Tailwind + Phaser (Minijuegos).\n- \`packages/core\`: Lógica financiera (TypeScript puro).\n- \`backend\`: Node + Express + Prisma.\n- Estructura Modular React: \`src/modules/budget\`, \`src/modules/economy\`, etc.`,
  "MYSQL_DATABASE_SPEC.md": `# MYSQL DATABASE SPEC\n\n**Tablas Clave**:\nusers, profiles, games, game_saves, player_progress, levels, missions, achievements, lessons, questions, challenges, transactions, budgets, debts, savings_goals, businesses, investments, events.`,
  "API_SPEC.md": `# API SPEC\n\n**Backend**: Express.js REST API.\nCapa de Controladores interactúa con \`@financity/core\` antes de guardar en Prisma/MySQL. Garantiza que el cliente no pueda inyectar saldos falsos.`,
  "OFFLINE_SPEC.md": `# OFFLINE SPEC\n\n**IndexedDB & Service Workers**:\n- La PWA guardará el progreso localmente si no hay conexión.\n- Sincronización en segundo plano con MySQL cuando vuelva el internet.`,
  "TESTING_SPEC.md": `# TESTING SPEC\n\n**Estrategia SDD**:\n- Pruebas E2E (Supertest/Jest) para API Backend.\n- Tests Unitarios (Jest) para \`@financity/core\`.\n- Todo código nuevo debe estar respaldado por un test que valide la Especificación.`
};

for (const [filename, content] of Object.entries(specs)) {
  fs.writeFileSync(path.join(specsDir, filename), content);
  console.log(`Creado: ${filename}`);
}
