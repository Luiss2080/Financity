const fs = require('fs');
const path = require('path');

const specsDir = path.join(__dirname, 'docs', 'specs');
if (!fs.existsSync(specsDir)) fs.mkdirSync(specsDir, { recursive: true });

const specs = {
  "PROJECT_SPEC.md": `# PROJECT_SPEC: FinanCity

## 1. Visión del Producto
FinanCity es un videojuego educativo de simulación financiera diseñado para jóvenes, estudiantes y adultos. Su objetivo primordial es enseñar conceptos como ahorro, presupuesto, créditos, intereses, inversiones y planificación, pero **todo mediante decisiones y desafíos**, eliminando la necesidad de leer clases aburridas.

## 2. Concepto Principal del Juego
El jugador inicia su vida con:
- **Edad**: 18 años
- **Dinero**: Bs 1.500
- **Ingresos**: Bs 0
- **Ahorros**: Bs 0
- **Deudas**: Bs 0

## 3. Bucle de Juego (Core Gameplay Loop)
El jugador avanza a través del siguiente ciclo de acciones interactivas:
ESTUDIAR -> TRABAJAR -> GANAR DINERO -> ADMINISTRAR GASTOS -> AHORRAR -> EVITAR MALAS DEUDAS -> INVERTIR -> EMPRENDER -> ALCANZAR METAS.

## 4. Restricciones Técnicas de Alcance
- **❌ Lo que NO es FinanCity**: Un mundo 3D, un juego de físicas complejas, exploración abierta de mapas gigantes, animaciones de alto consumo o un MMO complejo.
- **✅ Lo que SÍ es FinanCity**: Una experiencia UI-Driven (basada en Interfaz), con tarjetas (Cards), Eventos, Toma de decisiones, Minijuegos, Gráficos estadísticos atractivos, y progresión por misiones.`,

  "GAME_DESIGN_DOCUMENT.md": `# GAME DESIGN DOCUMENT (GDD)

## 1. Fases del Proyecto y Entregables
El juego se divide en 9 fases incrementales:
- **FASE 1 (MVP)**: Landing, Login, Perfil, Presupuesto, Ahorro, Eventos básicos, Misiones iniciales, Experiencia (XP).
- **FASE 2**: Banco, Préstamos, Intereses y Gestión de Deudas.
- **FASE 3**: Educación (cursos) y Empleos desbloqueables (Ingresos dinámicos).
- **FASE 4**: Emprendimiento y negocios simples.
- **FASE 5**: Inversiones simuladas y consolidación de Patrimonio.
- **FASE 6**: Desafíos, Quiz, Logros y Ranking global.
- **FASE 7**: Implementación PWA, Offline-first, Instalación móvil.
- **FASE 8**: Empaquetado Electron para Windows, macOS y Linux.
- **FASE 9**: Control de Calidad (QA), Responsive, Accesibilidad y Balance económico.

## 2. Mecánicas Core
- **Mapa de Ciudad**: Grid de acceso rápido a ubicaciones (Casa, Trabajo, Banco, Universidad, Inversiones, Tienda, Negocio, Concesionaria).
- **Toma de Decisiones (Eventos)**: Interrupciones aleatorias que afectan el balance (Ej: "El celular se rompió").

## 3. Público Objetivo
Dirigido a la Generación Z y Millennials que requieren educación financiera mediante mecánicas de dopamina controlada (gamificación de recompensas en simulaciones económicas).`,

  "GAMEPLAY_SPEC.md": `# GAMEPLAY SPEC

## 1. Misiones y Objetivos
Las misiones son guiadas. Ejemplos de mecánicas:
- *Objetivo 1*: "Ahorra Bs 1.000."
- *Objetivo 2*: "No gastes más del 80% de tus ingresos."
- *Objetivo 3*: "Paga tu primera deuda."
- *Objetivo 4*: "Crea un fondo de emergencia (3 meses de gastos)."

**Recompensas**: XP, monedas del juego, insignias y objetos visuales.

## 2. El Mapa Principal
Navegación mediante una UI basada en íconos representativos (sin avatars moviéndose por la pantalla).
- **CASA**: Presupuesto, Gastos, Metas, Deudas, Ahorros, Patrimonio.
- **TRABAJO**: Buscar empleo, cobrar salario.
- **BANCO**: Préstamos y pagos.
- **UNIVERSIDAD**: Mejorar habilidades para aumentar salarios.
- **INVERSIONES**: Multiplicar capital.
- **TIENDA / CONCESIONARIA**: Gastos fijos/pasivos.

## 3. Eventos Aleatorios e Inesperados
Situaciones como Accidentes, Desempleos, Emergencias o Bonos saldrán de manera emergente en la pantalla, forzando al jugador a tomar decisiones financieras de riesgo.`,

  "EDUCATION_SPEC.md": `# EDUCATION SPEC

## 1. Módulo "Aprende"
Contenido de consumo rápido (2-5 minutos) accesible desde el menú principal.
**Categorías**: Presupuesto, Ahorro, Intereses, Deudas, Créditos, Inversiones, Emprendimiento.

## 2. Mecánica de Quiz Rápido
Desafíos de 30-60 segundos integrados.
- **Ejemplo**: "¿Qué es un fondo de emergencia?"
- Nunca se responde solo con "Correcto/Incorrecto". Si el jugador falla, se brinda la explicación detallada ("Un fondo de emergencia es dinero reservado para afrontar gastos inesperados...").

## 3. Minijuegos de Intereses
Cálculos didácticos rápidos.
Ejemplo: "Pediste Bs 5.000 al 10% de interés. ¿Cuánto devolverás?". Recompensa en XP si se acierta la pregunta.`,

  "ECONOMY_SPEC.md": `# ECONOMY SPEC

## 1. Presupuesto Mensual
El motor principal del juego.
- Se suman los **INGRESOS** (Ej: Salario Bs 3.500, Emprendimiento Bs 600 = Bs 4.100).
- Se restan los **GASTOS** (Alquiler, comida, transporte, etc = Bs 2.380).
- **Resultado**: DISPONIBLE (Bs 1.720).
El jugador decide cómo asignar el *Disponible*.

## 2. Inflación
Eventos educativos donde los precios suben. "Hace 3 años un Pan valía Bs 2. Ahora Bs 3. Tu dinero perdió poder de compra."

## 3. Ahorro y Fondo de Emergencia
- Metas visuales con barra de progreso (Ej: "Laptop, 41%").
- El fondo de emergencia ideal se sitúa mecánicamente en 3x Gastos Fijos mensuales.`,

  "PROGRESSION_SPEC.md": `# PROGRESSION SPEC

## 1. Salud Financiera (Gamificación)
Score de 0 a 100 evaluado constantemente por el sistema.
- Criterios: Ratio de Ahorro, Ratio de Deudas, Presupuesto balanceado, Tamaño del Fondo de Emergencia.

## 2. Niveles de Jugador
- Nivel 1: Aprendiz
- Nivel 5: Ahorrador
- Nivel 10: Administrador
- Nivel 20: Inversionista
- Nivel 30: Emprendedor

## 3. Logros Desbloqueables
Insignias otorgadas por hitos económicos: "Primer ahorro", "Sin deudas", "Buen presupuesto", "Emprendedor", "Primera vivienda".`,

  "CHALLENGES_SPEC.md": `# CHALLENGES SPEC

## 1. Desafíos Independientes
Sesiones cortas con reglas preestablecidas.
- **"Sobrevive al Mes"**: Ingresos de Bs 3.000 vs Gastos obligatorios de Bs 2.200 + Emergencia de Bs 500. Objetivo: No endeudarse.
- **"Sal de las Deudas"**: Deuda monstruosa de Bs 15.000 con bajos ingresos (Bs 4.500) y altos gastos (Bs 3.000). Requiere estrategia intensa de amortización.

## 2. Recompensas de Desafío
Otorgan prestigio y puntos para el Ranking Global sin desbalancear la economía de la partida principal.`,

  "LANDING_SPEC.md": `# LANDING SPEC

## 1. Estructura de la Web Comercial
Landing page profesional, independiente del juego.
- **Navbar**: Inicio, Cómo Jugar, Aprende, Características, Desafíos, Ranking, Noticias, FAQ, Botones de Sesión e Instalación.
- **Hero Principal**: Texto "Tus decisiones. Tu dinero. Tu futuro." Botón "JUGAR GRATIS". Acompañado de un Dashboard ilusorio flotante del jugador a la derecha.

## 2. UI Requerimientos
Glassmorphism, gradientes neón interactivos, micro-animaciones en tarjetas de características.`,

  "INSTALL_SPEC.md": `# INSTALL SPEC

## 1. Modal Multiplataforma
Al hacer click en "Instalar", un modal inteligente detectará la plataforma.
- Web: Jugar Ahora
- Android: Instalar App (PWA)
- Windows: Descargar versión nativa .exe
- macOS: Descargar versión nativa .dmg
- Linux: Descargar

## 2. Arquitectura de Distribución
Un solo código base en React proveerá las 5 versiones mediante Service Workers para PWA y capas de Electron para Desktop.`,

  "UI_UX_SPEC.md": `# UI/UX SPEC

## 1. Principios de Diseño
- **Modernidad**: Juvenil, colorida, amigable.
- **Cero contabilidad**: No debe sentirse como una hoja de cálculo.
- **Micro-interacciones**: Framer Motion en React para hover states, transiciones de pantalla, explosión de confeti en logros.

## 2. Responsive Design
- **Desktop**: Sidebar lateral + Área amplia central de juego.
- **Móvil / Tablet**: Bottom Navigation (Inicio, Mapa, Misiones, Aprende, Perfil).`,

  "ARCHITECTURE.md": `# ARCHITECTURE SPEC

## 1. Diagrama del Sistema
React + Vite -> UI (Tailwind) / Minijuegos (Phaser) -> PWA / Electron -> Game Logic (Node + Express) -> Base de Datos (MySQL)

## 2. Estructura Modular Estricta en React
El proyecto abandonará componentes planos ("Game.jsx 5000 líneas").
\`\`\`
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
\`\`\`
`,

  "MYSQL_DATABASE_SPEC.md": `# MYSQL DATABASE SPEC

## 1. Entidades Requeridas (Completo)
- users, profiles
- games, game_saves
- player_progress, levels
- missions, mission_progress
- achievements, player_achievements
- lessons, lesson_progress
- questions, question_answers
- challenges, challenge_results
- transactions, budgets, debts
- savings_goals, businesses, investments
- events, leaderboards

La estructura de Prisma Schema debe modelar las dependencias relacionales de todas estas tablas.`,

  "API_SPEC.md": `# API SPEC

## 1. Backend REST (Express + Node.js)
El backend procesa la lógica core.
- **Autenticación**: Supabase Auth o JWT local.
- **Transaccionalidad**: Toda compra, gasto o préstamo debe pasar por un Controlador estricto en Express que calcule la viabilidad financiera utilizando el paquete \`@financity/core\` antes de guardar en MySQL.`,

  "OFFLINE_SPEC.md": `# OFFLINE SPEC

## 1. Arquitectura Offline-First
- Uso de IndexedDB en el navegador/PWA/Desktop.
- Sincronización diferida (Sync Engine).
- Las partidas se dividen en partes: Player, Economy, Progress, Missions, Achievements.
- El juego guarda un "autosave" en IndexedDB en cada decisión, y lo transmite a la API de Node en batch cuando detecta conectividad.`,

  "TESTING_SPEC.md": `# TESTING SPEC

## 1. Reglas SDD (Spec-Driven Development)
- Pruebas E2E automatizadas para la API de Backend (Jest + Supertest).
- Ninguna regla financiera de \`@financity/core\` debe existir sin una prueba unitaria.
- Pruebas automatizadas de Frontend (Playwright/Cypress) para el flujo de instalación, onboarding y solicitud de préstamos.
- Revisión de accesibilidad, balance del juego y QA en la Fase 9.`
};

for (const [filename, content] of Object.entries(specs)) {
  fs.writeFileSync(path.join(specsDir, filename), content);
  console.log(`Actualizado y detallado: ${filename}`);
}
