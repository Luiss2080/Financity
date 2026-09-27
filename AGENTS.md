# AGENTS.md — FinanCity

## Proyecto
FinanCity es un videojuego educativo multiplataforma (PWA/Desktop) diseñado para enseñar finanzas personales mediante simulación.
Utiliza arquitectura escalable basada en un Monorepo (Turborepo), Frontend en React/Vite/Tailwind (con Phaser.js para minijuegos), Backend robusto en Node.js (NestJS/Express con DDD estricto), y base de datos MySQL (con Prisma ORM).

## Comandos
- Instalar dependencias: `pnpm install` (o npm)
- Ejecutar desarrollo: `npm run dev`
- Ejecutar tests: `npm run test`
- Lint/formato: `npm run lint`

## Estilo y convenciones
- **Código**: Nombres de variables, funciones, clases y commits estrictamente en **Inglés**.
- **UI/Textos**: Textos orientados al usuario (Landing, interfaz del juego) estrictamente en **Español**.
- **Tipado**: TypeScript estricto.
- **Frontend**: Componentes funcionales (React Hooks), Tailwind CSS para estilos, Zustand para estado local de juego, y TanStack Query para estado de servidor.
- **Backend**: Clean Architecture, Inyección de Dependencias, DTOs con validación estricta (Zod).

## Reglas
- **Regla SDD de Oro**: Lee siempre `docs/spec.md` antes de escribir o modificar una sola línea de código.
- **Cero Improvisación**: NUNCA programes funcionalidades o reglas de negocio que no estén explícitamente detalladas en la especificación.
- **Test-Driven Spec**: Todo test automatizado debe validar directa y explícitamente un Requisito Funcional (RF-X) de la spec.
- **Verdad Absoluta**: El código y la especificación deben decir siempre la verdad. Si surge un cambio estructural justificado, se debe actualizar el `spec.md` *antes* o *al mismo tiempo* que el código.
