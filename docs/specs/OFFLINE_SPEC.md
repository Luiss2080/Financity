# OFFLINE SPEC

## 1. Arquitectura Offline-First
- Uso de IndexedDB en el navegador/PWA/Desktop.
- Sincronización diferida (Sync Engine).
- Las partidas se dividen en partes: Player, Economy, Progress, Missions, Achievements.
- El juego guarda un "autosave" en IndexedDB en cada decisión, y lo transmite a la API de Node en batch cuando detecta conectividad.