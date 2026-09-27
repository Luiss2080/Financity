# API SPEC

**Backend**: Express.js REST API.
Capa de Controladores interactúa con `@financity/core` antes de guardar en Prisma/MySQL. Garantiza que el cliente no pueda inyectar saldos falsos.