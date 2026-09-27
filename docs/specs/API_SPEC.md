# API SPEC

## 1. Backend REST (Express + Node.js)
El backend procesa la lógica core.
- **Autenticación**: Supabase Auth o JWT local.
- **Transaccionalidad**: Toda compra, gasto o préstamo debe pasar por un Controlador estricto en Express que calcule la viabilidad financiera utilizando el paquete `@financity/core` antes de guardar en MySQL.