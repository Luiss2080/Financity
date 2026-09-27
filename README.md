<div align="center">
  <img src="./logo.svg" alt="FinanCity Logo" width="120" height="120" />
  
  # FinanCity

  **Aprende a manejar tu dinero construyendo tu futuro.** <br> Un juego educativo de simulación financiera (PWA) con arquitectura monorepo.
  
  <p align="center">
    <img src="https://img.shields.io/badge/ESTADO-MVP_COMPLETO-emerald?style=for-the-badge" alt="Estado" />
    <img src="https://img.shields.io/badge/TYPESCRIPT-ES2022-f7df1e?style=for-the-badge&logo=typescript&logoColor=black" alt="TypeScript" />
    <img src="https://img.shields.io/badge/REACT-19-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/VITE-8-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/EXPRESS-5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/PRISMA-5-2d3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/MYSQL-8.4-4479a1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  </p>

  [Características](#-características) • 
  [Arquitectura](#-arquitectura) • 
  [Inicio Rápido](#-inicio-rápido) • 
  [Pruebas](#-pruebas) • 
  [Documentación](./docs/FULL_SPEC.md)

</div>

---

**FinanCity** es un simulador financiero educativo de nueva generación que rechaza las aburridas clases de economía tradicional. Te pone al mando de una vida virtual donde cada mes debes tomar decisiones: trabajar, estudiar, pagar deudas, hacer mercado e intentar construir un fondo de ahorros sólido frente a las eventualidades de la vida.

> **Aviso:** Este es el MVP (Versión 1.0) construido rigurosamente bajo *Spec-Driven Development (SDD)* y *Test-Driven Development (TDD)*.

---

## ✨ Características

- 📈 **Motor Económico (Regla 50/30/20)**: Clasifica la salud financiera del jugador en tiempo real.
- 🏦 **Sistema Bancario**: Préstamos amortizables con tasas de interés realistas.
- 🎓 **Educación y Empleo**: Escalabilidad laboral condicionada a los puntos de experiencia (XP).
- 🕒 **Motor de Turnos**: Procesamiento mensual centralizado en transacciones SQL seguras.
- 🎯 **Motor Lúdico**: Misiones automatizadas que recompensan el buen comportamiento financiero.
- 📱 **Soporte Offline (PWA)**: Interfaz instalable en móviles que funciona sin conexión, sincronizando turnos con el servidor cuando sea posible.

---

## 🏗️ Arquitectura

El proyecto emplea **Turborepo** para orquestar sus paquetes, forzando una estricta separación de responsabilidades:

| Paquete | Rol | Tecnologías |
| :--- | :--- | :--- |
| `apps/web` | **Frontend** | React, Vite, Tailwind v4, Zustand, VitePWA |
| `backend` | **API REST** | Node.js, Express, Prisma ORM |
| `packages/core` | **Lógica de Negocio** | Clases puras de TypeScript (Engines), TDD (Jest) |

<details>
<summary>📂 <b>Ver estructura de carpetas</b></summary>

```text
Financity/
├── apps/
│   └── web/                # SPA + PWA
├── backend/                # API 
├── packages/
│   ├── core/               # Lógica Matemática Pura (independiente de React/Express)
│   ├── eslint-config/      
│   └── typescript-config/  
├── docs/                   # Especificaciones Formales
└── turbo.json              # Orquestación de scripts
```
</details>

---

## 🚀 Inicio Rápido

### Requisitos Mínimos

| Requisito | Versión |
| :--- | :--- |
| **Node.js** | 18 o superior |
| **npm** | 9.x o superior |
| **MySQL** | 8.0+ |

### Instalación en 4 Pasos

1. **Instala las dependencias:**
   ```bash
   npm install
   ```

2. **Configura el entorno del Backend:**
   Copia el archivo de ejemplo en el backend y ajusta las credenciales de tu base de datos local.
   ```bash
   cp backend/.env.example backend/.env
   # Asegúrate de que DATABASE_URL apunte a tu MySQL local
   ```

3. **Migra la Base de Datos:**
   Prepara las tablas e inyecta la lógica de Prisma.
   ```bash
   cd backend
   npx prisma db push
   npx prisma generate
   cd ..
   ```

4. **Compila y Levanta el Ecosistema:**
   Gracias a Turborepo, un solo comando compilará el `core` e iniciará tanto el `backend` como la `web` en paralelo.
   ```bash
   npm run dev
   ```

> La API escuchará en el puerto **3000** y la Web en el de Vite **(5173)**.

---

## 🧪 Pruebas

El núcleo ha sido construido usando **TDD**. Garantizamos que las simulaciones matemáticas y el cálculo del motor no tienen desvíos, y que la API REST interactúa correctamente con la Base de Datos.

| Módulo | Comando de Prueba | Resultado en Integración Continua |
| :--- | :--- | :--- |
| `packages/core` | `npm run test` (en core) | ✅ 20 tests unitarios pasan |
| `backend` | `npm run test` (en backend) | ✅ 4 tests E2E pasan |
| **Global** | `npm run test` (en raíz) | ✅ 24 tests pasan exitosamente |

Para ejecutar todas las pruebas a nivel global:
```bash
npm run test
```

---

<div align="center">
  <i>Desarrollado con ❤️ aplicando Clean Architecture y Spec-Driven Development</i>
</div>
