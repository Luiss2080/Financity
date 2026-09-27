# SPEC-002: Base de Datos y Backend API (FASE 1 - Auth & DB)

## 1. Objetivo
Persistir el perfil financiero del jugador en una base de datos relacional (MySQL) para asegurar la persistencia entre sesiones y permitir el juego multiplataforma. Construir una API REST robusta que sirva de frontera entre el cliente web (React) y la lógica de negocio puramente validada.

## 2. Requisitos Funcionales (EARS)
* **RF-6**: CUANDO un usuario se registre en el sistema, EL SISTEMA creará un registro de `User` y su respectivo `PlayerProfile` en la base de datos con los valores por defecto (Bs 1500).
* **RF-7**: SIEMPRE QUE el cliente web solicite el perfil de jugador (GET /api/profile), EL SISTEMA retornará el estado financiero actualizado calculado desde la base de datos.
* **RF-8**: CUANDO el jugador registre un nuevo gasto o ingreso, EL SISTEMA validará la transacción a través de la API y actualizará la base de datos de manera transaccional.

## 3. Modelo de Datos (Prisma Schema Draft)
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  profile   PlayerProfile?
}

model PlayerProfile {
  id        String   @id @default(uuid())
  userId    String   @unique
  name      String
  age       Int      @default(18)
  money     Float    @default(1500)
  income    Float    @default(0)
  user      User     @relation(fields: [userId], references: [id])
  expenses  Expense[]
}

model Expense {
  id        String   @id @default(uuid())
  profileId String
  name      String
  amount    Float
  createdAt DateTime @default(now())
  profile   PlayerProfile @relation(fields: [profileId], references: [id])
}
```

## 4. Arquitectura Backend (DDD Estricto)
El backend en Express se organizará bajo principios de Clean Architecture:
* `src/domain`: Entidades y reglas puras (importadas de `@financity/core`).
* `src/infrastructure/database`: Configuración de PrismaClient.
* `src/application/use-cases`: Lógica orquestadora (ej. CrearPerfilUseCase).
* `src/presentation/controllers`: Rutas HTTP Express.

## 5. Criterios de Aceptación
* [ ] Prisma configurado y apuntando a MySQL local o dockerizado.
* [ ] API Express iniciada y conectada al motor de base de datos.
* [ ] Tests E2E de la API respondiendo 200 OK y 400 Bad Request ante transacciones inválidas.
