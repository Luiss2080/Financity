# INSTALL SPEC

## 1. Modal Multiplataforma
Al hacer click en "Instalar", un modal inteligente detectará la plataforma.
- Web: Jugar Ahora
- Android: Instalar App (PWA)
- Windows: Descargar versión nativa .exe
- macOS: Descargar versión nativa .dmg
- Linux: Descargar

## 2. Arquitectura de Distribución
Un solo código base en React proveerá las 5 versiones mediante Service Workers para PWA y capas de Electron para Desktop.