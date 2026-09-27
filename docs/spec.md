# Spec 001 — MVP de Onboarding y Motor de Presupuesto

## Contexto y objetivo
Para que el ecosistema de FinanCity funcione, el jugador necesita un punto de partida. Este MVP resuelve la creación del perfil inicial del jugador (18 años, capital inicial) y el motor básico de presupuesto mensual, que es la mecánica central para aprender a administrar dinero antes de introducir deudas o emprendimientos.

## Usuarios / actores
- **Jugador**: El usuario final del videojuego educativo.

## Historias de usuario
- **H1**: Como jugador quiero crear un perfil con mis datos para iniciar la simulación de mi vida financiera.
- **H2**: Como jugador quiero registrar mi primer empleo para comenzar a percibir ingresos mensuales.
- **H3**: Como jugador quiero asignar mis gastos básicos a un presupuesto mensual para saber cuánto dinero me queda disponible para ahorrar.

## Requisitos funcionales (criterios de aceptación en EARS)

### Creación de Jugador
- **RF-1**: CUANDO un nuevo usuario se registra, EL SISTEMA inicializa su perfil con: Edad (18), Dinero (Bs 1.500), Ingresos (Bs 0), Ahorros (Bs 0) y Deudas (Bs 0).

### Empleo Inicial
- **RF-2**: CUANDO el jugador selecciona la oferta laboral de "Ayudante" en el mapa de "Trabajo", EL SISTEMA actualiza sus ingresos mensuales agregando Bs 2.500.

### Motor de Presupuesto
- **RF-3**: CUANDO el jugador agrega un gasto a su presupuesto (Ej. "Alquiler", Bs 900), EL SISTEMA resta automáticamente ese valor del cálculo de su "Dinero Disponible".
- **RF-4**: SI la suma total de gastos mensuales supera a los ingresos totales, ENTONCES EL SISTEMA muestra una alerta visual "Presupuesto en déficit" e impide al jugador avanzar al siguiente mes (turno).
- **RF-5**: MIENTRAS el jugador se encuentre en la vista principal de la "Casa", EL SISTEMA mostrará un dashboard consolidado reflejando: Ingresos, Gastos Totales, Disponible, Deudas, Ahorros y Patrimonio Neto.

## Requisitos no funcionales
- **Persistencia**: Todos los datos deben almacenarse en MySQL mediante Prisma ORM utilizando identificadores UUID.
- **UI/UX**: El diseño debe ser moderno y vibrante (Tailwind CSS), sin asemejarse a un software contable tradicional.
