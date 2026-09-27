# FinanCity - MySQL Database Specification (MYSQL_DATABASE_SPEC)

## 1. Reglas de Diseño
* **Motor**: InnoDB (para soporte transaccional y claves foráneas).
* **Collation**: `utf8mb4_unicode_ci`.
* **UUIDs**: Se usarán identificadores UUID (v4) en lugar de auto-incrementos secuenciales para facilitar la sincronización Offline-First (para que el cliente pueda generar IDs válidos sin conflictos).

## 2. Modelos Principales (MVP / Fase 1)

### `users`
* `id` (UUID, PK)
* `email` (VARCHAR, Unique)
* `password_hash` (VARCHAR)
* `created_at` (TIMESTAMP)

### `profiles`
* `id` (UUID, PK)
* `user_id` (UUID, FK -> users.id)
* `name` (VARCHAR)
* `avatar_url` (VARCHAR)
* `level` (INT)
* `xp` (INT)
* `health_score` (INT)

### `game_saves` (Opcional, si serializamos estado complejo)
* `id` (UUID, PK)
* `user_id` (UUID, FK -> users.id)
* `state_json` (JSON) - Para guardar el snapshot rápido de todo el estado del cliente.
* `last_sync` (TIMESTAMP)

### `transactions`
* `id` (UUID, PK)
* `user_id` (UUID, FK -> users.id)
* `amount` (DECIMAL 10,2)
* `type` (ENUM: 'INCOME', 'EXPENSE')
* `category` (VARCHAR)
* `date` (TIMESTAMP)

### `budgets`
* `id` (UUID, PK)
* `user_id` (UUID, FK -> users.id)
* `category` (VARCHAR)
* `allocated_amount` (DECIMAL 10,2)

## 3. Escalabilidad Futura (Fases 2+)
Las tablas de `loans` (préstamos), `businesses` (negocios), `investments` (inversiones) y `events_history` (historial de eventos aleatorios) se diseñarán en sus respectivas fases SDD para evitar optimización prematura.
