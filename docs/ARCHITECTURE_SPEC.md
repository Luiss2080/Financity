# FinanCity - Architecture Specification (ARCHITECTURE_SPEC)

## 1. Patrón Arquitectónico
El proyecto utilizará un **Monorepo (Turborepo)** para aislar responsabilidades, maximizar la reutilización de código y facilitar la compilación paralela de los clientes.

## 2. Estructura del Monorepo

```text
/
├── apps/
│   ├── landing/   (Next.js App para SEO comercial y Onboarding)
│   ├── web/       (React + Vite SPA para la PWA del juego)
│   └── desktop/   (Contenedor Electron que empaqueta 'web')
│
├── packages/
│   ├── core/      (Lógica TypeScript sin UI: Fórmulas, máquinas de estado)
│   ├── ui/        (Componentes de React compartidos + Tailwind)
│   └── config/    (Configuraciones compartidas: TS, ESLint)
│
└── backend/       (Servidor API REST / GraphQL)
```

## 3. Stack Backend
* **Runtime**: Node.js
* **Framework**: NestJS (Implementando Domain-Driven Design)
* **Persistencia Principal**: MySQL + Prisma ORM
* **Persistencia Efímera**: Redis (Para cachés, rate limiting y sesiones).

## 4. Stack Frontend
* **Core UI**: React, Tailwind CSS.
* **Estado Local**: Zustand.
* **Estado Servidor**: TanStack Query (React Query) con persistencia local experimental.
* **Minijuegos**: Phaser.js renderizado dentro de un Canvas controlado por un componente React.

## 5. Estrategia Offline-First
* Uso de Workbox para generar Service Workers en la app `web`.
* Las peticiones mutables se encolarán si el usuario no tiene conexión y se sincronizarán mediante _Background Sync_.
* Las lecturas intentarán utilizar caché (IndexedDB) primero si la red falla.
