# Frontend - Librería App

Aplicación frontend creada con Next.js, TypeScript y Tailwind CSS.

## Tecnologías
- Next.js 15
- TypeScript
- Tailwind CSS
- Axios (para llamadas a la API)

## Instalación
1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Iniciar el servidor de desarrollo: `npm run dev`

## Estructura del Proyecto
```
frontend/
├── app/                  # Páginas y layout de Next.js
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   ├── register/
│   └── dashboard/
├── components/           # Componentes reutilizables
├── contexts/             # Contextos de React (AuthContext)
└── services/             # Lógica de conexión con la API
```

## Scripts
- `npm run dev`: Iniciar servidor de desarrollo (http://localhost:3000)
- `npm run build`: Compilar para producción
- `npm start`: Iniciar servidor de producción

## Variables de Entorno
Crea un archivo `.env.local` con:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```
