# FinanCity - Project Specification (PROJECT_SPEC)

## 1. Visión del Producto
FinanCity es un videojuego educativo multiplataforma (Web, PWA, Desktop) diseñado para enseñar finanzas personales (ahorro, presupuesto, créditos, inversiones y emprendimiento) a través de la gamificación y la toma de decisiones simuladas.

## 2. Audiencia Objetivo
Jóvenes, estudiantes y adultos que desean mejorar su alfabetización financiera de manera interactiva sin la fricción de clases teóricas tradicionales.

## 3. Alcance del MVP (Fase 1)
* **Onboarding**: Creación de cuenta, configuración del perfil inicial (edad, objetivos financieros).
* **Core Loop**:
  * Recepción de ingresos (salario base).
  * Asignación de presupuesto mensual.
  * Resolución de eventos aleatorios (gastos inesperados, bonus).
  * Avance de turnos (meses).
* **Gamificación Base**: Sistema de XP, niveles, e hitos iniciales de ahorro.

## 4. Requisitos No Funcionales
* **Multiplataforma**: La misma base de código servirá para Web (Next.js/React), PWA (Móvil) y Desktop (Electron).
* **Offline-First**: El juego debe soportar interrupciones de red, guardando el progreso localmente (IndexedDB) y sincronizando con el servidor posteriormente.
* **Educativo, no Financiero**: Los activos, empresas y tasas de interés serán representaciones educativas (simuladas) y no se conectarán a bolsas reales.

## 5. Restricciones
* El backend de almacenamiento maestro será estrictamente MySQL.
* Se prioriza el desarrollo iterativo SDD. Nada se programa sin antes especificar y testear.
